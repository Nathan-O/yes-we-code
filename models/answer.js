var mongoose = require ('mongoose'),
    Schema = mongoose.Schema;

var Answer = new Schema({
  answer: String, 
  owner_id: String
});

var Answer = mongoose.model('Answer', Answer);
module.exports = Answer;