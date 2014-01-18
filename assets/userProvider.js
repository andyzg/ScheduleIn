// Database config
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var Schema = require('./Schema');
// Database setup
UserProvider = function(host, port) {
	this.db = new Db('schedulein', new Server(host, port), {auto_reconnect: false}, function(err, db) {
		if (err) {
			throw err;
		}
		else {
			console.log("Connected to MongoDB!");
			db.on('close', function() {
				if (this._callBackStore) {
					for(var key in this._callBackStore._notReplied) {
						this._callHandler(key, null, 'Connection Closed!');
					}
				}
			});
		}
	});
}

UserProvider.prototype.find = function(name, pass, callback) {
	this.db.collection("user-collection", function(err, user_collection) {
		user_collection.findOne({
			email:name
		}, function(err, response) {
			if (err) {
				callback(err);
			}
			else if ( response.password == pass ){
				callback(null, response);
			}
			else {
				callback("Incorrect password");
			}
		});
	});
};

UserProvider.prototype.signUpUser = function(name, pass, callback) {
	// Creating object for the user
	var user = Schema.user();
	user.email = name;
	user.password = pass;
	
	// Adding the user to the DB
	this.db.collection("user-collection", function(err, user_collection) {
		if ( err ) {
			callback(err);
		}
		else {
			user_collection.insert(user, {safe:true}, function(err, records) {
				if ( err ) {
					callback(err);
				}
				else {
					callback(null, records);
				}
			});
		}
	});
};

exports.UserProvider = UserProvider;