const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket)=>{
	console.log('New user connected')


	socket.emit('newMessage', {
		from: 'test',
		text: 'TEst text',
		createdAt: 123
	})

	socket.on('createMessage', (newMessage) => {
		console.log('createMessage: ',newMessage)
	})

	socket.on('disconnect', (socket)=>{
		console.log('Client disconnected')
	})
})



server.listen( port, () => {
	console.log('Server started at port: ' + port)
})