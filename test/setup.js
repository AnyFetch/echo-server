"use strict";

var Logger = require('bunyan');


// Replace logger to write in file
before(function() {
  require('../app.js').log = new Logger.createLogger({
    name: 'echo',
    streams: [{
      path: '/tmp/echo-test.log'
    }]
  });
});
