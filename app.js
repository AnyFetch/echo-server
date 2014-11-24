"use strict";

var restify = require('restify');

var server = restify.createServer({
  name: 'echo-server',
  version: '1.0.0',
});


module.exports = server;
