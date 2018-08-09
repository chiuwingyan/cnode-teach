import ReactDom from 'react-dom';
import App from './App.jsx';
import React from 'react';
import {AppContainer} from 'react-hot-loader';
console.log('环境',process.env.NODE_ENV);
const root = document.getElementById('root');
const render = Component => {
    ReactDom.hydrate(
        <AppContainer>
          <Component />  
        </AppContainer>
    ,root);
}
render(App);

if(module.hot){
    module.hot.accept(() => {
        const NextApp = require('./App.jsx').default;
        render(NextApp);
    })
}