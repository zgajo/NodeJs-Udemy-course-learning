let env = process.env.NODE_ENV || 'development';
// development is not set in package.json
// Heroku - process.env.NODE_ENV = "production"

if(env === 'development'){
	process.env.PORT = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/Todo';
} else if(env === 'test'){
	process.env.PORT = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoTest';
}