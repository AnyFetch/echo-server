'use strict';

module.exports = {
  mongoUrl: process.env.MONGO_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/echo-server'
};
