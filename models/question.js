var mongoose = require ('mongoose').
  Schema = mongoose.Schema;

var Question = new Schema({
  question: {
    type: String,
    required: true
  },
  answers: [Answer]
});

var Question = mongoose.model('Question', Question);
module.exports = Question;