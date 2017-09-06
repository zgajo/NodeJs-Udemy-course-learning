const {ObjectID} = require('mongodb')

let {mongoose} = require('./../server/db/mongoose')
let {Todo} = require('./../server/models/todo')
let {User} = require('./../server/models/users')
/*
Todo.remove({}).then( result => {
	console.log(result)
})
*/

//Todo.findOneAndRemove()

Todo.findByIdAndRemove('59a5b79d53be033690def7d4')
	.then(todo => {
		console.log(todo)
	})
	.catch()