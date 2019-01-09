import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, } from 'redux';
// import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './app.jsx';
import Provider from './provider';
// import reducer from './reducer.jsx'
import './reset.css';
import './index.less';



// const store = createStore(reducer)

ReactDOM.render(
    (
    // <Provider store={store}>
        <Provider>
            <BrowserRouter>
                <App></App>
            </BrowserRouter>
        </Provider>
    // </Provider> 
    )
    , 
    document.getElementById('root')
);
