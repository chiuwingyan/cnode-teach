const express = require('../../../../../Library/Caches/typescript/2.9/node_modules/@types/express')
const ReactSSR = require('../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-dom/server')
const fs = require('fs')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const app = express()

if(!isDev){
   const serverEntry = require('../dist/server-entry').default  //由于打包生成的是commonjs2的规范，虽然中间引入default
    const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8')     //把打包生产的index.html读进来
    app.use('/public',express.static(path.join(__dirname,'../dist'))); //使用中间件过滤静态资源的请求。
    //设置跨域访问
// app.use(function (req, res, next) {
//     // console.log('进入了')
//     // res.header('Access-Control-Allow-Origin', '*');
//     // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
//     if (req.method == 'OPTIONS') {
//       res.send(200); /*让options请求快速返回*/
//     } else {
//       next();
//     }
//   })
    app.get('*',function(req,res){
    const appString = ReactSSR.renderToString(serverEntry);     //通过reactSSR，把打包的组件解析为html返回到浏览器
    res.send(template.replace('<!--app-->',appString)); //把app标签替换成生成的html节点
    res.header('Access-Control-Allow-Origin', '*');
    const param={
        name:'mary',
        age:12
    }
    res.send(JSON.stringify(param))

})
}else{
    const devStatic = require('./util/dev-static');
    devStatic(app);
}

app.listen(3333,function(){
    console.log('server is listening on 3333')
})