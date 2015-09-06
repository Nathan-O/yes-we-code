var mongoose = require ('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var userSchema = new Schema({
	username: {
		type: String,
		required: true
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

userSchema.statics.createSecure = function (username, password, cb) {
  var _this = this;
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      var user = {
        username: username,
        passwordDigest: hash
      };
      _this.create(user, cb);
    });
  });
};

userSchema.statics.authenticate = function (username, password, cb) {
  this.findOne({username: username}, function (err, user) {
    if (user === null) {
      cb('Can\'t find user with that username', null);
    } else if (user.checkPassword(password)) {
      cb(null, user);
    } else {
      cb('Password incorrect', user)
    }
  });
};

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordDigest);
};

var user = mongoose.model('user', userSchema);
module.exports = user;