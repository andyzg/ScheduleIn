var userProvider = require('./UserProvider');
// var userProvider = new UserProvider('localhost', 27017);

exports.authenticate = function(name, pass, callback) {
	console.log('authenticating %s:%s', name, pass);	
		
	 // Fetch from databasae
	var user = userProvider.find(name, pass, function(err, response) {
		
		// query the db for the given username
		if ( !response ) {
			console.log("Email DNE");
			return callback("Email does not exist");
		}
		else {
			userProvider.comparePassword(response, pass, function(err, response) {
				if ( err ) {
					callback(err);
				}
				else {
					callback(null, response);
				}
			});
		}
	});
};

// Adds a user to the system
exports.addUser = function(name, pass, firstName, lastName, callback) {
	
	userProvider.find(name, pass, function(err, response) {
		// A user was found with the same email
		if ( response ) {
			callback("Email already exists");
		}
		else {
			// Sign up the user if the email wasn't found
			userProvider.signUpUser(name, pass, firstName, lastName, function(err, response) {
				if ( err ) {
					callback(err);
				}
				else {
					callback(null, response);
				}
			});
		}
	});
	
};