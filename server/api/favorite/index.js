'use strict';

var express = require('express');
var controller = require('./favorite.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

router.get('/get_favorite/:uid', controller.get_favorite);
router.get('/remove_favorite/:id', controller.remove_favorite);

router.post('/add_favorite', controller.add_favorite);
router.post('/edit_favorite', controller.edit_favorite);


module.exports = router;
