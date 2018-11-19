/*
 * @Author: yangyuan
 * @Date: 2018-11-19 22:01:18
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2018-11-19 23:04:49
 */
/**
 * 单独拎出来写webpack-dev-server.js
 * 
 * 当我们使用webpack-dev-server的自动刷新功能时，浏览器会整页刷新 dev-server自带监听功能(内存中)和--watch(硬盘)区别。
 * 而热替换的区别就在于，当前端代码变动时，无需刷新整个页面，只把变化的部分替换掉
 */
var path = require("path");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackCfg = require("./webpack.config.dev.js");

var compiler = webpack(webpackCfg);

//init server
var app = new webpackDevServer(compiler, {
});

app.listen(9390, "localhost", function (err) {
    if (err) {
        console.log(err);
    }
});

console.log("listen at http://localhost:9390");