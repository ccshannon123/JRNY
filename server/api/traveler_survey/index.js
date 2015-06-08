'use strict';

var express = require('express');
var controller = require('./traveler_survey.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

router.post('/get_builder', controller.get_builder);
router.post('/get_jrny', controller.get_jrny);

router.get('/accept_itinerary/:id', controller.accept_itinerary);
router.get('/approve_itinerary/:id', controller.approve_itinerary);
router.get('/get_itinerary/:id', controller.get_itinerary);

router.get('/count_builder/:id', controller.count_builder);
router.get('/count_jrny/:id', controller.count_jrny);

router.post('/get_survey', controller.get_survey);
router.post('/save_survey', controller.save_survey);
router.post('/invite_user', controller.invite_user);
router.post('/remove_invited_user', controller.remove_invited_user);
router.post('/get_invited_user', controller.get_invited_user);

module.exports = router;
