import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; 
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';
import App from './App';
import reducers from './reducers';

const JWT_TOKEN=localStorage.getItem('JWT_TOKEN');
const USER=JSON.parse(localStorage.getItem('USER'));

const initialState = { auth: {
    token: JWT_TOKEN,
    isAuthenticated: JWT_TOKEN ? true : false,
    user: USER
} };

ReactDOM.render(<Provider store={createStore(reducers, initialState, applyMiddleware(thunk))}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
