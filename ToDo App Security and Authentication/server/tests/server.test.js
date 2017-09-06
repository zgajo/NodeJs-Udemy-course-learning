const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')

let {app} = require('./../server')
let {Todo} = require('./../models/todo')
let {User} = require('./../models/users')
let {todos, populateTodos, users, populateUsers} = require('./seed/seed')

beforeEach(populateUsers)
beforeEach(populateTodos)

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text'

		request(app)
			.post('/todos')
			.set('x-auth', users[0].tokens[0].token)
			.send({
				text
			})
			.expect(200)
			.expect((res)=>{
				expect(res.body.text).toBe(text)
			})
			.end((err, res)=>{
				// If there waas an error 
				if(err) {
					return done(err)
				}
				// If everything's fine, search in database
				// It should find one matching record
				Todo.find({text}).then( todos => {
					expect(todos.length).toBe(1)
					expect(todos[0].text).toBe(text)
					done()
				})
				.catch(e => done(e))
			})
	})


	it('should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.set('x-auth', users[0].tokens[0].token)
			.expect(400)
			.end((err, res)=>{
				if(err) {
					return done(err)
				}

				Todo.find().then( todos => {
					expect(todos.length).toBe(2) 
					done()
				})
				.catch(e => done(e))
			})
	})


})




describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect( res => {
				expect(res.body.todos.length).toBe(1)
			})
			.end(done)
	})
})



describe('GET /todos/:id', () => {

	it('should not return todo doc created by other user', (done) => {
		request(app)
			.get(`/todos/${todos[1]._id.toHexString()}`)
			.set('x-auth', users[0].tokens[0].token)
			.expect(404)
			.end(done)
	})

	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect( res => {
				expect(res.body.text).toBe(todos[0].text)
			})
			.end(done)
	})

	it('should return 404 if todo not found', (done) => {
		request(app)
			.get(`/todos/${new ObjectID()}`)
			.set('x-auth', users[0].tokens[0].token)
			.expect(404)
			.end(done)
	})


	it('should return 404 for non object id\'s', (done) => {
		request(app)
			.get(`/todos/123abc`)
			.set('x-auth', users[0].tokens[0].token)
			.expect(404)
			.end(done)
	})

})




describe('DELETE /todos/:id', ()=>{
	it('should remove a todo', (done) => {
		var hexID = todos[1]._id.toHexString()

		request(app)
			.delete(`/todos/${hexID}`)
			.set('x-auth', users[1].tokens[0].token)
			.expect(200)
			.expect( res => {
				expect(res.body.todo._id).toBe(hexID)
			})
			.end((err, res) => {
				// If there's an error while contacting database
				if(err) return done(err); 

				// If everything's fine, search in database
				// It shouldn't find id in database
				Todo.findById(hexID)
					.then( todo => {
						expect(todo).toNotExist();
						done()
					}) 
					.catch(err => done(err))
			})
	})

	it('should return 404 if todo not found', (done) => {
		request(app)
			.delete(`/todos/${new ObjectID()}`)
			.set('x-auth', users[1].tokens[0].token)
			.expect(404)
			.end(done)
	})

	it('should return 404 if object id invalid', (done) => {
		request(app)
			.delete(`/todos/123}`)
			.set('x-auth', users[1].tokens[0].token)
			.expect(404)
			.end(done)
	})
})



describe('PATCH /todos/:id', ()=>{

	it('should Update todo', (done)=>{
		let id = todos[0]._id.toHexString();
		let text = "Patch test text"

		request(app)
			.patch(`/todos/${id}`)
			.send({
				text,
				completed: true
			})
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect( todo => {
				expect(todo.body.todo.text).toBe(text)
				expect(todo.body.todo.completed).toBe(true)
				expect(todo.body.todo.completed_at).toBeA('number')
			})
			.end(done)
	})

	it('should reject Update todo', (done)=>{
		let id = todos[0]._id.toHexString();
		let text = "Patch test text"

		request(app)
			.patch(`/todos/${id}`)
			.send({
				text,
				completed: true
			})
			.set('x-auth', users[1].tokens[0].token)
			.expect(404)
			.end(done)
	})

	it('should clear completed_at when todo is not completed', (done)=>{
		let id = todos[1]._id.toHexString();

		request(app)
			.patch(`/todos/${id}`)
			.send({
				completed: false
			})
			.set('x-auth', users[1].tokens[0].token)
			.expect(200)
			.expect( todo => {
				expect(todo.body.todo.completed).toBe(false)
				expect(todo.body.todo.completed_at).toNotExist()
			})
			.end(done)
	})

})


describe('POST /users/login', () => {

	it('should login user and return token', (done)=>{

		request(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: users[1].password
			})
			.expect(200)
			.expect(res => {
				expect(res.headers['x-auth']).toExist();
			})
			.end( (err, res) => {
				if(err) return done(err)

				User.findById(users[1]._id)
					.then( user => {

						expect(user.tokens[1]).toInclude({
							access: 'auth',
							token: res.headers['x-auth']
						})
						done()
					})
					.catch(e => done(e))
			})

	})

	it('should reject login', (done)=>{
		request(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: users[1].password + '1'
			})
			.expect(400)
			.expect(res => {
				expect(res.headers['x-auth']).toNotExist();
			})
			.end( (err, res) => {
				if(err) return done(err)

				User.findById(users[1]._id)
					.then( user => {
						expect(user.tokens.length).toBe(1)
						done()
					})
					.catch(e => done(e))
			})
	})
})



describe('DELETE /users/me/token', ()=>{
	it('should remove auth token on logout', (done)=>{
		request(app)
			.delete('/users/me/token')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.end( (err, res) => {
				if(err) return done(err);

				User.findById(users[0]._id)
					.then( user => {
						expect(user.tokens.length).toBe(0);
						done()
					})
					.catch(e => done(e))
			})

	})
})