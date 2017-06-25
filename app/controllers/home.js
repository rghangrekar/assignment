var express = require('express'),
  router = express.Router(),
  appointments = require('../models/appointments');

var path = require('path');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/appointments', function (req, res, next) {
  res.json(appointments);
});
