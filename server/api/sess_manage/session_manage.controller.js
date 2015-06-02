'use strict';

var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var fs = require('fs');


var validationError = function (res, err) {
    return res.json(422, err);
};


exports.get_value = function (req, res, next) {
    var skey = req.params.skey;

    console.log(req.session.pemail);
    if(skey == "1")
        res.json({result:req.session.pemail});
};

exports.set_value = function (req, res, next) {
    var skey = req.body.skey;
    console.log(req.body.val);
    if(skey == "1")
        req.session.pemail = req.body.val;
    res.json({result:req.session.pemail});
};

exports.authCallback = function (req, res, next) {
    res.redirect('/');
};
