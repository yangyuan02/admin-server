/*
 * @Author: yangyuan
 * @Date: 2018-11-14 22:58:32
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2019-04-22 15:56:46
 */
const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); //打包进度条
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

const config = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name]-[hash].dev.js',
    chunkFilename: 'js/[name]-[hash].dev.js'
  },
  plugins: [
    new ProgressBarPlugin({ format: ' webpack 构建中 [:bar] :percent :msg' }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin() //devserver热替换需要用到
  ],
  devServer: {
    inline: true,
    hot: true,
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:3000' //请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
    }
  },
  devtool: 'cheap-module-source-map' //生成source-map级别
};

module.exports = merge(commonConfig, config);
