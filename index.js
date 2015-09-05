var express = require('express'),
	app = express(),
	path = require('path'),
	views = path.join(process.cwd(), 'views/');	
	bodyParser = require('body-parser');

app.use("/static", express.static('public'));

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

app.get(['/login', '/api/profile'], function (req, res) {
	var username = req.params.body;
	var password = req.params.body;
});


app.listen(3000, function () {
	console.log('Code like a girl');
});
