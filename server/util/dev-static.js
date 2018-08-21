const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')
const getTemplate = () =>{
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
        .then(res => {
            resolve(res.data)
        })
        .catch(reject)
    })
}

const Module = module.constructor
 
const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig);   //在node中启动webpack
serverCompiler.outputFileSystem = mfs;          //webpack打包的文件指定为内存读取
let serverBundle, createStoreMap
serverCompiler.watch({},(err,stats) => {         //监听entry文件依赖的模块，如 果发生改变，可以实时监听
    if(err) throw err
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(warn => console.warn(warn));

    const bundlePath = path.join(       //获取打包后output的文件
        serverConfig.output.path,
        serverConfig.output.filename
    )

    const bundle = mfs.readFileSync(bundlePath,'utf-8')  //webpack读取出来的是字符串，需要转化为可引用的模块，采用一种hack的方式
    const m = new Module ()
    m._compile(bundle,'server-entry.js')          //把js的string内容解析成一个模块
    serverBundle = m.exports.default    //模块导出
    createStoreMap = m.exports.createStoreMap
})

module.exports=function(app){
    app.use('/public',proxy({
        target: 'http://localhost:8888'
    }))
 //  app.use('http://localhost:3333/', express.static(path.join(__dirname, '../dist')))
    app.get('*',function(req,res){
        console.log('执行了')
        getTemplate().then(template => {
            console.log('执行了1')
            let routerContext = {}
            const App = serverBundle(createStoreMap(),routerContext,req.url)            
            const content = ReactDomServer.renderToString(App);
            console.log('content', routerContext)
            if (routerContext.url) {
                res.status(302).setHeader('Location', routerContext.url);
                res.end()
                return
            }
            res.send(template.replace('<!--app-->',content))
        })
    })
}