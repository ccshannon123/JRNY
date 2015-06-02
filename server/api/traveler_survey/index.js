'use strict';

var express = require('express');
var controller = require('./traveler_survey.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

//router.get('/get_user_detail/:email', controller.get_user_detail);

router.post('/save_survey', controller.save_survey);

module.exports = router;
