"use strict";
require('heroku-self-ping')(process.env.ECHO_URL);


var Logger = require('bunyan');
var restifyBunyanLogger = require('restify-bunyan-logger');
var restify = require('restify');

var document = require('./lib/handlers/document.js');
var index = require('./lib/handlers/index.js');


var log = new Logger.createLogger({
  name: 'echo',
});

var server = restify.createServer({
  name: 'echo-server',
  version: '1.0.0',
  log: log,
});

server.on('after', restifyBunyanLogger());

server.use(restify.queryParser());
server.use(restify.bodyParser());


server.get('/', index.get);
server.get('/:id', document.get);
server.post('/:id', document.post);
server.patch('/:id', document.patch);
server.del('/:id', document.del);


module.exports = server;
