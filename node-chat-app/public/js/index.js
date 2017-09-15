let socket = io();

socket.on('connect', function(){
	console.log('Connected to server')


})

socket.on('disconnect', function(){
	console.log('Disconnected from server')
})

socket.on('newMessage', function(msg){
	let formattedTime = moment(msg.createdAt).format('HH:mm')
	let template = $('#message-template').html()
	let html = Mustache.render(template, {
		text: msg.text,
		from: msg.from,
		createdAt: formattedTime
	})

	$('#msgFromServer').append(html)
})

socket.on('newLocationMessage', function(msg) {

	let formattedTime = moment(msg.createdAt).format('HH:mm')
	let template = $('#location-message-template').html()
	let html = Mustache.render(template, {
		url: msg.url,
		from: msg.from,
		createdAt: formattedTime
	})

	$('#msgFromServer').append(html)

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