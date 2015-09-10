var mongoose = require ('mongoose'),
  Schema = mongoose.Schema;

var Question = new Schema({
  question: {
    type: String,
    required: true
  },
  owner_id: String,
  answers: []
});

var Question = mongoose.model('Question', Question);
module.exports = Question;



