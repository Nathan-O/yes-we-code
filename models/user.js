var mongoose = require ('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordDigest: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  question: []
});

UserSchema.statics.createSecure = function (username, password, cb) {
  var _this = this;
  bcrypt.genSalt(function(err, salt){
    bcrypt.hash(password, salt, function (err, hash) {
      var user = {
        username: username,
        passwordDigest: hash
      };
      _this.create(user, cb);
    });
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

var User = mongoose.model('User', UserSchema);
module.exports = User;