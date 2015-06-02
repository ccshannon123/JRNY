'use strict';

var express = require('express');
var controller = require('./session_manage.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

router.get('/:skey', controller.get_value);
router.post('/', controller.set_value);


module.exports = router;
