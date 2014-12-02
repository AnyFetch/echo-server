'use strict';

module.exports.toJson = function() {
  return {
    url: this.url,
    headers: this.headers,
    query: this.query,
    body: this.body,
    date: this.date
  };
};
