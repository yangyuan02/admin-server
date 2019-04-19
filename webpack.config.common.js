/*
 * @Author: yangyuan
 * @Date: 2018-11-15 22:24:15
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2019-04-19 16:04:21
 */
'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //动态设置index.html引用
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); //操作系统之间的大小写问题;

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
        test: /\.css$/, //匹配所有的css
        use: [
          //右向左执行
          {
            loader: 'style-loader'
          },
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
        ],
        exclude: '/node_modules/' //排除node_modules资源检查
      },
      {
        test: /\.less$/, //匹配所有的css
        use: [
          //右向左执行
          {
            loader: 'style-loader'
          },
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
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
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
  plugins: [new CaseSensitivePathsPlugin(), new HtmlWebpackPlugin({ template: 'index.html', filename: 'index.html' })],
  entry: path.resolve(__dirname, './src/main.js') //入口
};

module.exports = config;
