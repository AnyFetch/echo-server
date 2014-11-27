'use strict';

module.exports.get = function get(req, res, next) {
  res.header('Location', 'https://github.com/AnyFetch/echo-server#readme');
  res.send(302);

  next();
};
