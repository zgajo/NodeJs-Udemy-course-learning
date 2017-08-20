const request = require('supertest')
const expect = require('expect')

let app = require('./server').app;

describe('Server response', ()=>{

	describe('Get /', ()=>{
		it('should return Hello World', (done)=>{
			request(app)
				.get('/')
				.expect(200)
				.expect((res)=>{
					expect(res.body).toInclude({
						name: 'Darko'
					})
				})
				.end(done);
		})
	})
	

	describe('Get /users', ()=>{
		it('Should include myself in route', (done) => {
		request(app)
			.get('/users')
			.expect(200)
			.expect((res) => {
				expect(res.body).toInclude({
					name: 'Darko',
					age: 30
				})
			})
			.end(done)
	})
	})

})



