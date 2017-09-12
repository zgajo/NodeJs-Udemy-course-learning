const expect = require('expect')

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', ()=>{

	it('should generate correct message object', ()=>{
		let from = "testFrom";
		let text = 'textTest'
		let message = generateMessage(from, text)
 
		expect(message).toInclude({from, text})
		expect(message.createdAt).toBeA('number')
	})

})



describe('generateLocationMessage', ()=>{

	it('should generate correct location object', () => {
		let from = "testFrom";
		let latitude = 44.869293899999995,
			longitude = 13.860520999999999;

		let message = generateLocationMessage(from, latitude, longitude)
		expect(message.createdAt).toBeA('number')
		expect(message.url).toEqual(`https://www.google.com/maps?q=${latitude},${longitude}`)
	} )

})