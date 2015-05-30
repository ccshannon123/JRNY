'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserAccountSchema = new Schema({
    useremail:String,
    receive_msg_from_traveler: Boolean,
    outstanding_request: Boolean,
    receive_request_from_traveler: Boolean,
    changes_made_my_account: Boolean,
    task_update: Boolean,
    test_msg: Boolean,
    general_updates: Boolean,
    reservation_review_reminders: Boolean,
    country_residence:String,     
    phones: String,
    emails: String
    
});

module.exports = mongoose.model('UserAccount', UserAccountSchema);
