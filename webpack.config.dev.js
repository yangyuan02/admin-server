/*
 * @Author: yangyuan
 * @Date: 2018-11-14 22:58:32
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2018-11-19 23:01:54
 */
const path = require("path");
const webpack = require("webpack")
const ProgressBarPlugin = require('progress-bar-webpack-plugin');//打包进度条
const HtmlWebpackPlugin = require('html-webpack-plugin')//动态设置index.html引用
const CleanWebpackPlugin = require('clean-webpack-plugin')//清楚打包重复文件
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

const config = {
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename: 'js/[name]-[hash].dev.js',
        chunkFilename: 'js/[name]-[hash].dev.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,//匹配所有的css
                use:[//右向左执行
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders: 1,//importLoaders解决由于css-loader处理文件导入的方式导致postcss-loader不能正常使用的问题
                            options: 'sourceMap',
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true },
                    }
                ],
                exclude:'/node_modules/'//排除node_modules资源检查
            },
            {
                test:/\.less$/,//匹配所有的css
                use:[//右向左执行
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders: 1,//importLoaders解决由于css-loader处理文件导入的方式导致postcss-loader不能正常使用的问题
                            options: 'sourceMap'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true },
                    },
                    {
                        loader: 'less-loader',
                        options: 'sourceMap',
                    }
                ]
            },
            {
                test: /\.js$/,
                use:[
                    {
                        loader: 'babel-loader',
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
                    limit: 1000,
                  },
                },
            },
        ]
    },
    plugins: [
        new ProgressBarPlugin({ format: ' webpack 构建中 [:bar] :percent :msg' }),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({template:'index.html',filename:'index.html'}),
        new CleanWebpackPlugin(['dist'],{root:__dirname,verbose:true,dry:false}),
        new webpack.HotModuleReplacementPlugin()//devserver热替换需要用到
    ],
    devServer:{
      inline:true,
      hot:true,
      port:3000,
      proxy:{
          "/api":"http://localhost:3000"//请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
      }
    },
    devtool: 'eval',//生成source-map级别
}

module.exports = merge(commonConfig,config)