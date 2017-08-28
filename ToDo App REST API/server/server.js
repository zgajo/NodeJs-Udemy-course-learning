const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

let {mongoose} = require('./db/mongoose')
let {Todo} = require('./models/todo')
let {User} = require('./models/users')

let app = express();
app.use(bodyParser.json())

app.post('/todos', (req, res) => {
	let todo = new Todo({
		text: req.body.text,
		completed: req.body.completed
	})

	todo.save().then(doc => {
		res.send(doc)
	}, err=>{
		res.status(400).send(err)
	})
})

app.get('/todos', (req, res) => {
	Todo.find()
	.then((todos)=>{
		res.send({
			todos
		})
	})
	.catch(err => {
		res.status(400).send(err)
	})
})

app.get('/todos/:id', (req, res) => {
	let id = req.params.id

	if(!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}	

	Todo.findById(id)
	.then( todo => {
		if(!todo) res.status(404).send(); 
		res.send(todo)
	} )
	.catch( err => res.status(400).send() )
})



app.post('/users', (req, res) => {

})

app.get('/users', (req, res) => {

})

app.listen(3000, () => {
	console.log('Server started at port 3000')
})


module.exports = { app }