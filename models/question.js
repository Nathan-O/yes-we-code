var mongoose = require ('mongoose'),
    Schema = mongoose.Schema;

var questionSchema = new Schema({
	question: {
		type: String,
		required: true
	},
  	createdAt: {
    type: Date,
    default: Date.now()
	 }
});

var question = mongoose.model('question', questionSchema);
module.exports = question;