/*
 * @Author: yangyuan
 * @Date: 2018-11-15 22:24:15
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2019-04-22 20:36:34
 */
'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //动态设置index.html引用
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); //操作系统之间的大小写问题;
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // 不会热更新，那么应该放在prod中
const webpack = require('webpack');

const config = {
  stats: {
    children: false,
    source: false,
    assets: false,
    chunks: false,
    modules: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'] //在react环境下,也可以进行打包
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/, //对这个不做处理
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'] //在react环境下,也可以进行打包
          }
        }
      },
      {
        test: /\.css$/, //匹配所有的css
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader'
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1, //importLoaders解决由于css-loader处理文件导入的方式导致postcss-loader不能正常使用的问题
                options: 'sourceMap'
              }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            }
          ]
        }),
        exclude: '/node_modules/' //排除node_modules资源检查
      },
      {
        test: /\.less$/, //匹配所有的css
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader'
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1, //importLoaders解决由于css-loader处理文件导入的方式导致postcss-loader不能正常使用的问题
                options: 'sourceMap'
              }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'less-loader',
              options: 'sourceMap'
            }
          ]
        })
      },
      {
        test: /\.(gif|jpg|png|svg|woff|woff2|eot|ttf)(\?[^?]*)?$/,
        // loader: 'url-loader?name=static/[name].[hash].[ext]&limit=1000000',
        loader: {
          loader: 'url-loader',
          options: {
            name: 'static/[name].[hash].[ext]',
            limit: 1000
          }
        }
      }
    ]
  },
  resolve: {
    //一些别名
    alias: {},
    extensions: ['.js', '.jsx', '.jsx.js', '.ts', '.tsx']
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].js',
      minChunks: function(module, count) {
        const isVendor = module.context && module.context.indexOf('node_modules') !== -1;
        const isMultiple = count >= 3;
        return isVendor || isMultiple;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].js',
      minChunks: function(module, count) {
        return count >= 3;
      }
    }),
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css', //规定打包后css叫什么名称
      allChunks: false //给css指定一个提取的范围，如果为true表示所有import的css都会提取出来,默认是false，只会提取初始化的css，异步加载的就认为不是初始化
    }),
    new HtmlWebpackPlugin({ template: 'index.html', filename: 'index.html' })
  ],
  entry: path.resolve(__dirname, './src/main.js') //入口
  // entry: {
  //   first: './src/js/first.js',
  //   second: './src/js/second.js',
  //   third: './src/js/third.js',
  //   five: './src/js/five.js'
  // }
};

module.exports = config;
