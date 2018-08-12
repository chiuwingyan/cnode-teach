import ReactDom from 'react-dom';
import App from 'view/App';
import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'mobx-react'
import {AppContainer} from 'react-hot-loader';

import appState from 'store/App-state'
//console.log('环境',process.env.NODE_ENV);
const root = document.getElementById('root');
const render = Component => {
    ReactDom.hydrate(
        <AppContainer>
            <Provider appState={appState}>
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