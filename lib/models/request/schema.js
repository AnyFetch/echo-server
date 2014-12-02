'use strict';
var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
  url: {type: String, required: true, unique: true},
  headers: {type: Object, default: {}},
  query: {type: Object, default: {}},
  body: {type: Object, default: {}},
  date: {type: Date, default: Date.now, expires: 20}
});

module.exports = RequestSchema;
