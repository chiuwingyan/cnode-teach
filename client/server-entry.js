import React from 'react';
import App from 'view/App';
import {StaticRouter} from 'react-router-dom'
import {Provider,useStaticRendering} from 'mobx-react'
import {createStoreMap} from './store/store'

import {JssProvider} from 'react-jss'
import { MuiThemeProvider } from '@material-ui/core/styles'
//静态渲染。因为数据是可监听的，防止mobx在服务端渲染的时候数据会重复变换.
useStaticRendering(true)

export default (stores,routerContext,sheetRegistry,jss,theme,url) => {
  // console.log('...stores',stores)
    return (                //坑!!!教程上没有return，但是我这里不return的话，不会返回打包过后的dom节点，执行该方法得到的是空的，无法进行服务端渲染
        <Provider {...stores}>
            <StaticRouter context={routerContext} location={url}>
            <JssProvider registry={sheetRegistry} jss={jss}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
            </JssProvider>
            </StaticRouter>
        </Provider>
    )

}

export {createStoreMap}