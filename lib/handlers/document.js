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
  var data = {
    url: req.url,
    headers: req.headers,
    query: req.query,
    body: req.body,
    date: new Date()
  };

  cache.set(req._url.pathname, data);

  res.send(req.params._echo_reply || {'stored': true});
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
