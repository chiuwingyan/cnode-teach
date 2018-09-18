const path=require('path');
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const webpack = require('webpack')
const config = webpackMerge(baseConfig,{
    target: 'node',             //表示运行在node
    entry:{
        app:path.join(__dirname,'../client/server-entry.js')
    },
    externals: Object.keys(require('../package.json').dependencies),
    output:{
        filename:'server-entry.js',
        libraryTarget :'commonjs2'  //打包出来的文件使用哪种规范，这里使用的是commonjs2的规范
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.API_BASE':'"127.0.0.1:3000"'
        })
    ],
    mode:'development',       //在webpack4当中，此配置是必需的.development为开发环境，production为生产环境
})

module.exports = config