const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const asyncBootstrap = require('react-async-bootstrapper')
const ReactDomServer = require('react-dom/server')
const getTemplate = () =>{
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/server.ejs')
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
  //  console.log('m', serverBundle)
})


const getStoreState = (stores) => {
        return Object.keys(stores).reduce((result,storeName) => {
            result[storeName] = stores[storeName].toJson()
        },{})
}

module.exports=function(app){
    app.use('/public',proxy({
        target: 'http://localhost:8888'
    }))
 //  app.use('http://localhost:3333/', express.static(path.join(__dirname, '../dist')))
    app.get('*',function(req,res){
        if (!serverBundle) {
            return res.send('waiting for compile, refresh later')
        }
        getTemplate().then(template => {
           // console.log('执行了1')
            let routerContext = {}
            const stores = createStoreMap()
            const App = serverBundle(stores,routerContext,req.url) 
            
            asyncBootstrap(App).then(() => {
                //bootstrap异步方法执行完毕后，执行完余下的渲染方法后，执行此回调。此时的App就是已经插好值的
                if (routerContext.url) {
                    res.status(302).setHeader('Location', routerContext.url);
                    res.end()
                    return
                }
                console.log('stires',stores.appState.count)
                const state = getStoreState(stores)
                const content = ReactDomServer.renderToString(App);
                res.send(template.replace('<!--app-->', content))
            })
            //console.log('serverBundle',serverBundle)         
            //console.log('content', createStoreMap())
        }).catch((err) =>{
            console.log(err)
        })
    })
}