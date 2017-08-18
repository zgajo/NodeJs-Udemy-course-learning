const request = require('request')

module.exports.geocodeAddress = (address, callback) => {

request( { 
	url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + address,
	json: true
}, (error, response, body) => {
	 if(error){
	 	callback('Unable to connect to google servers.')
	 }
	 else if(body.status === 'ZERO_RESULTS'){
	 	callback('Unable to find that address!')
	 }
	 else if(body.status === 'OK'){
		callback(undefined, {
			address: body.results[0].formatted_address,
			location: body.results[0].geometry.location
		})
	 }	
})

}


//26bedc1d534d3c3b497fe7c2b999399e

//https://api.darksky.net/forecast/26bedc1d534d3c3b497fe7c2b999399e/45.11102,13.7089242
