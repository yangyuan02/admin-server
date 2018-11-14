/*
 * @Author: yangyuan
 * @Date: 2018-11-14 22:58:32
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2018-11-15 00:01:30
 */
const path = require(path);

module.exports = {
    entry:path.resolve(__dirname,'./src/main.js'),//入口
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'static/js/[name].js'
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
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true },
                    }
                ],
                exclude:'/node_modules/'//排除node_modules资源检查
            }
        ]
    }
}