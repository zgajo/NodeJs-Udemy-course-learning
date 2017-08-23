//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Unble to connect to MongoDB server')
	}
	console.log('Connected to MongoDB server')

	db.collection('Todos').findOneAndUpdate({
		_id: ObjectId("599c691c6976ac1503728c7f")
	},
	{
		$set: {
			completed: true
		}
	},
	{
		returnOriginal: false
	})
	.then(result => {
		console.log(result)
	})

	db.close()
});