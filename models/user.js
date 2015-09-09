var mongoose = require ('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    Answer = require('./answer.js');

var Question = new Schema({
  question: {
    type: String,
    required: true
  },
  answers: [Answer]
});

var UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  questions: {
    questions: [Question],
    default: []
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

UserSchema.statics.createSecure = function (username, password, cb) {
  var _this = this;
    bcrypt.hash(password, 10, function (err, hash) {
      var user = {
        username: username,
        passwordDigest: hash
      };
      _this.create(user, cb);
  });
};

UserSchema.statics.authenticate = function (username, password, cb) {
  this.findOne({username: username}, function (err, user) {
    if (user === null) {
      cb('No user with that username', null);
    } else if (user.checkPassword(password)) {
      cb(null, user);
    } else {
      cb('Password incorrect', user)
    }
  });
};

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordDigest);
};

var Question = mongoose.model('Question', Question);
var User = mongoose.model('User', UserSchema);

module.exports = User;