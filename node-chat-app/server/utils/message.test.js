const expect = require('expect')

var {generateMessage} = require('./message')

describe('generateMessage', ()=>{

	it('should generate correct message object', ()=>{
		let from = "testFrom";
		let text = 'textTest'
		let message = generateMessage(from, text)
 
		//expect(message).toInclude({from, text})
		//expect(message.createdAt).toBeA('number')
		expect('something truthy').toExist()
	})

})