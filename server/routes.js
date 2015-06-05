/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/user_account', require('./api/user_account'));
  app.use('/api/user_review', require('./api/user_review'));
  app.use('/api/message', require('./api/message'));
  app.use('/api/sess_manage', require('./api/sess_manage'));
  app.use('/api/traveler_survey', require('./api/traveler_survey'));
  app.use('/api/activity', require('./api/activity'));
  app.use('/api/favorite', require('./api/favorite'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
