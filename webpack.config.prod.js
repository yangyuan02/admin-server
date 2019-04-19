/*
 * @Author: yangyuan
 * @Date: 2018-11-15 22:31:16
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2019-04-19 16:04:16
 */
'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //压缩js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清楚打包重复文件
const commonConfig = require('./webpack.config.common.js');

const config = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name]-[chunkhash].entry.js',
    chunkFilename: 'js/[name]-[chunkhash].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"prod"'
      }
    }),
    new UglifyJSPlugin({ parallel: 4, cache: true, sourceMap: true, compress: { warnings: false, drop_console: true } }),
    new OptimizeCssAssetsPlugin({ cssProcessorOptions: { zindex: false, reduceIdents: false } }),
    new CleanWebpackPlugin(['dist'], { root: __dirname, verbose: true, dry: false }),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 20000 }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devtool: 'source-map'
};

module.exports = merge(commonConfig, config);
