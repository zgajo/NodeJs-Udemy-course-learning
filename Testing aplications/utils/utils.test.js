const expect = require('expect')

const utils = require('./utils')


describe('Utils', ()=>{

	describe('#adding', ()=> {
		it('should add two numbers', () => {
			let res = utils.add(33, 11)

			expect(res).toBe(44).toBeA('number')

			/*if(res !== 44){
				throw new Error(`Expected 44 but received ${res}`)
			}*/
		});



		it('Should async add two nums', (done) => {
			utils.asyncAdd( 2, 3, (sum)=>{
				expect(sum).toBe(5).toBeA('number')
				done();
			})
		})


		
	})

	it('should add square numbers', () => {
			let res = utils.square(3)

			expect(res).toBe(9).toBeA('number')

		});
	

})




it('should expect some values', () => {
	//expect(12).toNotBe(12)
	//expect([2,3,6]).toInclude(3)
	/*expect({
		name: 'Darko',
		age: 30
	}).toInclude({
		age: 24
	})*/
}) 


it('should verify first and last name are set' , () => {
	let obj = {
		age: 30
	}
	let res = utils.setName(obj, 'Darko Pranjić')

	expect(res).toInclude({
		firstName: 'Darko',
		lastName: 'Pranjić'
	})
})