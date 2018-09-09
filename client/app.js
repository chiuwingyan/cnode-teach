import ReactDom from 'react-dom';
import App from 'view/App';
import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'mobx-react'
import {AppContainer} from 'react-hot-loader';
import { createStoreMap } from './store/store'
import AppState from 'store/App-state'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { lightBlue, pink } from 'material-ui/colors'

//console.log('环境',process.env.NODE_ENV);

//客户端主题
const theme = createMuiTheme({
    palette:{
        primary:pink,
        accent:lightBlue,
        type:'light'
    },
    shape:{
        shape:{
            s:'25px'
        }
    }
})
const root = document.getElementById('root');
const initialState = window.__INITIAL__STATE__ || {} 

//此方法的目的是对组件进行一个封装。为了挂载后把服务端生成的css文件去除，避免和客户端的冲突
const createApp = (TheApp) => {
    class Main extends React.Component{
        componentDidMount(){
            const jssStyles = document.getElementById('jss-server-side');
            if(jssStyles && jssStyles.parentNode){
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }
        render(){
            return <TheApp />
        }
    }
    return Main
}
const render = Component => {
    //const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate;
    ReactDom.hydrate(
        <AppContainer>
        <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <Component />  
            </MuiThemeProvider>
        </BrowserRouter>
        </Provider>
        </AppContainer>
    ,root);
}
render(createApp(App));

if(module.hot){
    module.hot.accept(() => {
        const NextApp = require('view/App').default;
        render(createApp(NextApp));
    })
}