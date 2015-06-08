'use strict';

var User = require('../user/user.model');
var Activity = require('./activity.model');
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

exports.get_activity = function (req, res, next) {

  var iid1 = req.body.iid;
  var adt = req.body.adt;

    //Message.find({ $query: {receiver: em, rdelete:'0'}, $orderby: { mdate: -1 }}, function (err, messages) {
    Activity.find({iid:iid1, adate:adt}).sort({time: 1}).exec(function (err, acts) {
      if (err) {
        console.log(err);
      } else if (acts.length) {
        res.json(acts);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.remove_activity = function (req, res, next) {

  var id = req.params.id;
    
    Activity.remove({_id: id}, function (err) {
      res.json({result:'success'});
    });
};

/*
    Get local list
*/
exports.add_activity = function (req, res, next) {

    var iid = req.body.iid;
    var an = req.body.an;
    var adt = req.body.adt;
    var tm = req.body.tm;
    var dur = req.body.dur;
    var sugg = req.body.sugg;
    var place = req.body.place;

    var new_act = new Activity();

    new_act.iid = iid;
    new_act.activity_name = an;
    new_act.adate = adt;
    new_act.time = tm;
    new_act.duration = dur;
    new_act.suggestion = sugg;
    new_act.place = place;
    new_act.isaccept = "0";


    new_act.save(function (err, ts) {  
      res.json(ts);
    });    
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};
