'use strict';

// Make sure to "npm install faker" first.
const faker = require('faker');

let generateRandomId = function(userContext, events, done) {
  userContext.vars.id = Math.floor(Math.random() * 10000000);
  return done();
};

module.exports = {
  generateRandomId
};
