import React from 'react';
import App from 'view/App';
import {StaticRouter} from 'react-router-dom'
import {Provider,useStaticRendering} from 'mobx-react'
import {createStoreMap} from './store/store'

//静态渲染。因为数据是可监听的，防止mobx在服务端渲染的时候数据会重复变换
useStaticRendering(true)

export default (stores,routerContext,url) => {
    <Provider {...stores}>
        <StaticRouter context={routerContext} location={url}>
        <App />
        </StaticRouter>
        </Provider>
}

export {createStoreMap}