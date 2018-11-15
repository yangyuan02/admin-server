/*
 * @Author: yangyuan
 * @Date: 2018-11-15 22:24:15
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2018-11-15 22:34:09
 */
'use strict'

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
    ]
}

module.exports = config