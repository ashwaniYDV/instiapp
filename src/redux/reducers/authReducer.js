import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    OPEN_LOGIN_MODAL,
    CLOSE_LOGIN_MODAL,
    OPEN_REGISTER_MODAL,
    CLOSE_REGISTER_MODAL,
    ACTIVATION_LOADING,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
  } from "../actions/types";

const DEFAULT_STATE={
    isAuthenticated: false,
    isLoading: false,
    token: '',
    user: null,
    openloginModal: false,
    openregisterModal: false
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
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('JWT_TOKEN', action.payload.token);
            localStorage.setItem('USER', JSON.stringify(action.payload.user));
            return {
                ...state, 
                isAuthenticated: true, 
                isLoading: false,
                token: action.payload.token, 
                user: action.payload.user, 
                openloginModal: false,
                openregisterModal: false
            }
        case ACTIVATION_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ACTIVATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user
            }
        case ACTIVATION_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
            localStorage.removeItem("JWT_TOKEN");
            localStorage.removeItem("USER");
            return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            user: null
            };
        case OPEN_LOGIN_MODAL:
            return {
            ...state,
            openloginModal: true,
            openregisterModal: false
            };
        case CLOSE_LOGIN_MODAL:
            return {
            ...state,
            openloginModal: false
            };
        case OPEN_REGISTER_MODAL:
            return {
            ...state,
            openregisterModal: true,
            openloginModal: false
            };
        case CLOSE_REGISTER_MODAL:
            return {
            ...state,
            openregisterModal: false
            };
        default:
            return state;
    }
}