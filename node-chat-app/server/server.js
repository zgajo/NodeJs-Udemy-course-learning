const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket)=>{
	
	// Socket.emit sends to specific user
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'))

	// Broadcast sends message to all connected users except user who sent message
 	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

	socket.on('createMessage', (newMessage, callback) => {
		console.log('createMessage: ', newMessage);
		
		/*  io.emit sends message to all users */
		//io.emit('newMessage', generateMessage(newMessage.from, newMessage.text))
		socket.broadcast.emit('newMessage', generateMessage(newMessage.from, newMessage.text))
		callback('This is from server, messsage succesfuly sent');
	})

	socket.on('disconnect', (socket)=>{
		console.log('Client disconnected')
	})
})



server.listen( port, () => {
	console.log('Server started at port: ' + port)
})


// Broadcast sends message to all connected users except user who sent message
		/*
		socket.broadcast.emit('newMessage', {
			from: newMessage.from,
			text: newMessage.text,
			createdAt: new Date().getTime()
		})
		*/