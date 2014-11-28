"use strict";

require('should');
var request = require('supertest');
var server = require('../app.js');


describe("Echo server", function() {
  describe("/ endpoint", function() {
    it("should redirect to github", function(done) {
      request(server)
        .get('/')
        .expect(302)
        .expect('Location', /github/i)
        .end(done);
    });
  });

  describe("/document endpoint", function() {
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

    it("should let the user override the response data", function(done) {
      request(server)
        .patch('/456')
        .send({
          _echo_reply: 'foobar'
        })
        .expect(200)
        .expect(/foobar/)
        .end(done);
    });

    it("should let the user override the response status code", function(done) {
      request(server)
        .patch('/789')
        .send({
          _echo_reply: 204,
          foo: 'bar'
        })
        .expect(204)
        .end(done);
    });

    it("should not store _echo_reply", function(done) {
      request(server)
        .get('/789')
        .expect(200)
        .expect(function(res) {
          res.body.body.should.have.property('foo', 'bar');
          res.body.body.should.not.have.property('_echo_reply');
        })
        .end(done);
    });

    it("should accept DELETE queries", function(done) {
      request(server)
        .del('/456')
        .expect(204)
        .end(done);
    });
  });
});
