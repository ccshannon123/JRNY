'use strict';

var User = require('../user/user.model');
var Favorite = require('./favorite.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var fs = require('fs');


var validationError = function (res, err) {
    return res.json(422, err);
};

exports.get_favorite = function (req, res, next) {

  var uid = req.params.uid;

    Favorite.find({uid: uid}, function (err, acts) {
      if (err) {
        console.log(err);
      } else if (acts.length) {
        res.json(acts);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.remove_favorite = function (req, res, next) {

  var fid = req.params.id;

    Favorite.remove({_id: fid}, function (err) {
      res.json({result:'success'});
    });
};

/*
    Get local list
*/
exports.edit_favorite = function (req, res, next) {    

    var fid = req.body.id;
    Favorite.find({_id: fid}, function (err, acts) {
      if (err) {
        console.log(err);
      } else if (acts.length) {

        var new_fav = acts[0];
        new_fav.name = req.body.nm; 
        new_fav.category = req.body.ca;
        new_fav.location = req.body.lo;
        new_fav.phone = req.body.ph;
        new_fav.website = req.body.we;

        new_fav.save(function (err, ts) { 
            res.json(ts);
        });    

      } else {
        res.json({result:'none'});
      }
    });
    
};

exports.add_favorite = function (req, res, next) {    

    var new_fav = new Favorite();

    new_fav.name = req.body.nm;
    new_fav.category = req.body.ca;
    new_fav.location = req.body.lo;
    new_fav.phone = req.body.ph;
    new_fav.website = req.body.we;
    new_fav.uid = req.body.uid;
    new_fav.place = req.body.place;

    new_fav.save(function (err, ts) { 
        console.log(ts); 
      res.json(ts);
    });    
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};
