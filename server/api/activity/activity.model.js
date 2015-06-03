'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var ActivitySchema = new Schema({
	iid: String,
	activity_name: String,
	time: Number,
	duration: Number,
	suggestion: String,
	adate: Date,
	isaccept: String
    
});

module.exports = mongoose.model('Activity', ActivitySchema);
