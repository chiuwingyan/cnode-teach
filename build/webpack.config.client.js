const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    entry:{
        app:path.join(__dirname,'../client/app.js')
    },
    output:{
        filename:'[name].[hash].js',
        path:path.join(__dirname,'../dist'),
        publicPath:'/public'
    },
    mode:'development',       //在webpack4当中，此配置是必需的.development为开发环境，production为生产环境

    module:{
        rules:[
            {
                test: /.jsx$/,
                loader: 'babel-loader'      //此loader将jsx文件转换为es5语法
            },
            {
                test: /.js$/,
                loader: 'babel-loader',      //此loader将jsx文件转换为es5语法
                exclude:[
                    path.join(__dirname,'../node_modules')
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'../client/index.html'),   //以这个为模板
        })
    ]
}