/*
 * @Author: yangyuan
 * @Date: 2018-11-14 22:58:32
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2018-11-15 14:01:36
 */
const path = require("path");
const webpack = require("webpack")
const ProgressBarPlugin = require('progress-bar-webpack-plugin');//打包进度条
const HtmlWebpackPlugin = require('html-webpack-plugin')//动态设置index.html引用
const CleanWebpackPlugin = require('clean-webpack-plugin')//清楚打包重复文件

module.exports = {
    entry:path.resolve(__dirname,'./src/main.js'),//入口
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename: 'js/[name]-[hash].dev.js',
        chunkFilename: 'js/[name]-[hash].dev.js',
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
                            // options: 'sourceMap',
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        // options: { sourceMap: true },
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
                            // options: 'sourceMap'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        // options: { sourceMap: true },
                    },
                    {
                        loader: 'less-loader',
                        // options: 'sourceMap',
                    }
                ]
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin({ format: ' webpack 构建中 [:bar] :percent :msg' }),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({template:'index.html',filename:'index.html'}),
        new CleanWebpackPlugin(['dist'],{root:__dirname,verbose:true,dry:false})
    ]
}