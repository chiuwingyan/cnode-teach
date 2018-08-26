const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const favicon = require('serve-favicon')
const serverRender = require('./util/server-render')
const isDev = process.env.NODE_ENV === 'development'
const app = express()

app.use(bodyParser.json())  //把请求过来的body请求体转化为json
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({       //设置session的属性
    maxAge: 10 * 60 * 1000,
    name: 'tid',
    resave: false,
    saveUninitialized: false,
    secret: 'react cnode class'
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

if(!isDev){
   const serverEntry = require('../dist/server-entry')  //由于打包生成的是commonjs2的规范，虽然中间引入default
    const template = fs.readFileSync(path.join(__dirname,'../dist/server.ejs'),'utf8')     //把打包生产的index.html读进来
    app.use('/public',express.static(path.join(__dirname,'../dist'))); //使用中间件过滤静态资源的请求。
    app.get('*',function(req,res,next){
        serverRender(serverEntry,template,req,res).catch(next)

})
}else{
    const devStatic = require('./util/dev-static');
    devStatic(app);
}

app.use(function (error ,req ,res,next){
    console.log(error)
    res.status(500).send(error)
})

app.listen(3333,function(){
    console.log('server is listening on 3333')
})