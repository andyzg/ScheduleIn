// Database config
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'schedulein');

var TimeSchema = require('./UserSchema').TimeSchema;
var ScheduleSchema = require('./UserSchema').ScheduleSchema;
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
		}
	});
};

// Signs up the user
var signUpUser = function(email, password, firstName, lastName, callback) {
	
	User.find({}, function(err, user) {
		for (var i=0; i<user.length; i++) {
			console.log(user);
		}
	});
	
	//Create JSON of object
	var userObj = {
			email : email,
			password : password,
			name : {
				first : firstName,
				last : lastName
			}
	};
	
	// Check if already exists using above function
	find(email, password, function(err, data) {
		if ( data != null ) {
			callback("Already exists");
		}
		else {
			console.log("Creating object for " + email);
			// If new, save inside collection
			var user = new User(userObj);
			user.save(function(err, doc) {
				if ( err || !doc ) {
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
	if ( data[0].password === password ) {
		callback(null, data);
	}
	else {
		callback("Incorrect password");
	}
};

var findAll = function(option, callback) {
	User.find(option, function(err, data) {
		if (err) {
			callback(err) ;
		}
		else {
			callback(null, data);
		}
	});
};

exports.find = find;
exports.signUpUser = signUpUser;
exports.comparePassword = comparePassword;
exports.findAll = findAll;
/*exports.getSchedule = getSchedule;*/
