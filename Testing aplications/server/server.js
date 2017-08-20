const express = require('express')

let app = express()

app.get('/', (req, res) => {
	res.status(200).send({fine: 'Hello World', name: 'Darko'})
})

app.get('/users', (req, res) => {
	res.status(200).send([
		{name: 'Darko', age: 30} , 
		{name: 'Nada', age: 29} ])
})

app.listen(3000)

module.exports.app = app;