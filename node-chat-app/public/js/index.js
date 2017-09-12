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

socket.on('newLocationMessage', function(msg) {
	let li = $(`<li  class="list-group-item"></li>`);
	let a = $('<a target="_blank">My current location </a>')

	li.text(`${msg.from} `)
	a.attr('href', msg.url)
	li.append(a)
	$('#msgFromServer').append(li)
})


$('#message-form').on('submit', function(e){
	e.preventDefault();

	let msgTextbox = document.getElementById('textForSend');

	socket.emit('createMessage', {
		from: 'User',
		text: msgTextbox.value
	}, function(){
		msgTextbox.value = '';
	})
})

function addReceivedMsg(msg){

	let li = $(`<li  class="list-group-item"></li>`);
	if(msg.from) li.text(`${msg.from}: ${msg.text}`)
	else  li.text(`${msg}`)

	$('#msgFromServer').append(li)
}

let locationBtn = $('#sendLocation')

locationBtn.on('click', ()=>{
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser')
	}

	locationBtn.attr('disabled', 'disabled').text('Sending location...')

	navigator.geolocation.getCurrentPosition(function(position){
		locationBtn.removeAttr('disabled').text('Send location')
		socket.emit('createLocationMsg', {
			latitude: position.coords.latitude,
			longitude:  position.coords.longitude
		})
	}, function(){
		locationBtn.removeAttr('disabled').text('Send location')
		alert('Unable to fetch location.')
	})

})