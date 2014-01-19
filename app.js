// Module dependencies.
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var auth = require('./assets/auth');
var url = require('url');

var UserProvider = require('./assets/UserProvider');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({ secret: 'something' }));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	if ( req.query.error != null ) {
		console.log("Hello there");
		res.render('index', {message:"Invalid login"});
		return;
	}
	res.render('index');
});

/*app.get('/schedule', function(req, res) {
	UserProvider.getSchedule(function(err, sched) {
		if (!err) {
			res.json(sched);
		}
	});
});*/

app.get('/user', function(req, res) {
	UserProvider.findAll({}, function(err, data) {
		if ( err ) {
			res.send(401);
		}
		res.json(200, data);
	});
});

app.post('/user', function(req, res) {
	res.send(200, "Good");
});

app.post('/login', function(req, res) {
	auth.authenticate(req.body.email, req.body.password, function(err, user){
		if ( err ) {
			console.log(err);
			console.log("SENDING 401");
			res.send(401);
		}
		else if ( user != null) {
			// Regenerate session when signing in
			// to prevent fixation 
			req.session.regenerate(function(){
				// Store the user's primary key into the current session
				req.session.user = user;
				res.json(user);
			});
		}
	});
});

app.post('/signup', function(req, res) {
	auth.addUser(req.body.email, req.body.password, req.body.firstName, req.body.lastName, function(err, response) {
		if (err) {
			console.log(err);
			res.send(401, err);
		}
		else {
			req.session.user = response;
			res.send(200, response);
		}
	});
});

app.get('/logout', function(req, res) {
	req.session.user = null;
	res.redirect('/');
});

if (!module.parent) {
	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
}