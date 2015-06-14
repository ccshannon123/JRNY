'use strict';

var User = require('../user/user.model');
var UserAccount = require('./user_account.model');
var UserVerification = require('./user_verification.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var fs = require('fs');


/*var transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: '',
        pass: 'abcd'
    }
});*/



var validationError = function (res, err) {
    return res.json(422, err);
};


exports.get_account = function (req, res, next) {
    var em = req.params.email;


    UserAccount.find({useremail: em}, function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {
        console.log(users.length);
        res.json(users[0]);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
        res.json({result:'none'});
      }
    });
    /*User.findById(userId, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        res.json(user.profile);
    });*/
};

exports.delete_account = function (req, res, next) {
    UserAccount.remove({useremail: req.params.email}, function (err, user) {
        if (err) return res.send(500, err);
    });

    User.remove({email: req.params.email}, function (err, user) {
        if (err) return res.send(500, err);
    });
    /*User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.send(500, err);
    });*/
};

exports.del_phone = function (req, res, next) {
    var em = req.body.email;
    var ph = req.body.ph;
    UserAccount.find({useremail: em}, function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {
        var newUA = users[0];
        newUA.phones = newUA.phones.replace(ph + ',', '');
        newUA.phones = newUA.phones.replace(ph + '::,', '');

        newUA.save(function (err, user) {
            res.json(newUA);
        });
      }
    });
};

exports.modify_phone = function (req, res, next) {
    var em = req.body.email;
    var ph_org = req.body.ph_org;
    var ph_new = req.body.ph_new;
    var is_prm = req.body.is_prm;

    if(is_prm == true)
        ph_new = ph_new + "::";

    UserAccount.find({useremail: em}, function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {
        var newUA = users[0];
        if(is_prm == true)
            newUA.phones = newUA.phones.replace("::", '');
        newUA.phones = newUA.phones.replace(ph_org, ph_new);

        newUA.save(function (err, user) {
            res.json(newUA);
        });
      }
    });
};

exports.del_email = function (req, res, next) {
    var em = req.body.email;
    var ph = req.body.em;
    UserAccount.find({useremail: em}, function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {
        var newUA = users[0];
        newUA.emails = newUA.emails.replace(ph + ',', '');
        newUA.emails = newUA.emails.replace(ph + '::,', '');

        newUA.save(function (err, user) {
            res.json(newUA);
        });
      }
    });
};

exports.modify_email = function (req, res, next) {
    var em = req.body.email;
    var em_org = req.body.em_org;
    var em_new = req.body.em_new;
    var is_prm = req.body.is_prm;

    if(is_prm == true)
        em_new = em_new + "::";

    UserAccount.find({useremail: em}, function (err, users) {
      if (err) {
        console.log(err);
      } else if (users.length) {
        var newUA = users[0];
        if(is_prm == true)
            newUA.emails = newUA.emails.replace("::", '');
        newUA.emails = newUA.emails.replace(em_org, em_new);

        newUA.save(function (err, user) {
            res.json(newUA);
        });
      }
    });
};

exports.verify = function (req, res, next) {
    var tp = req.body.type;
    var uid = req.body.uid;

    console.log(uid);
    UserVerification.find({uid: uid, type: tp}, function (err, vers) {
      if (err) {
        console.log(err);
      } else if (vers.length) {
        res.json({'result': '0'});
      } else {

        var new_ver = new UserVerification();
        new_ver.uid = uid;
        new_ver.type = tp;
        new_ver.status = "0";
        new_ver.name = "";

        var text = "";
        var possible = "0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        new_ver.code = text;

        new_ver.save(function (err, ver) {  
            res.json({result: '1'});
        });
      }
    });
};


exports.get_verify = function (req, res, next) {
    var uid = req.body.uid;

    UserVerification.find({uid: uid}).sort({status: -1}).exec(function (err, vers) {
      if (err) {
        console.log(err);
      } else if (vers.length) {
        res.json(vers);
      } else {
        res.json({result: 'none'});
      }
    });
};

