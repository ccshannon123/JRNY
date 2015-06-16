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

  /*var d1 = new Date(parseInt(adt.substr(0, 4)), parseInt(adt.substr(5, 2)) - 1, parseInt(adt.substr(8, 2)));
  var d2 = new Date(parseInt(adt.substr(0, 4)), parseInt(adt.substr(5, 2)) - 1, parseInt(adt.substr(8, 2)) + 1);
  
  var sd1 = d1.getFullYear() + "-";
  if(d1.getMonth() >= 9)
    sd1 += (d1.getMonth() + 1);
  else
    sd1 += "0" + (d1.getMonth() + 1);
  sd1 += "-";
  if(d1.getDate() >= 10)
    sd1 += d1.getDate();
  else
    sd1 += "0" + d1.getDate();

  var sd2 = d2.getFullYear() + "-";
  if(d2.getMonth() >= 9)
    sd2 += (d2.getMonth() + 1);
  else
    sd2 += "0" + (d2.getMonth() + 1);
  sd2 += "-";
  if(d2.getDate() >= 10)
    sd2 += d2.getDate();
  else
    sd2 += "0" + d2.getDate();

  console.log(sd1);
  console.log(sd2);*/


    //Message.find({ $query: {receiver: em, rdelete:'0'}, $orderby: { mdate: -1 }}, function (err, messages) {
    Activity.find({iid:iid1}).sort({time: 1}).exec(function (err, acts) {
      if (err) {
        console.log(err);
      } else if (acts.length) {
        res.json(acts);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.get_activity_by_date = function (req, res, next) {

  var iid1 = req.body.iid;
  var adt = req.body.adt;


    Activity.find({iid:iid1}).sort({time: 1}).exec(function (err, acts) {
      if (err) {
        console.log(err);
      } else if (acts.length) {
        var result = [];
        for(var i = 0; i < acts.length; i++) {
          if(acts[i].adate != undefined)
            if(acts[i].adate.toISOString().substr(0, 10) == adt)
              result.push(acts[i]);
          }
        res.json(result);
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

exports.get_activity_by_id = function (req, res, next) {

  var id = req.params.id;
    
  Activity.find({_id:id}, function (err, acts) {
    if (err) {
      console.log(err);
    } else if (acts.length) {
      res.json(acts);
    } else {
      res.json({result:'none'});
    }
  });
};
/*
    Get local list
*/
exports.add_activity = function (req, res, next) {

  var adt = new Date(req.body.adt);
  //adt.setDate(adt.getDate() + 1);


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

exports.modify_activity = function (req, res, next) {

    var iid = req.body.iid;
    var an = req.body.an;
    var tm = req.body.tm;
    var dur = req.body.dur;
    var sugg = req.body.sugg;
    var place = req.body.place;
    var id = req.body.id;

    var adt = new Date(req.body.adt);
    //adt.setDate(adt.getDate() + 1);

    Activity.find({_id:id}, function (err, acts) {
    if (err) {
      console.log(err);
    } else if (acts.length) {

      var new_act = acts[0];
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

    } else {
      res.json({result:'none'});
    }
  });
    
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};
