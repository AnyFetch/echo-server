"use strict";

var LruCache = require('lru-cache');

var cache = new LruCache({
  max: 200,
  maxAge: 1000 * 60 * 60
});


/**
 * Resend the latest params from this endpoint
 */
module.exports.get = function get(req, res, next) {
  var d = cache.get(req.url);
  if(d) {
    res.send(d);
  }
  else {
    res.send(404);
  }

  next();
};


/**
 * Store the request for later use
 */
module.exports.post = function post(req, res, next) {
  var reply = {stored: true};
  if(req.query._echo_reply) {
    reply = parseInt(req.query._echo_reply) || req.query._echo_reply;
    delete req.query._echo_reply;
  }
  if(req.body._echo_reply) {
    reply = parseInt(req.body._echo_reply) || req.body._echo_reply;
    delete req.body._echo_reply;
  }

  var data = {
    url: req.url,
    headers: req.headers,
    query: req.query,
    body: req.body,
    date: new Date()
  };

  cache.set(req._url.pathname, data);

  res.send(reply);
  next();
};


/**
 * Store the request for later use
 * (no semantic difference than with POST)
 */
module.exports.patch = module.exports.post;


module.exports.del = function del(req, res, next) {
  cache.del(req._url.pathname);
  res.send(204);
  next();
};
