var mongoose = require('mongoose');
var jobSchema = new mongoose.Schema({
	jobId: String,
	slot:[timeSchema]
});

var timeSchema = new mongoose.Schema({
	day:String,
	time: {
		startTime : String,
		endTime : String
	}
});

exports.UserSchema = new mongoose.Schema({
	email:String,
	password: String,
	jobs: {
		id:[jobSchema],
		jobTitle:String
	}
});