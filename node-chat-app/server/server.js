const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname, '../public');

let app = express();
let port = process.env.PORT || 3000;

app.use(express.static(publicPath))

app.listen( port, () => {
	console.log('Server started at port: ' + port)
})