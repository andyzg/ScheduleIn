// Database config
/*var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;*/
// var Schema = require('./Schema');

var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'schedulein');

var UserSchema = require('./UserSchema').UserSchema;
var User = db.model('schedulein', UserSchema);

// Database setup
/*UserProvider = function(host, port) {
	this.db = new Db('schedulein', new Server(host, port, {auto_reconnect: true}), {w:1}, function(err, db) {
		if (err) {
			throw err;
		}
		else {
			console.log("Connected to MongoDB!");
			db.open(function(err) {
				if ( err ) {
					throw err;
				}
			});
			db.on('close', function() {
				if (this._callBackStore) {
					for(var key in this._callBackStore._notReplied) {
						this._callHandler(key, null, 'Connection Closed!');
					}
				}
			});
		}
	});
};*/

/*UserProvider.prototype.getCollection = function(callback) {
	this.db.collection('usercollection', function(error, usercollection) {
		if (error) {
			callback("Could not get database");
		}
		else {
			callback(null, usercollection);
		}
	});
};*/

var find = function(name, pass, callback) {
	User.find({}, function(err, user) {
		for (var i=0; i<user.length; i++) {
			console.log("A USER");
			console.log(user);
		}
	});
	
	User.find({email : name}, 'password', function(err, user) {
		if ( err ) {
			callback(err);
		}
		else if (!user) {
			callback("This email does not exist");
		}
		else {
			console.log(user);
			User.find({password : pass }, function(err, data) {
				if (err) {
					callback(err);
				}
				else if (!data || data.length == 0){
					callback("Incorrect password");
				}
				else {
					console.log(data);
					callback(null, data);
				}
			});
		}
	});
};

// Signs up the user
var signUpUser = function(name, pass, callback) {
	
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

