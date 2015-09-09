var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lady_so');

module.exports = require('./user.js');
module.exports.Answer = require('./answer.js')