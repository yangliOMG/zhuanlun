import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './app.jsx';
import Provider from './provider';
import './reset.css';
import './index.less';

ReactDOM.render(
    (
        <Provider>
            <BrowserRouter>
                <App></App>
            </BrowserRouter>
        </Provider>
    )
    , 
    document.getElementById('root')
);
