"use strict";

require('should');
var request = require('supertest');
var server = require('../app.js');


describe("Echo server", function() {
  it("should accept POST queries", function(done) {
    request(server)
      .post('/123')
      .expect(200)
      .send({
        foo: 'bar'
      })
      .end(done);
  });

  it("should return previous POST queries when using GET", function(done) {
    request(server)
      .get('/123')
      .expect(200)
      .expect(function(res) {
        console.log(res.body);
      })
      .end(done);
  });
});
