'use strict';

var express = require('express');
var controller = require('./traveler_survey.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

router.get('/get_builder/:id', controller.get_builder);
router.get('/get_jrny/:id', controller.get_jrny);
router.get('/accept_itinerary/:id', controller.accept_itinerary);
router.get('/get_itinerary/:id', controller.get_itinerary);

router.post('/get_survey', controller.get_survey);
router.post('/save_survey', controller.save_survey);

module.exports = router;
