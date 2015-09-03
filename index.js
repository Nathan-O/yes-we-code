var express = require('express'),
	app = express(),
	path = require('path'),
	views = path.join(process.cwd(), 'views/');

app.get('/', function (req, res) {
	var homepage = path.join(views, 'index.html'); 
	res.send(homepage);
});

app.get('/about', function (req, res) {
	var aboutPath = path.join(views, 'about.html');
	res.send(aboutPath)
});

app.listen(3000, function () {
	console.log('Code like a girl');
});
