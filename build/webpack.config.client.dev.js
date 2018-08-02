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
    devServer : {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname,'../dist'),
        //hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public',  //静态资源都加上public，和output对应起来
        historyApiFallback:{
            index:'/public/index.html'             //如果访问的是404，则访问此路径下的文件
        }
    },
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