var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');

var router = express.Router();

router.post('/', 
  passport.authenticate('local', { session: false,failureRedirect: '/api/unauthorized' }),
  function(req, res) {
    res.json({ message: "Authenticated" })
  });

module.exports = router;
