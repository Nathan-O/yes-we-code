var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	db = require('./models'),
	path = require('path'),
	session = require("express-session"),
	ejs = require('ejs'),
    keygen = require('keygenerator'),	
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser');

// use ejs and method override
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// parse the posted data and cookie data
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser('A secret'));

app.use('/static', express.static('public'));

// creating the session
app.use(session ({
	secret: keygen._({specials: true}),
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
	res.render('home');
});

// information about the site route
app.get('/about', function (req, res) {
	res.render('about')
});

// login route
app.get('/login', function (req, res) {
	res.render('login');
});

// signup route
app.get('/signup', function (req, res) {
	res.render('signup');
});

//signs a user up and takes them to their profile
app.post(['/users', '/signup'], function (req, res) {

	var user = req.body.user;
	var username = user.username;
	var password = user.password;

  	db.User.createSecure(username, password, function(err, user) {
		// if (err){console.log(err);}
		// if (user) {
		req.login(user);
	 //      	res.cookie('guid', user._id, {signed: true});
	    res.redirect('/profile');
		// } else {
	 //        res.redirect('/signup');
		// }
  });	
});

//creates a user session when login form is submitted
app.post(['/sessions', '/login'], function (req, res) {
	
	var user = req.body.user;
	var username = user.username;
	var password = user.password;

	db.User.authenticate(username, password, function (err, user) {
		// if (err){console.log('No access for you!');}
		// if (user) {
		req.login(user);
		// 	res.cookie('guid', user._id, {signed: true});
		res.redirect('/profile');
		// } else {
		// 	res.redirect('/login');
		// }
	});
});


// profile of current user
app.get('/profile', function (req, res) {
	// user will only see profile page if logged in
	req.currentUser(function (err, currentUser) {
		if (currentUser === null) {
			res.redirect('/');
		} else {
			res.render('profile', {user: currentUser});
		}
	});
});

app.get('/questions', function (req, res) {
	// user will only see questions page if logged in
	req.currentUser(function (err, user) {
		if (user === null) {
			res.redirect('/');
		} else {
			res.render('questions');
		}
	});
});

app.delete(['/sessions', '/logout'], function (req, res) {
	req.logout();
	res.redirect('/');
});

// app.get('/api/profile', function (req, res) {
// 	console.log(req.cookies);
// 	var guid = req.signedCookies.guid;
// 	db.User.findOne({_id: guid}, function (err,user) {
// 		if (err) { console.log(err);}
// 		res.send({
// 			request_headers: req.headers,
// 			user: user || 'Not Found'
// 		});
// 	});
// });

/* Server */

app.listen(3000, function () {
	console.log('Code like a girl');
});
