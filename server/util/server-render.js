const serialize = require('serialize-javascript')
const ejs = require('ejs')
const asyncBootstrap = require('react-async-bootstrapper')
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default


const getStoreState = (stores) => {
    return Object.keys(stores).reduce((result, storeName) => {
        result[storeName] = stores[storeName].toJson()
        return result
    }, {})
}

module.exports = (bundle,template,req,res) => {
    return new Promise((resolve,reject) => {
        const createStoreMap = bundle.createStoreMap
        const createApp = bundle.default

        const routerContext = {}
        const stores = createStoreMap()
        const App = createApp(stores, routerContext, req.url) 
        asyncBootstrap(App).then(() => {
            //bootstrap异步方法执行完毕后，执行完余下的渲染方法后，执行此回调。此时的App就是已经插好值的
            if (routerContext.url) {
                res.status(302).setHeader('Location', routerContext.url);
                res.end()
                return
            }
            console.log('stires', stores.appState.count)
            const helmet = Helmet.rewind()
            const state = getStoreState(stores)
            const content = ReactDomServer.renderToString(App);
            //res.send(template.replace('<!--app-->', content))
            // console.log('helmet', new helmet())
            console.log('initialState', state)
            const html = ejs.render(template, {
                appString: content,
                initialState: serialize(state),
                meta: helmet.meta.toString(),
                title: helmet.title.toString(),
                style: helmet.style.toString(),
                link: helmet.link.toString(),

            })
            res.send(html)
            resolve()
        }).catch(reject)
    })
}