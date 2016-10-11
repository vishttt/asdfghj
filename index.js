var fs = require('fs');
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');


var env = process.env.NODE_ENV || 'default';
var config = require('config');
var app = express();
require('./config/database')(app, mongoose);



// bootstrap data models
fs.readdirSync(__dirname + '/models').forEach(function (file) {
    if (~file.indexOf('.js'))
        require(__dirname + '/models/' + file);
});



// Import the Anagrammatix game file.

var agx = require('./agxgame');
var User = mongoose.model('User');
var Board = mongoose.model('Board');
var graph = require('fbgraph');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(flash());
app.use(session({key: 'express.sid', secret: 'S3CRE7-S3SSI0N', saveUninitialized: true, resave: true}));
app.use(express.static(path.join(__dirname, 'public')));

require('./config/errorHandlers.js')(app);



// Create a Node.js based http server on port 8080
var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);
require('socketio-auth')(io, {
    authenticate: authenticate,
    postAuthenticate: postAuthenticate,
    timeout: 1000
});

function authenticate(socket, data, callback) {
   
    var userID = data.userID;
    var accessToken = data.accessToken;


    User.findOne({facebookid: userID}, function (err, user) {

        if (err) {
            return callback(new Error("User not found"));

        }

        if (user === null) {
            graph.setAccessToken(accessToken);
            graph.get(userID, function (err, res) {
                var u = new User({facebookid: userID, name: res.name, accesstoken: accessToken, lastConnection: 'Sun Nov 02 2014 11:16:56 GMT+0100 (CET)'});
                u.save(function (err) {
                });
                return callback(null, true);
            });

        } else {

            return callback(null, true);
        }
    });

}


function postAuthenticate(socket, data) {
    console.log("post Authen");
    var userID = data.userID;
    var accessToken = data.accessToken;
    User.findOne({facebookid: userID}, function (err, user) {
        socket.client.user = user;
        socket.emit('updateUserInfo', user);
    });
   


}


io.set('log level', 1);

// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on('connection', function (socket) {
    //console.log('client connected');
    agx.initGame(io, socket);
});


