import {USER_LOADING, USER_LOADED, AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_ERROR, AUTH_SIGN_OUT} from '../actions/types';

const DEFAULT_STATE={
    isAuthenticated: false,
    isLoading: false,
    token: '',
    user: '',
    errorMessage: '',
    status: ''
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state, 
                isAuthenticated: false,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state, 
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user
            }
        case AUTH_SIGN_UP:
            return {
                ...state, 
                isAuthenticated: true, 
                isLoading: false,
                token: action.payload.token, 
                user: action.payload.user, 
                errorMessage: '', 
                status: action.payload.status
            }
        case AUTH_SIGN_IN:
            return {
                ...state, 
                isAuthenticated: true, 
                isLoading: false,
                token: action.payload.token, 
                user: action.payload.user, 
                errorMessage: '', 
                status: action.payload.status 
            }
        case AUTH_ERROR:
            return {
                ...state, 
                isAuthenticated: false,
                isLoading: false,
                token: '', 
                user: '', 
                errorMessage: action.payload.errorMessage, 
                status: action.payload.status 
            }
        case AUTH_SIGN_OUT:
            return {
                ...state, 
                isAuthenticated: false,
                isLoading: false,
                token: '', 
                user: '', 
                errorMessage: '', 
                status: '' 
            }
        default:
            return state;
    }
}