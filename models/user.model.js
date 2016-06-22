var mongoose = require('mongoose');
module.exports =  mongoose.model('User', {
    id: Number,
    firstName: String,
    userName: String,
    lastName: String,
    email: String,
    password: String,
	isManager: Boolean
    
});
