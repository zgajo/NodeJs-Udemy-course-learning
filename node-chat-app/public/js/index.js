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

let locationBtn = $('#sendLocation')

locationBtn.on('click', ()=>{
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser')
	}

	navigator.geolocation.getCurrentPosition(function(position){
		//console.log(position)
		socket.emit('createLocationMsg', {
			latitude: position.coords.latitude,
			longitude:  position.coords.longitude
		})
	}, function(){
		alert('Unable to fetch location.')
	})

})