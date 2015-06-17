'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var AttachmentSchema = new Schema({
	iid: String,
	type: String,
	filename: String
    
});

module.exports = mongoose.model('Attachment', AttachmentSchema);
