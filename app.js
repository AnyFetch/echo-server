"use strict";
require('heroku-self-ping')(process.env.ECHO_URL);


var restify = require('restify');
var document = require('./lib/handlers/document.js');


var server = restify.createServer({
  name: 'echo-server',
  version: '1.0.0',
});
server.use(restify.queryParser());
server.use(restify.bodyParser());


server.get('/:id', document.get);
server.post('/:id', document.post);
server.patch('/:id', document.patch);
server.del('/:id', document.del);


module.exports = server;
