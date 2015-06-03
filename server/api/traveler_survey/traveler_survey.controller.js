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

    var t_id = req.body.traveler;
    var l_id = req.body.local;

    

    TravelerSurvey.find({local: l_id, traveler: t_id}, function (err, reqs) {
      if (err) {
        console.log(err);
      } else if (reqs.length) {

        var new_ts = reqs[0];

        new_ts.basic.arrival_date = req.body.basic.arrival_date + " " + req.body.basic.arrival_time;
        new_ts.basic.departure_date = req.body.basic.departure_date + " " + req.body.basic.departure_time;
        new_ts.basic.how_get = req.body.basic.how_get;
        new_ts.basic.how_already_booked = req.body.basic.how_already_booked;
        new_ts.basic.where_stay = req.body.basic.where_stay;
        new_ts.basic.where_already_booked = req.body.basic.where_already_booked;

        new_ts.companion = req.body.companion;
        new_ts.interest = req.body.interest;

        new_ts.save(function (err, ts) {  
          res.json(ts);
          });

      } else {

        var new_ts = new TravelerSurvey();

        new_ts.traveler = t_id;
        new_ts.local = l_id;
        new_ts.isaccept = "0";

        new_ts.basic.arrival_date = req.body.basic.arrival_date + " " + req.body.basic.arrival_time;
        new_ts.basic.departure_date = req.body.basic.departure_date + " " + req.body.basic.departure_time;
        new_ts.basic.how_get = req.body.basic.how_get;
        new_ts.basic.how_already_booked = req.body.basic.how_already_booked;
        new_ts.basic.where_stay = req.body.basic.where_stay;
        new_ts.basic.where_already_booked = req.body.basic.where_already_booked;

        new_ts.companion = req.body.companion;
        new_ts.interest = req.body.interest;

        new_ts.save(function (err, ts) {  
          res.json(ts);
        });


      }
    });
    
};


exports.get_survey = function (req, res, next) {

    var t_id = req.body.traveler;
    var l_id = req.body.local;    

    TravelerSurvey.find({local: l_id, traveler: t_id}, function (err, reqs) {
      if (err) {
        console.log(err);
      } else if (reqs.length) {

        var new_ts = reqs[0];

        res.json(new_ts);

      } else {

        res.json({Result: 'none'});


      }
    });
    
};


exports.get_builder = function (req, res, next) {
  TravelerSurvey.find({local: req.params.id}, function (err, reqs) {
      if (err) {
        console.log(err);
      } else if (reqs.length) {

        res.json(reqs);

      } else {

        res.json({Result: 'none'});


      }
    });
};

exports.get_jrny = function (req, res, next) {
  TravelerSurvey.find({traveler: req.params.id}, function (err, reqs) {
      if (err) {
        console.log(err);
      } else if (reqs.length) {

        res.json(reqs);

      } else {

        res.json({Result: 'none'});


      }
    });
};

exports.accept_itinerary = function (req, res, next) {
  TravelerSurvey.find({_id: req.params.id}, function (err, reqs) {
      if (err) {
        console.log(err);
      } else if (reqs.length) {

        reqs[0].isaccept = "1";
        reqs[0].save(function (err, ts) {  
          res.json(ts);
        });

      } else {

        res.json({Result: 'none'});


      }
    });
};

exports.get_itinerary = function (req, res, next) {
  TravelerSurvey.find({_id: req.params.id}, function (err, reqs) {
      if (err) {
        console.log(err);
      } else if (reqs.length) {

        reqs[0].save(function (err, ts) {  
          res.json(ts);
        });

      } else {

        res.json({Result: 'none'});


      }
    });
};
/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};
