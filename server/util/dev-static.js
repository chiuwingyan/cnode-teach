const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const serverRender = require('./server-render')

const getTemplate = () =>{
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/server.ejs')
        .then(res => {
            resolve(res.data)
        })
        .catch(reject)
    })
}

const NativeModule = require('module')      //export.module
const vm = require('vm')

// `(function(exports, require, module, __finename, __dirname){ ...bundle code })`
const getModuleFromString = (bundle, filename) => {
    const m = { exports: {} }
    const wrapper = NativeModule.wrap(bundle)
    const script = new vm.Script(wrapper, {         //创建一个新的脚本编译代码，但是不运行。
        filename: filename,                         
        displayErrors: true,
    })
  //  console.log('script',script)
    const result = script.runInThisContext()        //执行编译过的脚本并返回结果。被运行的代码没有本地作用域访问权限，但是拥有权限访问全局对象。
    //console.log('result', result)
    result.call(m.exports, m.exports, require, m)
    console.log('m',m)
    return m
}
 
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
    //const m = new Module ()
    const m = getModuleFromString(bundle, 'server-entry.js')     //把js的string内容解析成一个模块
    serverBundle = m.exports    //模块导出
   // createStoreMap = m.exports.createStoreMap
  //  console.log('m', serverBundle)
})



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
            return serverRender(serverBundle,template,req,res)
           // console.log('执行了1')
            //console.log('serverBundle',serverBundle)         
            //console.log('content', createStoreMap())
        })
    })
}