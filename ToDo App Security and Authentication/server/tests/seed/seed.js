const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

let {Todo} = require('./../../models/todo')
let {User} = require('./../../models/users')

const userOneId =  new ObjectID()
const userTwoId =  new ObjectID()

const users = [{
	_id: userOneId,
	email: 'darko@gmail.com',
	password: '123456',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
	}]
	}, {
		_id: userTwoId,
		email: 'darkoTwo@gmail.com',
		password: '123456',
		tokens: [{
			access: 'auth',
			token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
		}]
	}
]


const todos = [{
	_id: new ObjectID(),
	text: 'First test todo',
	_creator: userOneId
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completed_at: 333,
	_creator: userTwoId
}]



const populateTodos = (done) => {	// Deleting all from database
	Todo.remove({})
	.then( () => {
		return Todo.insertMany(todos)
	})
	.then(() => done())
}

const populateUsers = (done) => {
	User.remove({})
		.then(()=>{
			let userOne = new User(users[0]).save()
			let userTwo = new User(users[1]).save()

			return Promise.all([userOne, userTwo])
		})
		.then(() => done())
}


module.exports = { todos, populateTodos, users, populateUsers }