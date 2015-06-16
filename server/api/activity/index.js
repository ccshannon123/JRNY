'use strict';

var express = require('express');
var controller = require('./activity.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

router.post('/get_activity', controller.get_activity);
router.post('/get_activity_by_date', controller.get_activity_by_date);
router.post('/add_activity', controller.add_activity);
router.post('/modify_activity', controller.modify_activity);

router.get('/remove_activity/:id', controller.remove_activity);
router.get('/get_activity_by_id/:id', controller.get_activity_by_id);

module.exports = router;
