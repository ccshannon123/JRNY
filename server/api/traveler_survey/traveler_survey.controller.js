'use strict';

var User = require('../user/user.model');
var TravelerSurvey = require('./traveler_survey.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var fs = require('fs');


/*var transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: '',
        pass: ''
    }
});*/



var validationError = function (res, err) {
    return res.json(422, err);
};

/*
    Get local list
*/
exports.save_survey = function (req, res, next) {

    /*User.find({'local.applied': true}, function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {
        res.json(users);
      } else {
        res.json({result:'none'});
      }
    });*/
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};
