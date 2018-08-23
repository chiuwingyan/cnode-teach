import ReactDom from 'react-dom';
import App from 'view/App';
import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'mobx-react'
import {AppContainer} from 'react-hot-loader';
import { createStoreMap } from './store/store'
import AppState from 'store/App-state'

//console.log('环境',process.env.NODE_ENV);
const root = document.getElementById('root');
const initialState = window.__INITIAL__STATE__ || {} 

const render = Component => {
    const renderMethod = module.hot ? ReactDom.render : ReactDom.hydrate;
    ReactDom.hydrate(
        <AppContainer>
            <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <Component />  
        </BrowserRouter>
        </Provider>
        </AppContainer>
    ,root);
}
render(App);

if(module.hot){
    module.hot.accept(() => {
        const NextApp = require('view/App').default;
        render(NextApp);
    })
}