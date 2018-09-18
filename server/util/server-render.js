const serialize = require('serialize-javascript')
const ejs = require('ejs')
const asyncBootstrap = require('react-async-bootstrapper')
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

const SheetsRegistry = require('react-jss').SheetsRegistry
const create = require('jss').create
const preset = require('jss-preset-default').default
const createMuiTheme = require('@material-ui/core/styles').createMuiTheme
const createGenerateClassName = require('@material-ui/core/styles/createGenerateClassName').default
const colors = require('@material-ui/core/colors')

const getStoreState = (stores) => {
    return Object.keys(stores).reduce((result, storeName) => {
        console.log('stores', stores[storeName])
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
        const sheetsRegistry = new SheetsRegistry()
        const jss = create(preset())
        jss.options.createGenerateClassName = createGenerateClassName
        const theme = createMuiTheme({
            palette: {
                primary: colors.pink,
                accent: colors.lightBlue,
                type: 'light'
            }
        })
        const App = createApp(stores, routerContext, sheetsRegistry, jss, theme, req.url) 
        asyncBootstrap(App).then(() => {
            //bootstrap异步方法执行完毕后，执行完余下的渲染方法后，执行此回调。此时的App就是已经插好值的
            if (routerContext.url) {
                res.status(302).setHeader('Location', routerContext.url);
                res.end()
                return
            }
           // console.log('stires', stores.appState.count)
            const helmet = Helmet.rewind()
            const state = getStoreState(stores)
            const content = ReactDomServer.renderToString(App);
            //res.send(template.replace('<!--app-->', content))
            // console.log('helmet', new helmet())
         //   console.log('initialState', state)
            const html = ejs.render(template, {
                appString: content,
                initialState: serialize(state),
                meta: helmet.meta.toString(),
                title: helmet.title.toString(),
                style: helmet.style.toString(),
                link: helmet.link.toString(),
                materialCss: sheetsRegistry.toString()
            })
            res.send(html)
            resolve()
        }).catch(reject)
    })
}