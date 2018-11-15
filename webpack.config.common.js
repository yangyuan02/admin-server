/*
 * @Author: yangyuan
 * @Date: 2018-11-15 22:24:15
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2018-11-16 00:10:38
 */
'use strict'
const path = require("path");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')//操作系统之间的大小写问题;

const config = {
    stats: {
        children: false,
        source: false,
        assets: false,
        chunks: false,
        modules: false,
    },
    plugins:[
        new CaseSensitivePathsPlugin()
    ],
    entry:path.resolve(__dirname,'./src/main.js'),//入口
}

module.exports = config