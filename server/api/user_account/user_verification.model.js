'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserVerificationSchema = new Schema({
    uid:String,
    type: String,
    code: String,
    status: String,
    name: String
    
});

module.exports = mongoose.model('UserVerification', UserVerificationSchema);
