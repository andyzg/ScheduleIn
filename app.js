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
	res.redirect('login');
});

app.get('/login', function(req, res) {
	res.render('login');
});

app.post('/login', function(req, res) {
	auth.authenticate(req.body.user, req.body.password, function(err, user){
		if ( err ) {
			res.redirect('/login&error=1')
		}
		else if ( user != null) {
			// Regenerate session when signing in
			// to prevent fixation 
			req.session.regenerate(function(){
			
				// Store the user's primary key 
				// in the session store to be retrieved,
				// or in this case the entire user object
				
				req.session.user = user;
				req.session.success = 'Authenticated as ' + user.name
					+ ' click to <a href="/logout">logout</a>. '
					+ ' You may now access <a href="/restricted">/restricted</a>.';
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

app.get('/list', routes.index);

if (!module.parent) {
	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
}