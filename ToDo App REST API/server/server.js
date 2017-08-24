const express = require('express')
const bodyParser = require('body-parser')

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

})

app.post('/users', (req, res) => {

})

app.get('/users', (req, res) => {

})

app.listen(3000, () => {
	console.log('Server started at port 3000')
})


module.exports = { app }