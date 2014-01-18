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

app.get('/', isLoggedIn, function(req, res) {
	res.redirect('login');
});

app.get('/login', isLoggedIn, function(req, res) {
	if ( req.query.error != null ) {
		console.log("Hello there");
		res.render('login', {message:"Invalid login"});
		return;
	}
	res.render('login');
});

app.post('/login', function(req, res) {
	auth.authenticate(req.body.user, req.body.password, function(err, user){
		if ( err ) {
			res.redirect('/login?error=1');
		}
		else if ( user != null) {
			// Regenerate session when signing in
			// to prevent fixation 
			req.session.regenerate(function(){
				// Store the user's primary key into the current session
				req.session.user = user;
				res.redirect('/list');
			});
		} else {
			res.redirect('/login?error=1');
		}
	});
});

app.post('/signup', function(req, res) {
	auth.addUser(req.body.user, req.body.password, function(err, response) {
		if (err) {
			console.log(err);
			res.redirect('/login');
		}
		else {
			req.session.user = response;
			res.redirect('/list');
		}
	});
});

app.get('/list', function(req, res) {
	if (req.session.user != null) {
		routes.index(req, res);
	}
	else {
		res.redirect('/login');
	}
});

app.get('/logout', function(req, res) {
	req.session.user = null;
	res.redirect('/');
});

// Routing for requests if user is authenticated
function isLoggedIn(req, res, next) {
	console.log(req.session.user);
	if (req.session.user != null) {
		res.redirect('/list');
	}
	next();
};

if (!module.parent) {
	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
}