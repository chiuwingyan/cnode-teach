const path = require('path')
module.exports = {
    output:{
        path:path.join(__dirname,'../dist'),
        publicPath : '/public/'
    },
    resolve:{
        extensions:['.js','.jsx'],
        alias: {
            '@': path.resolve('client'),
            'view': path.join(__dirname,'../client/view'),
            'config': path.join(__dirname,'../client/config'),
            'store': path.join(__dirname,'../client/store'),
            'components': path.join(__dirname,'../client/components')
          }
    },
    devtool:"source-map",
    module:{
        rules:[
            {
                test:/.(js|jsx)$/,
                loader:'babel-loader',
                exclude:[
                    path.resolve(__dirname,'../node_modules')
                ]
            },
            {
                test:/\.(png|jpg|gif|svg)$/,
                loader:'file-loader',
                options:{
                    name:'[name].[ext]?[hash]'
                }
            }
        ]
    }
}