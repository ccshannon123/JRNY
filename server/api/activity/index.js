'use strict';

var express = require('express');
var controller = require('./activity.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

router.post('/get_activity', controller.get_activity);
router.post('/add_activity', controller.add_activity);

router.get('/remove_activity/:id', controller.remove_activity);

module.exports = router;
