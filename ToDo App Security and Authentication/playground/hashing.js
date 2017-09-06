const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

let data = {
	id: 4
}

let token = jwt.sign(data, '123abc')
console.log(`Token: ${JSON.stringify(token)}`)

let tokenDec = jwt.verify(token, '123abc')
console.log(`Token decoded: ${JSON.stringify(tokenDec)}`)

/*
let message = 'Hello'
let hash = SHA256(message).toString();

console.log(`Message: ${message}`)
console.log(`Message: ${hash}`)

let data = {
	id: 4
}

let token = {
	data,
	hash: SHA256(JSON.stringify(data) + 'secret').toString()
}
console.log(`Token: ${JSON.stringify(data)}`)
console.log(`Token: ${JSON.stringify(token)}`)

//Man in the middle, attack
token.data.id = 5
token.hash = SHA256(JSON.stringify(token.data)).toString()


//validate
let resultHash = SHA256(JSON.stringify(token.data) + 'secret').toString()

if(resultHash == token.hash){
	console.log('Data was not changed')
}else{
	console.log('Data was changed, don\'t trust')
}
*/