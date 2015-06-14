'use strict';

var express = require('express');
var controller = require('./user_account.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

router.get('/:email', controller.get_account);
router.post('/', controller.set_account);

router.post('/del_email', controller.del_email);
router.post('/modify_email', controller.modify_email);

router.post('/del_phone', controller.del_phone);
router.post('/modify_phone', controller.modify_phone);
router.delete('/:email', controller.delete_account);

router.post('/verify', controller.verify);
router.post('/get_verify', controller.get_verify);
router.post('/set_status', controller.set_status);
/*router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);

router.put('/:id/update', auth.isAuthenticated(), controller.update);
router.patch('/:id/update', auth.isAuthenticated(), controller.update);
router.post('/upload', multipartMiddleware, controller.upload);*/


module.exports = router;
