// Database config
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'schedulein');

var UserSchema = require('./UserSchema').UserSchema;
var User = db.model('usercollection', UserSchema);

var find = function(name, pass, callback) {
/*	User.find({}, function(err, user) {
		for (var i=0; i<user.length; i++) {
			console.log("A USER");
			console.log(user);
		}
	});*/
	console.log("Finding " + name);
	User.find({email : name}, function(err, user) {
		if ( err ) {
			callback(err);
		}
		else if ( !user || user.length == 0 ) {
			callback("This email does not exist");
		}
		else {
			User.find({password : pass }, function(err, data) {
				if (err) {
					callback(err);
				}
				else if (!data || data.length == 0){
					callback("Incorrect password");
				}
				else {
					callback(null, data);
				}
			});
		}
	});
};

// Signs up the user
var signUpUser = function(name, pass, callback) {
	
	User.find({}, function(err, user) {
		for (var i=0; i<user.length; i++) {
			user.forEach(function(doc) {
				doc.remove();
			});
		}
	});
	
	//Create JSON of object
	var userObj = {
			email : name,
			password : pass
	};
	
	// Check if already exists
	User.find(userObj, function(err, data) {
		if ( err ) {
			callback(err);
		}
		else {
			console.log("Creating object for " + name);
			// If new, save inside collection
			var user = new User(userObj);
			user.save(function(err, doc) {
				if (err || !doc) {
					callback(err);
				}
				else {
					callback(null, doc);
				}
			});
		}
	});
};

exports.find = find;
exports.signUpUser = signUpUser;

