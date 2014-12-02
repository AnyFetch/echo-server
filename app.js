"use strict";
require('heroku-self-ping')(process.env.ECHO_URL);


var Logger = require('bunyan');
var restifyBunyanLogger = require('restify-bunyan-logger');
var restify = require('restify');
var mongoose = require('mongoose');

var config = require('./config');
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

// Connect to mongoose
var connected = false;
var connectMongo = function(mongoUrl) {
  if(!connected) {
    return mongoose.connect(mongoUrl, function(err) {
      if(err) {
        console.error('Failed to connect to mongo on startup - retrying in 2 sec', err);
        return setTimeout(function() {
          connectMongo(mongoUrl);
        }, 2000);
      }

      connected = true;
    });
  }
};

connectMongo(config.mongoUrl);

server.on('after', restifyBunyanLogger());

server.use(restify.queryParser());
server.use(restify.bodyParser());


server.get('/', index.get);
server.get('/:id', document.get);
server.post('/:id', document.post);
server.patch('/:id', document.patch);
server.del('/:id', document.del);


module.exports = server;
