var asyncAdd = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if(typeof a === 'number' && typeof b === 'number'){
				resolve(a + b)
			}else{
				reject('Arguments must be numbers')
			}
		}, 1500)
	})
}
/*
var somePromise = new Promise( (resolve, reject) => {
	resolve('it worked')
} )

somePromise.then( result => console.log(result ))
*/

asyncAdd(2, 3)
			.then((result) => {
				console.log('Result: ' + result)
				return asyncAdd(result, 33)
			})
			.then((result) => {
				console.log('Result: ' + result)
			})
			.catch((errorMessage) => { 
				console.log(errorMessage)
			})
