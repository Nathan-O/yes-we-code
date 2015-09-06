var mongoose = require ('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
    	passwordDigest: {
		type: String,
    		required: true
	},
    	createdAt: {
		type: Date,
    		default: Date.now()
	 }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
