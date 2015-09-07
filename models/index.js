var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lady_so');

module.exports.Question = require("./question");
module.exports.User = require('./user');