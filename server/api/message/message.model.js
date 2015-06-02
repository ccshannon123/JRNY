'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var MessageSchema = new Schema({
    sender:String,
    receiver:String,
    content:String,
    replyfrom:String,
    isdraft:String,
    sdelete:String,
    rdelete:String,
    isread:String,
    mdate:Date
    
});

module.exports = mongoose.model('Message', MessageSchema);
