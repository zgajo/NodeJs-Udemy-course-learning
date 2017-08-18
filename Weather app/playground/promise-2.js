const request = require('request')

var geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		const encodedAddress = encodeURIComponent(address)

		request( { 
			url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + address,
			json: true
		}, (error, response, body) => {
			 if(error){
			 	reject('Unable to connect to google servers.')
			 }
			 else if(body.status === 'ZERO_RESULTS'){
			 	reject('Unable to find that address!')
			 }
			 else if(body.status === 'OK'){
				resolve({
					address: body.results[0].formatted_address,
					location: body.results[0].geometry.location
				})
			 }	
		})
	}) 
}


geocodeAddress('52210')
.then(location => {
	console.log(JSON.stringify(location, undefined, 2))
})
.catch(errorMessage => {
	console.log(errorMessage)
})