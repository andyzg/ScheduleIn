// Database config
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var Db = require('mongodb').Db;
Server = require('mongodb').Server;

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
			email:name,
			password:pass
		}, function(err, response) {
			if (err) {
				callback(err);
			}
			else {
				callback(null, response);
			}
		});
	});
};

UserProvider.prototype.signUpUser = function(name, pass, callback) {
	var user;
}

exports.UserProvider = UserProvider;