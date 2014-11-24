"use strict";

require('should');
var request = require('supertest');
var server = require('../app.js');


describe("Echo server", function() {
  it("should accept POST queries", function(done) {
    request(server)
      .post('/123?get_param=foo')
      .expect(200)
      .send({
        post_param: 'bar'
      })
      .expect(/stored/)
      .end(done);
  });

  it("should return previous POST queries when using GET", function(done) {
    request(server)
      .get('/123')
      .expect(200)
      .expect(function(res) {
        res.body.should.have.property('url', '/123?get_param=foo');
        res.body.should.have.property('headers').and.have.property('content-length');
        res.body.should.have.property('query').and.have.property('get_param', 'foo');
        res.body.should.have.property('body').and.have.property('post_param', 'bar');
      })
      .end(done);
  });

  it("should accept PATCH queries", function(done) {
    request(server)
      .patch('/456')
      .expect(200)
      .send({
        post_param: 'bar'
      })
      .expect(/stored/)
      .end(done);
  });

  it("should let the user override the response", function(done) {
    request(server)
      .patch('/456')
      .expect(200)
      .send({
        _echo_reply: 'foobar'
      })
      .expect(/foobar/)
      .end(done);
  });
});
