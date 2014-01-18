// Database config
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'schedulein');

var UserSchema = require('./UserSchema').UserSchema;
var User = db.model('usercollection', UserSchema);

var find = function(name, pass, callback) {
	console.log("Finding " + name);
	User.find({email : name}, function(err, user) {
		if ( err ) {
			callback(err);
		}
		else if ( !user || user.length == 0 ) {
			callback("This email does not exist");
		}
		else {
			callback(null, user);
/*			comparePassword(user.password, pass);
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
			});*/
		}
	});
};

// Signs up the user
var signUpUser = function(name, pass, callback) {
	
	User.find({}, function(err, user) {
		for (var i=0; i<user.length; i++) {
			console.log(user);
		}
	});
	
	//Create JSON of object
	var userObj = {
			email : name,
			password : pass
	};
	
	// Check if already exists using above function
	find(name, pass, function(err, data) {
		if ( data != null ) {
			callback("Already exists");
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

var comparePassword = function(data, password, callback) {
	console.log(data[0].password);
	console.log(typeof data[0].password);
	console.log(password);
	console.log(typeof password);
	if ( data[0].password === password ) {
		callback(null, data);
	}
	else {
		callback("Incorrect password");
	}
};

exports.find = find;
exports.signUpUser = signUpUser;
exports.comparePassword = comparePassword;
