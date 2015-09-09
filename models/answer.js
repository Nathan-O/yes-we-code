var mongoose = require ('mongoose'),
    Schema = mongoose.Schema;

var Answer = new Schema({
  answer: String,
  person: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

var Answer = mongoose.model('Answer', Answer);

module.exports = Answer;