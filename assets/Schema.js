var Schema = require('mongoose').Schema;

exports.user = new Schema({
	email : String,
	password : String
});