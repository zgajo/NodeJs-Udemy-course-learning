const request = require('request')
const yargs = require('yargs')

const geocode = require('./geocode/geocode.js')

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

const encodedAddress = encodeURIComponent(argv.address)
const weather = require('./weather/weather.js')

geocode.geocodeAddress(encodedAddress, (errorMessage, results) => {
	if(errorMessage){
		console.log(errorMessage)
	}else{
		console.log(JSON.stringify(results, undefined, 2))
		weather.getWeather(results, (errorMessage, result) => {
			if(errorMessage){
				console.log(errorMessage)
			}else{
				console.log("Temperature (°C) is " + ((result.temperature - 32 ) * 5/9  ))
			}
		} )
	}
})

	
