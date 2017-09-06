//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err){
		return console.log('Unble to connect to MongoDB server')
	}
	console.log('Connected to MongoDB server')

	// db.collection('Todos').find({
	// 	_id: ObjectId("599c63ce6976ac1503728ba1")
	// }).toArray()
	// .then(docs => {
	// 	console.log(JSON.stringify(docs, undefined, 2))
	// })
	// .catch( err => 'Unable to fetch docs'+err)

	db.collection('Todos').find().count()
	.then(count => {
		console.log(`Todos count: ${count}`)
	})
	.catch( err => 'Unable to fetch docs'+err)

	db.close()
});