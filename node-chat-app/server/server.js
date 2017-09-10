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
	
	// Socket.emit sends to specific user
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to chat app'
	})

	// Broadcast sends message to all connected users except user who sent message
 	socket.broadcast.emit('newMessage', {
			from: 'Admin',
			text: 'Darko has connected',
			createdAt: new Date().getTime()
		})

	socket.on('createMessage', (newMessage) => {
		console.log('createMessage: ', newMessage);
		
		/*  io.emit sends message to all users */
		io.emit('newMessage', {
			from: newMessage.from,
			text: newMessage.text,
			createdAt: new Date().getTime()
		})
		
		// Broadcast sends message to all connected users except user who sent message
		/*
		socket.broadcast.emit('newMessage', {
			from: newMessage.from,
			text: newMessage.text,
			createdAt: new Date().getTime()
		})
		*/
	})

	socket.on('disconnect', (socket)=>{
		console.log('Client disconnected')
	})
})



server.listen( port, () => {
	console.log('Server started at port: ' + port)
})