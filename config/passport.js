var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var graph = require('fbgraph');

module.exports = function (app, passport) {

    // serialize sessions
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}, function (err, user) {
            done(err, user)
        });
    });

    // use local strategy
    passport.use(new LocalStrategy({
        "usernameField": "userID",
        "passwordField": "accessToken"

    }
    , function (userID, password, done) {
   

        User.findOne({facebookid: userID}, function (err, user) {

            if (err) {
                return done(err);
            }

            if (user === null) {
                graph.setAccessToken(password);
                graph.get(userID, function (err, res) {
                    var u = new User({facebookid: userID, name: res.name, accesstoken: password, lastConnection: 'Sun Nov 02 2014 11:16:56 GMT+0100 (CET)'});
                    u.save(function (err) {});
                    return done(null, u);
                });

            } else {

                return done(null, user);
            }
        });

    }));
};