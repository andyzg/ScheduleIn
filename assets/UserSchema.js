var mongoose = require('mongoose');
var jobSchema = new mongoose.Schema({
	slots : [TimeSchema],
	title : String
});

var TimeSchema = new mongoose.Schema({
	day :String,
	time : {
		startTime : String,
		endTime : String
	}
});

var ScheduleSchema = new mongoose.Schema({
	title : String,
	employees : [UserSchema],
	slots : [TimeSchema]
});

var UserSchema = new mongoose.Schema({
	name : {
		first : String,
		last : String
	},
	email : String,
	password : String,
	jobs : [jobSchema],
	schedule : [ScheduleSchema]
});

exports.UserSchema = UserSchema;
exports.ScheduleSchema = ScheduleSchema;
exports.TimeSchema = TimeSchema;