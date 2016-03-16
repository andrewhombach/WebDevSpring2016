var express = require('express');
var app = express();
var session = require('express-session');
var cookie = require('cookie-parser');




app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("assignment/server/app.js")(app)

app.listen(port, ipaddress);