'use strict';

var User = require('../user/user.model');
var UserReview = require('./user_review.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var fs = require('fs');

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('m1Hmo_q9hMt7fYiAsMrxJA');


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

exports.sendmail = function (req, res, next) {
    
        /***** MANDRILL EMAIL ****/
        /***** MANDRILL Vars ****/
        /*if (user.local.active == true) {
    var template_name = "Blah";
} else {
    var template_name = "welcome";
}*/
        var template_name = "welcome";
        var template_content = [{
            "name": "Jrny Signup",
            "content": "Welcome to Jrny"
        }];
        var message = {
            "html": "<p>Welcome to Jrny</p>",
            "text": "Welcome to Jrny",
            "subject": "Jrny Signup",
            "from_email": "noreply@itsthejrny.com",
            "from_name": "Jrny - No Reply",
            "to": [{
                "email": "erikclasie@hotmail.com",
                "name": 'abc',
                "type": "to"
        }],
            "track_clicks": true,
            "merge_language": "mailchimp",
            "global_merge_vars": [{
                "name": "merge1",
                "content": "merge1 content"
        }],

            "tags": [
                "Traveler-User-Signup"
            ]
        };

        /***** MANDRILL Client ****/
        mandrill_client.messages.sendTemplate({
            "template_name": template_name,
            "template_content": template_content,
            "message": message,
        }, function (result) {
            console.log(result);

        }, function (e) {
            // Mandrill returns the error as an object with name and message keys
            console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
        /***** END MANDRILL *****/

};

exports.get_local = function (req, res, next) {

    User.find({'local.applied': true}, function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {
        res.json(users);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.set_local = function (req, res, next) {
  console.log('s');
  console.log(req.params.em);
    User.find({email: req.params.em}, function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {
        users[0].local.applied = true;
        users[0].save(function (err, user) {  
          res.json(user);
        });
      } else {
        res.json({result:'none'});
      }
    });
};

exports.get_user = function (req, res, next) {
    var em = req.params.email;

    User.find({email: {$ne:em}}, function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {

        res.json(users);

      } else {
        res.json({result:'none'});
      }
    });
};

exports.get_user_list = function (req, res, next) {
    User.find({}).sort({firstName: 1}).exec(function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {

        res.json(users);

      } else {
        res.json({result:'none'});
      }
    });
};

exports.get_user_detail = function (req, res, next) {
    var em = req.params.email;

    User.find({email: em}, function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {
        res.json(users[0]);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.get_user_detail_by_id = function (req, res, next) {
    var id = req.params.id;

    User.find({_id: id}, function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {
        res.json(users[0]);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.get_review = function (req, res, next) {
    var tp = req.body.ptype;
    var em = req.body.email;
    var new_reviews;
    var final_review;
    if(tp == 1) {
        UserReview.find({sender: em}, function (err, reviews) {
          if (err) {
            console.log(err);
          } else if (reviews.length) {

            new_reviews = JSON.parse(JSON.stringify(reviews));

            for(var i = 0; i < reviews.length; i++) {
                new_reviews[i].rdate = new_reviews[i].rdate.substr(0, 10);
            }

            res.json(new_reviews);
          } else {
            res.json({result:'none'});
          }
        });
        /*console.log("---Fron here");
        UserReview.find( { sender: em}, function( err, reviews ){
            if (err) {
            console.log(err);
          } else if (reviews.length) {

            new_reviews = JSON.parse(JSON.stringify(reviews));
            new_reviews.forEach(function(review) { 
                review.rdate = review.rdate.substr(0, 10);
                User.find( { email: review.receiver }, function(err, user_detail) { 

                  review.firstName = user_detail[0].firstName;
                  review.lastName = user_detail[0].lastName;
                  review.provider = user_detail[0].provider;
                  review.photoUrl = user_detail[0].photoUrl;

                  
                });
            });
            res.json(new_reviews);
          } else {
            res.json({result:'none'});
          }          

        });*/
    }
    if(tp == 2) {
        UserReview.find({receiver: em}, function (err, reviews) {
          if (err) {
            console.log(err);
          } else if (reviews.length) {

            new_reviews = JSON.parse(JSON.stringify(reviews));

            for(var i = 0; i < reviews.length; i++) {
                new_reviews[i].rdate = new_reviews[i].rdate.substr(0, 10);
            }

            res.json(new_reviews);
          } else {
            res.json({result:'none'});
          }
        });
    }
};

exports.add_review = function (req, res, next) {
    var new_rv = new UserReview();

    new_rv.sender = req.body.sender;
    new_rv.receiver = req.body.receiver;
    new_rv.review = req.body.rate;
    new_rv.description = req.body.desc;
    new_rv.rdate = req.body.rdate;
    
    new_rv.save(function (err, user) {  
        res.json(new_rv);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};
