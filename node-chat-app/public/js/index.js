let socket = io();

socket.on('connect', function(){
	console.log('Connected to server')


})

socket.on('disconnect', function(){
	console.log('Disconnected from server')
})

socket.on('newMessage', function(msg){
	console.log('New message: ', msg)
	addReceivedMsg(msg)
	//alert(`From: ${msg.from} \nText: ${msg.text}`)
})


$('#message-form').on('submit', function(e){
	e.preventDefault();

	socket.emit('createMessage', {
		from: document.getElementById('from').value,
		text: document.getElementById('textForSend').value
	}, function(data){
		addReceivedMsg(data);
	})
})

function addReceivedMsg(msg){

	let li = $(`<li  class="list-group-item"></li>`);
	if(msg.from) li.text(`${msg.from}: ${msg.text}`)
	else  li.text(`${msg}`)

	$('#msgFromServer').append(li)
}