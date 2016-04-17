var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var connectionString = 'mongodb://127.0.0.1:27017/webdev-db/';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
            process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


io.on('connection', function(socket) {
    socket.on('disconnect', function() {
    });
    socket.on('join chat', function(id) {
        socket.join(id)
    });
    socket.on('chat message', function(id, message) {
        io.in(id).emit('chat message' + id, message);
    });
});


//require("./public/assignment/server/app.js")(app, uuid, mongoose, db);
require("./public/project/server/app.js") (app, mongoose, db, multer, fs);

http.listen(port, ipaddress);


