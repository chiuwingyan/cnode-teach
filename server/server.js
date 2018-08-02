const express = require('express')
const ReactSSR = require('react-dom/server')
const serverEntry = require('../dist/server-entry').default  //由于打包生成的是commonjs2的规范，虽然中间引入default
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8')     //把打包生产的index.html读进来
const app = express()

app.use('/public',express.static(path.join(__dirname,'../dist'))); //使用中间件过滤静态资源的请求。

app.get('*',function(req,res){
    const appString = ReactSSR.renderToString(serverEntry);     //通过reactSSR，把打包的组件解析为html返回到浏览器
    res.send(template.replace('<!--app-->',appString)); //把app标签替换成生成的html节点

})

app.listen(3333,function(){
    console.log('server is listening on 3333')
})