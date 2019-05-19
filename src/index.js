import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; 
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import * as serviceWorker from './serviceWorker';
import App from './App';
import reducers from './reducers';

const JWT_TOKEN=localStorage.getItem('JWT_TOKEN');

ReactDOM.render(<Provider store={createStore(reducers, {
    auth: {
        token: JWT_TOKEN,
        isAuthenticated: JWT_TOKEN ? true : false
    }
}, applyMiddleware(reduxThunk))}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
