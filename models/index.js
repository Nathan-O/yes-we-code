var mongoose = require('mongoose');
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  'mongodb://localhost/lady_so');

module.exports.User = require('./user.js');
module.exports.Answer = require('./answer.js');
module.exports.Question = require('./question.js');