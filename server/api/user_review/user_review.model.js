'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserReviewSchema = new Schema({
    sender:String,
    receiver:String,
    review:String,
    description:String,
    rdate:Date
    
});

module.exports = mongoose.model('UserReview', UserReviewSchema);
