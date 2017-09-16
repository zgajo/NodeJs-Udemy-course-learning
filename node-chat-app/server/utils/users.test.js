const expect = require('expect')

const {Users} = require('./users')

describe('Users', ()=>{

	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [
			{
				id: '1',
				name: 'John',
				room: 'Node course'
			},
			{
				id: '2',
				name: 'Mike',
				room: 'Node course'
			},
			{
				id: '3',
				name: 'Sara',
				room: 'Node'
			}
		]
	})

	it('should add new user', () => {
		let users = new Users();
		let responseUser = users.addUser(1, 'Darko', 'Room')

		expect(users.users).toEqual([responseUser]);
	})

	it('should remove a user', ()=>{
		expect(users.removeUser('2').id).toBe('2')
		expect(users.users.length).toBe(2)
	})

	it('should NOT remove a user', ()=>{
		expect(users.removeUser('99')).toNotExist()
		expect(users.users.length).toBe(3)
	})

	it('should find user', ()=>{
		expect(users.getUser('2')).toEqual({
				id: '2',
				name: 'Mike',
				room: 'Node course'
			})
		
	})

	it('should not find user', ()=>{
		expect(users.getUser('99')).toNotExist()
	})

	it('should return names for Node course', () => {
		let userList = users.getUserList('Node course');

		expect(userList).toEqual(['John', 'Mike']);
	})

	it('should return names for Node', () => {
		let userList = users.getUserList('Node');

		expect(userList).toEqual(['Sara']);
	})

})