import {AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_ERROR, AUTH_SIGN_OUT} from '../actions/types';

const DEFAULT_STATE={
    isAuthenticated: false,
    token: '',
    user: '',
    errorMessage: '',
    status: ''
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type) {
        case AUTH_SIGN_UP:
            return {...state, isAuthenticated: true, token: action.payload.token, user: action.payload.user, errorMessage: '', status: action.payload.status }
        case AUTH_SIGN_IN:
            return {...state, isAuthenticated: true, token: action.payload.token, user: action.payload.user, errorMessage: '', status: action.payload.status }
        case AUTH_ERROR:
            return {...state, isAuthenticated: false, token: '', user: '', errorMessage: action.payload.errorMessage, status: action.payload.status }
        case AUTH_SIGN_OUT:
            return {...state, isAuthenticated: false, token: '', user: '', errorMessage: '', status: '' }
        default:
            return state;
    }
}