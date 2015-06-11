'use strict';

var User = require('../user/user.model');
var Message = require('./message.model');
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


exports.get_inbox = function (req, res, next) {
    var em = req.params.email;
    Message.find({ $query: {receiver: em, rdelete:'0', ischat: '0'}, $orderby: { mdate: -1 }}, function (err, messages) {
      if (err) {
        console.log(err);
      } else if (messages.length) {
        res.json(messages);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.get_chat_inbox = function (req, res, next) {
    var em = req.params.email;
    Message.find({ $query: {receiver: em, rdelete:'0', ischat: '1'}, $orderby: { mdate: 1 }}, function (err, messages) {
      if (err) {
        console.log(err);
      } else if (messages.length) {
        res.json(messages);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.get_important = function (req, res, next) {
    var em = req.params.email;
    Message.find({ $query: {receiver: em, rdelete:'0', isimportant: '1'}, $orderby: { mdate: -1 }}, function (err, messages) {
      if (err) {
        console.log(err);
      } else if (messages.length) {
        res.json(messages);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.get_sent = function (req, res, next) {
    var em = req.params.email;
    Message.find({ $query: {sender: em, sdelete:'0', ischat:'0'}, $orderby: { mdate: -1 }}, function (err, messages) {
      if (err) {
        console.log(err);
      } else if (messages.length) {
        res.json(messages);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.rsearch = function (req, res, next) {
    var em = req.body.email;
    var kwd = req.body.kwd;

    var regex = RegExp('.*' + kwd + '.*');

    Message.find({ $query: {receiver: em, rdelete:'0', content: {$regex: regex}}, $orderby: { mdate: -1 }}, function (err, messages) {
      if (err) {
        console.log(err);
      } else if (messages.length) {
        res.json(messages);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.ssearch = function (req, res, next) {
    var em = req.body.email;
    var kwd = req.body.kwd;

    var regex = RegExp('.*' + kwd + '.*');

    Message.find({ $query: {sender: em, sdelete:'0', content: {$regex: regex}}, $orderby: { mdate: -1 }}, function (err, messages) {
      if (err) {
        console.log(err);
      } else if (messages.length) {
        res.json(messages);
      } else {
        res.json({result:'none'});
      }
    });
};

exports.set_important = function (req, res, next) {
    var id = req.body.idx;
    var imt = req.body.val;


    Message.find({_id: id}, function (err, messages) {
      if (err) {
        console.log(err);
      } else if (messages.length) {
        messages[0].isimportant = imt;
        messages[0].save(function (err, msg) {  
          res.json(msg);
        });
        
      } else {
        res.json({result:'none'});
      }
    });
};

exports.mreset = function (req, res, next) {
    Message.find({}, function (err, messages) {
      if (err) {
        console.log(err);
      } else if (messages.length) {
        messages.forEach(function(msg) { 
          msg.rdelete = "0";
          msg.sdelete = "0";
          msg.replyfrom = "0";
          msg.isdraft = "0";
          msg.isread = "0";
          msg.isimportant = "0";
          msg.save(function (err, user) {  
          });
        });
      } else {
        res.json({result:'none'});
      }
    });
};

exports.show = function (req, res, next) {
    var mid = req.params.mid;

    Message.find({_id: mid}, function (err, messages) {
      if (err) {
        console.log(err);
      } else if (messages.length) {
        messages[0].isread = "1";
        messages[0].save(function (err, user) {
          res.json(messages[0]);
        });
        

      } else {
        res.json({result:'none'});
      }
    });

};

exports.rdelete = function (req, res, next) {
    var mids = req.params.mid.split(",");

    var sync = true;


    for(var i = 0; i < mids.length - 1; i++) {
      Message.find({_id: mids[i]}, function (err, messages) {
        if (err) {
          console.log(err);
        } else if (messages.length) {
          messages[0].rdelete = "1";
          messages[0].save(function (err, user) {
          });

          sync = false;

        } else {
          res.json({result:'none'});
        }
      });
    }

    while(sync) {require('deasync').sleep(100);}
    res.json({result:'success'});
};

exports.sdelete = function (req, res, next) {
    var mids = req.params.mid.split(",");

    var sync = true;


    for(var i = 0; i < mids.length - 1; i++) {
      Message.find({_id: mids[i]}, function (err, messages) {
        if (err) {
          console.log(err);
        } else if (messages.length) {
          messages[0].sdelete = "1";
          messages[0].save(function (err, user) {
          });

          sync = false;

        } else {
          res.json({result:'none'});
        }
      });
    }

    while(sync) {require('deasync').sleep(100);}
    res.json({result:'success'});
};

exports.send = function (req, res, next) {
    var new_msg = new Message();

    new_msg.sender = req.body.semail;
    new_msg.receiver = req.body.remail;
    new_msg.content = req.body.ct;
    new_msg.mdate = req.body.dt;
    new_msg.replyfrom = "0";
    new_msg.isdraft = "0";
    new_msg.sdelete = "0";
    new_msg.rdelete = "0";
    new_msg.isread = "0";
    new_msg.isimportant = "0";
    new_msg.ischat = req.body.ic;
    
    new_msg.save(function (err, user) {  
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};
