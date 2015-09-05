var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lady_so');

module.exports.User = require('./user');
