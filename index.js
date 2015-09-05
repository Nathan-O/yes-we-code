var express = require('express'),
	app = express(),
	path = require('path'),
	views = path.join(process.cwd(), 'views/'),	
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser');

//parse the posted data and cookie data
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser("A secret"));

app.use("/static", express.static('public'));

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

/* API endpoints*/

app.post(['/login', '/api/profile'], function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
});


app.listen(3000, function () {
	console.log('Code like a girl');
});
