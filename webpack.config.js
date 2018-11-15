/*
 * @Author: yangyuan
 * @Date: 2018-11-15 11:18:43
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2018-11-15 22:34:16
 */
'use strict';
let config;
if (process.env.NODE_ENV === 'dev') {
  process.env.NODE_ENV = 'dev';
  config = require('./webpack.config.dev.js');
} else {
  config = require('./webpack.config.prod.js');
}

module.exports = config;
