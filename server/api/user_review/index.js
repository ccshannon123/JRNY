'use strict';

var express = require('express');
var controller = require('./user_review.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

router.get('/get_user_list', controller.get_user_list);
router.get('/get_user/:email', controller.get_user);
router.get('/get_user_detail/:email', controller.get_user_detail);
router.get('/get_user_detail_by_id/:id', controller.get_user_detail_by_id);
router.get('/get_local', controller.get_local);

router.get('/set_local/:em', controller.set_local);

router.post('/get_review', controller.get_review);
router.post('/add_review', controller.add_review);

router.get('/sendmail', controller.sendmail);
module.exports = router;
