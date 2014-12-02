'use strict';

var mongoose = require('mongoose');

var RequestSchema = require('./schema.js');

RequestSchema.methods = require('./methods.js');

// Register & export the model
module.exports = mongoose.model('Request', RequestSchema);
