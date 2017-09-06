//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Unble to connect to MongoDB server')
	}
	console.log('Connected to MongoDB server')
	/*
	db.collection('Todos').deleteMany({text: 'Play volleyball'})
	.then(result => {
		console.log(result)
	})
	

	db.collection('Todos').deleteOne({text: 'Play volleyball'})
	.then(result => {
		console.log(result.result)
	})
	*/

	db.collection('Todos').findOneAndDelete({completed: false})
	.then(result => {
		console.log(result)
	})

	db.close()
});