"use strict";

var async = require('async');
var rarity = require('rarity');

var Request = require('../models/request');

/**
 * Resend the latest params from this endpoint
 */
module.exports.get = function get(req, res, next) {
  Request.findOne({url: req.url}, function(err, request) {
    if(err) {
      return next(err);
    }

    if(!request) {
      res.send(404);
      return next();
    }


    res.send(request.toJson());
    return next();
  });
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

  async.waterfall([
    function retrieveRequest(cb) {
      Request.findOne({url: req.url}, cb);
    },
    function updateRequest(request, cb) {
      if(!request) {
        request = new Request();
      }

      request.url = req.url;
      request.headers = req.headers;
      request.query = req.query;
      request.body = req.body;

      request.save(rarity.slice(1, cb));
    },
    function sendResponse(cb) {
      res.send(reply);
      cb();
    }
  ], next);
};


/**
 * Store the request for later use
 * (no semantic difference than with POST)
 */
module.exports.patch = module.exports.post;


module.exports.del = function del(req, res, next) {
  Request.remove({url: req._url.pathname}, function(err) {
    if(err) {
      return next(err);
    }

    res.send(204);
    return next();
  });
};
