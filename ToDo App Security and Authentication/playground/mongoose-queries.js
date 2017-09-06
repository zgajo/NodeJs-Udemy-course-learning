const {ObjectID} = require('mongodb')

let {mongoose} = require('./../server/db/mongoose')
let {Todo} = require('./../server/models/todo')
let {User} = require('./../server/models/users')

let id = '59a44da4093cec37b42799be'

if(!ObjectID.isValid(id)){
	console.log('ID not Valid')
}
/*
Todo.find({
	_id: id
}).then( todos => {
	console.log('Todos', todos)
})

Todo.findOne({
	_id: id
}).then( todo => {
	console.log('Todo', todo)
})
*/
Todo.findById(id)
.then(todo => {
	if(!todo) return console.log('Id not found')
	console.log('Todo By ID', todo)
})
.catch( e => console.log(e) )




let idUser = '599f0cfe61bbd91074f63d5f'

User.findById(idUser)
.then( user => {
	if(!user) return console.log('User Id not found')
	console.log('User By Id', user)
})
.catch( e => console.log(e) )
