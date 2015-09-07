var express = require('express'),
	app = express(),
	db = require('./models'),
	path = require('path'),
	session = require("express-session"),
	views = path.join(process.cwd(), 'views/'),	
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	bcrypt = require('bcrypt');

// parse the posted data and cookie data
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser('A secret'));

app.use('/static', express.static('public'));

// creating the session
app.use(session ({
	secret: 'secret key',
	resave: false,
	saveUninitialized: true
	})
);

// extends the 'req' object to help manage the sessions
app.use(function (req, res, next) {
	// login user
	req.login = function (user) {
		req.session.userID = user._id;
	};
	// finds current user
	req.currentUser = function (callback) {
		db.User.findOne({_id: req.session.userID},
			function (err, user) {
				req.user = user;
				callback (null, user);
			})
	};
	// logout current user
	req.logout = function () {
		req.session.userID = null;
		req.user = null;
	}
	//call next middleware in the stack
	next();
});

// homepage route
app.get('/', function (req, res) {
	var homePath = path.join(views, 'index.html'); 
	res.sendFile(homePath);
});

// information about the site route
app.get('/about', function (req, res) {
	var aboutPath = path.join(views, 'about.html');
	res.sendFile(aboutPath)
});

// login route
app.get('/login', function (req, res) {
	var loginPath = path.join(views, 'login.html');
	res.sendFile(loginPath);
});

// signup route
app.get('/signup', function (req, res) {
	var signupPath = path.join(views, 'signup.html');
	res.sendFile(signupPath);
});

// profile of current user
app.get('/profile', function (req, res) {
	var profilePath = path.join(views, 'profile.html');
	// user will only see profile page if logged in
	req.currentUser(function (err, user) {
		if (user === null) {
			res.redirect('/');
		} else {
			res.sendFile(profilePath);
		}
	});
});

//creates a user session when login form is submitted
app.post(['/sessions', '/login'], function (req, res) {
	
	var username = req.body.username;
	var password = req.body.password;
	db.User.authenticate(username, password, function (err, user) {
		if (err){console.log('No access for you!');}
		if (user) {
			req.login(user);
			res.cookie('guid', user._id, {signed: true});
			res.redirect('/profile');
		} else {
			res.redirect('/login');
		}
	});
});

//signs a user up and takes them to their profile
app.post(['/users', '/signup'], function (req, res) {

	var user = req.body.user;
	var username = user.username;
	var password = user.password;

  	db.User.createSecure(username, password, function(err, user) {
		if (err){console.log(err);}
		if (user) {
		req.login(user);
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
