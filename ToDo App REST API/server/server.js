const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

let {mongoose} = require('./db/mongoose')
let {Todo} = require('./models/todo')
let {User} = require('./models/users')

let app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json())

// INSERT new todos
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


// GET all todo's
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


// GET todo by id
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


// REMOVE todo
app.delete('/todos/:id', (req, res) => {
	let id = req.params.id

	if(!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	Todo.findByIdAndRemove(id)
		.then( todo => {
			if(!todo) res.status(404).send();
			res.send({todo})
		})
		.catch( err => res.status(400).send() )
})



app.listen(port, () => {
	console.log('Server started at port ' + port);
})


module.exports = { app }