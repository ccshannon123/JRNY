'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var fs = require('fs');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('m1Hmo_q9hMt7fYiAsMrxJA');


var validationError = function (res, err) {
    return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
    User.find({}, '-salt -hashedPassword', function (err, users) {
        if (err) return res.send(500, err);
        res.json(200, users);
    });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function (err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresInMinutes: 60 * 5
        });
        res.json({
            token: token
        });


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
                "email": user.email,
                "name": user.firstName + " " + user.lastName,
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

    });
};


// Updates an existing user in the DB.
exports.update = function (req, res) {
    var userId = req.user._id;
    var _ = require('lodash');
    if (req.body._id) {
        delete req.body._id;
    }
    User.findById(userId, function (err, user) {
        if (err) {
            return handleError(res, err);
        }
        if (!user) {
            return res.send(404);
        }
        var updated = _.merge(user, req.body);
        updated.markModified('homeTown');
        updated.languages = req.body.languages;

        updated.save(function (err) {
            if (err) return validationError(res, err);
            return res.json(updated);
        });
    });
};


/**
 * Get a single user
 */
exports.show = function (req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.send(500, err);
        return res.send(204);
    });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function (err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function (err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};


/**
 * Get my info
 */
exports.me = function (req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};

/**
 * Upload
 */
exports.upload = function (req, res, next) {
    var file = req.files.file;
    var tmpPath = file.path;
    var extIndex = tmpPath.lastIndexOf('.');
    var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
    var fileName = file.name;
    var destPath = config.env == 'production' ? './public/uploads/' : './client/uploads/' + fileName;

    var is = fs.createReadStream(tmpPath);
    var os = fs.createWriteStream(destPath);

    if (is.pipe(os)) {
        fs.unlink(tmpPath, function (err) { //To unlink the file from temp path after copy
            if (err) return next(err);
            res.json({
                img: 'uploads/' + fileName
            });
        });
    }
};

exports.upload_cover = function (req, res, next) {
    var file = req.files.file;
    var tmpPath = file.path;
    var extIndex = tmpPath.lastIndexOf('.');
    var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
    var fileName = file.name;
    var destPath = config.env == 'production' ? './public/uploads/' : './client/uploads/' + fileName;

    var is = fs.createReadStream(tmpPath);
    var os = fs.createWriteStream(destPath);

    if (is.pipe(os)) {
        fs.unlink(tmpPath, function (err) { //To unlink the file from temp path after copy
            if (err) return next(err);
            res.json({
                img: 'uploads/' + fileName
            });
        });
    }
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};