const expect = require('expect')
const rewire = require('rewire')

let app = rewire('./app')

describe('App', () => {

	let db = {
		saveUser: expect.createSpy()
	}
	app.__set__('db', db);

	it('should call the spy correctly', () => {
		let spy = expect.createSpy()
		spy('Darko')
		expect(spy).toHaveBeenCalledWith('Darko')
	})

	it('should call saveUser with user object', () => {
		let email = 'dar@test.id'
		let password = 'test'

		app.handleSignup(email, password)
		expect(db.saveUser).toHaveBeenCalledWith({email, password})
	})

})