const yargs = require('yargs')
const axios = require('axios')
const geocode = require('./geocode/geocode.js')

const argv = yargs
	.options({
		a: {
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

const encodedAddress = (argv.address) ? encodeURIComponent(argv.address) : 'Vicani, Rovinj';
let geocodeUrl = "http://maps.googleapis.com/maps/api/geocode/json?address=" + encodedAddress

axios.get(geocodeUrl)
.then(result => {
	if(result.data.status == 'ZERO_RESULTS'){
		throw new Error('Unable to find that address!')
	}
	console.log(result.data.results[0].formatted_address)

	let lat = result.data.results[0].geometry.location.lat;
	let lng = result.data.results[0].geometry.location.lng;
	let weatherUrl = `https://api.darksky.net/forecast/26bedc1d534d3c3b497fe7c2b999399e/${lat},${lng}`

	return axios.get(weatherUrl)

})
.then(response => {
	console.log(`Temperature is: ${response.data.currently.temperature}`)
})
.catch(errorMessage => {
	if(errorMessage.code === 'ENOTFOUND') console.log('Unable to conect to API servers')
	else console.log(errorMessage.message)
})