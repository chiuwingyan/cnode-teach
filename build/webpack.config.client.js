const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig,{
    entry:{

        app:path.join(__dirname,'../client/app.js'),
        //vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']  
        
    },
    output:{
        filename:'[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'

    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'../client/index.html'),   //以这个为模板
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),   //以这个为模板
            filename: 'server.ejs'
        }),
    ],
    optimization: {
        // runtimeChunk: {
        //     name: "manifest"
        // },
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: { // 将第三方模块提取出来
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10, // 优先
                    enforce: true
                }
            }
        }
    }
})
console.log('环境',process.env.NODE_ENV);
if(isDev){
    config.devtool = '#cheap-module-eval-source-map'
    config.mode ='development'
    config.entry = {
        app: [
          'react-hot-loader/patch',
          path.join(__dirname, '../client/app.js')
        ]
      }
      config.devServer = {
        port: '8888',
        //contentBase: path.join(__dirname,'../dist'),
        hotOnly:true,

        overlay: {
            errors: true
        },
        publicPath: '/public',  //静态资源都加上public，和output对应起来
        historyApiFallback:{
            index:'/public/index.html'             //如果访问的是404，则访问此路径下的文件
        },
        proxy: {
            '/api':'http://localhost:3333'
        }
      }
      config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config;