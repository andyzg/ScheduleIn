var mongoose = require('mongoose');
/*var choiceSchema = new mongoose.Schema({
	text: String,
	votes: [voteSchema]
});*/

exports.UserSchema = new mongoose.Schema({
	email:String,
	password: String
});