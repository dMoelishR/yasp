/*
//general purpose proxy
var express = require('express');
var request = require('request');
var app = express();
app.use(function(req, res) {
    console.log(req.originalUrl);
    req.pipe(request(req.originalUrl)).pipe(res);
});
app.listen(process.env.PORT);
*/
//mirrors steam api
var config = require('./config');
var httpProxy = require('http-proxy');
httpProxy.createProxyServer({
    target: 'http://api.steampowered.com'
}).listen(config.OPENSHIFT_NODEJS_PORT || config.PROXY_PORT || config.PORT, config.OPENSHIFT_NODEJS_IP);
