'use strict';

var express = require('express');
var controller = require('./message.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

router.get('/inbox/:email', controller.get_inbox);
router.get('/sent/:email', controller.get_sent);
router.get('/show/:mid', controller.show);
router.get('/rdelete/:mid', controller.rdelete);
router.get('/sdelete/:mid', controller.sdelete);

router.get('/mreset', controller.mreset);

router.post('/send', controller.send);
router.post('/rsearch', controller.rsearch);
router.post('/ssearch', controller.ssearch);

module.exports = router;
