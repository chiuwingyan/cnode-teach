const path=require('path');

module.exports={
    target: 'node',             //表示运行在node
    entry:{
        app:path.join(__dirname,'../client/server-entry.js')
    },
    output:{
        filename:'server-entry.js',
        path:path.join(__dirname,'../dist'),
        publicPath:'/public',
        libraryTarget :'commonjs2'  //打包出来的文件使用哪种规范，这里使用的是commonjs2的规范
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
}