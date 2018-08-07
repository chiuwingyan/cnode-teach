const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development'

const config = {
    entry:{

        app:path.join(__dirname,'../client/app.js')
        
    },
    output:{
        filename:'[name].[hash].js',
        path:path.join(__dirname,'../dist'),
        publicPath:'/public'
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
        }),
    ]
}
console.log('环境',process.env.NODE_ENV);
if(isDev){
    config.mode ='development'
    config.entry = {
        app: [
          'react-hot-loader/patch',
          path.join(__dirname, '../client/app.js')
        ]
      }
      config.devServer = {
        port: '8888',
        contentBase: path.join(__dirname,'../dist'),
        hotOnly:true,
        overlay: {
            errors: true
        },
        //publicPath: '/public/',  //静态资源都加上public，和output对应起来
        historyApiFallback:{
            index:'/public/index.html'             //如果访问的是404，则访问此路径下的文件
        }
      }
      config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config;