exports.set_status = function (req, res, next) {
    var id = req.body.id;

    UserVerification.find({_id: id}, function (err, vers) {
      if (err) {
        console.log(err);
      } else if (vers.length) {
        vers[0].status = req.body.status;
        vers[0].save(function (err, ver) {  
            res.json(ver);
        });
      } else {
        res.json({result: 'none'});
      }
    });
};

exports.set_account = function (req, res, next) {
    var em = req.body.email;

    UserAccount.find({useremail: em}, function (err, users) {

      if (err) {
        console.log(err);
      } else if (users.length) {
        var newUA = users[0];
        if(req.body.ptype == 1) {
            newUA.useremail = req.body.email;
            newUA.receive_msg_from_traveler = req.body.rmft;
            newUA.outstanding_request = req.body.or;
            newUA.receive_request_from_traveler = req.body.rrft;
            newUA.changes_made_my_account = req.body.cmma;
            newUA.task_update = req.body.tu;
            newUA.test_msg = req.body.tm;
            newUA.general_updates = req.body.gu;
            newUA.reservation_review_reminders = req.body.rrr;
        }
        else if(req.body.ptype == 2) {
            newUA.country_residence = req.body.cr;
        }
        else if(req.body.ptype == 3) {
            newUA.phones = newUA.phones + req.body.ph + ",";
        }
        else if(req.body.ptype == 4) {
            newUA.emails = newUA.emails + req.body.em + ",";;
        }
        
        newUA.save(function (err, user) {  
            res.json(newUA);
        });

      } else {

        var newUA = new UserAccount();
        if(req.body.ptype == 1) {
            newUA.useremail = req.body.email;
            newUA.receive_msg_from_traveler = req.body.rmft;
            newUA.outstanding_request = req.body.or;
            newUA.receive_request_from_traveler = req.body.rrft;
            newUA.changes_made_my_account = req.body.cmma;
            newUA.task_update = req.body.tu;
            newUA.test_msg = req.body.tm;
            newUA.general_updates = req.body.gu;
            newUA.reservation_review_reminders = req.body.rrr;
            newUA.country_residence = "";
            newUA.phones = "";
            newUA.emails = "";
        }
        else if(req.body.ptype == 2) {
            newUA.useremail = req.body.email;
            newUA.receive_msg_from_traveler = false;
            newUA.outstanding_request = false;
            newUA.receive_request_from_traveler = false;
            newUA.changes_made_my_account = false;
            newUA.task_update = false;
            newUA.test_msg = false;
            newUA.general_updates = false;
            newUA.reservation_review_reminders = false;
            newUA.country_residence = req.body.cr;
            newUA.phones = "";
            newUA.emails = "";
        }
        else if(req.body.ptype == 3) {
            newUA.useremail = req.body.email;
            newUA.receive_msg_from_traveler = false;
            newUA.outstanding_request = false;
            newUA.receive_request_from_traveler = false;
            newUA.changes_made_my_account = false;
            newUA.task_update = false;
            newUA.test_msg = false;
            newUA.general_updates = false;
            newUA.reservation_review_reminders = false;
            newUA.country_residence = "";
            newUA.phones = req.body.ph + ",";
            newUA.emails = "";
        }
        else if(req.body.ptype == 4) {
            newUA.useremail = req.body.email;
            newUA.receive_msg_from_traveler = false;
            newUA.outstanding_request = false;
            newUA.receive_request_from_traveler = false;
            newUA.changes_made_my_account = false;
            newUA.task_update = false;
            newUA.test_msg = false;
            newUA.general_updates = false;
            newUA.reservation_review_reminders = false;
            newUA.country_residence = "";
            newUA.phones = "";
            newUA.emails = req.body.em + ',';
        }
        
        newUA.save(function (err, user) {  
            res.json(newUA);
        });

      }
    });

    
    /*var mailOptions = {
            from: 'craig@itsthejrny.com', // sender address
            to: em, // list of receivers
            subject: 'User Account Notification', // Subject line
            text: 'You modified user account.', // plaintext body
            html: 'You modified user account.' // html body
        };

    transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });*/

};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};
