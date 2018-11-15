'use strict';
let config;
if (process.env.NODE_ENV === 'dev') {
  process.env.NODE_ENV = 'dev';
  config = require('./webpack.config.dev.js');
} else {
  config = require('./webpack.development.config');
}

module.exports = config;
