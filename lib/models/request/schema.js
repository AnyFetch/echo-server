'use strict';
var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
  identifier: {type: String, required: true, unique: true},
  url: {type: String, required: true},
  headers: {type: Object, default: {}},
  query: {type: Object, default: {}},
  body: {type: Object, default: {}},
  date: {type: Date, default: Date.now, expires: 7200}
});

module.exports = RequestSchema;
