const request = require('request')

module.exports.getWeather = (address, callback) => {
request( { 
	url: `https://api.darksky.net/forecast/26bedc1d534d3c3b497fe7c2b999399e/${address.location.lat},${address.location.lng}`,
	json: true
}, (error, response, body) => {
	 if(error){
	 	callback('Unable to connect to Forecast servers.')
	 }
	 else if(body.error){
	 	callback(body.error)
	 }
	 else if(body){
	 	callback(undefined, body.currently)
	 }	
})
}