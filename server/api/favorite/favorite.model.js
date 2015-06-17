'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var FavoriteSchema = new Schema({
    name: String,
    location: String,
    phone: String,
    website: String,
    category: String,
    place: Object,
    uid: String
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
