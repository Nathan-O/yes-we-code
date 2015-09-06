var express = require('express'),
	app = express(),
	db = require('./models'),
	path = require('path'),
	views = path.join(process.cwd(), 'views/'),	
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	bcrypt = require('bcrypt');

//parse the posted data and cookie data
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser('A secret'));

app.use('/static', express.static('public'));

/* Routes */

app.get('/', function (req, res) {
	var homePath = path.join(views, 'index.html'); 
	res.sendFile(homePath);
});

app.get('/about', function (req, res) {
	var aboutPath = path.join(views, 'about.html');
	res.sendFile(aboutPath)
});

app.get('/login', function (req, res) {
	var loginPath = path.join(views, 'login.html');
	res.sendFile(loginPath);
});

app.get('/signup', function (req, res) {
	var signupPath = path.join(views, 'signup.html');
	res.sendFile(signupPath);
});

app.get('/profile', function (req, res) {
	var profilePath = path.join(views, 'profile.html');
	res.sendFile(profilePath);
})
/* API endpoints*/

//creates a user session
app.post(['/login', '/api/sessions'], function (req, res) {
	
	var username = req.body.username;
	var password = req.body.password;
	var returnUser = {username: username, password: password};
	db.User.findOne(returnUser, function (err, user) {
		if (err){console.log('No access for you!');}
		if (user) {
			res.cookie('guid', user._id, {signed: true});
			res.redirect('/profile');
		} else {
			res.redirect('/login');
		}
	});
});

//signs a user up and takes them to their profile
app.post(['/signup', '/api/users'], function (req, res) {

	var user = req.body.user;
	var username = user.username;
	var password = user.password;

  	db.User.createSecure(username, password, function(err, user) {
		if (err){console.log(err);}
		if (user) {
	      	res.cookie('guid', user._id, {signed: true});
	        res.redirect('/profile');
		} else {
	        res.redirect('/signup');
		}
  });	
});

app.get('/api/profile', function (req, res) {
	console.log(req.cookies);
	var guid = req.signedCookies.guid;
	db.User.findOne({_id: guid}, function (err,user) {
		if (err) { console.log(err);}
		res.send({
			request_headers: req.headers,
			user: user || 'Not Found'
		});
	});
});

/* Server */

app.listen(3000, function () {
	console.log('Code like a girl');
});
