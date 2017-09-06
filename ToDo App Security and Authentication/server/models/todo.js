const mongoose = require('mongoose')

let Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minLength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completed_at:{
		type: Number,
		default: null
	}
})

module.exports = {
	Todo
} 