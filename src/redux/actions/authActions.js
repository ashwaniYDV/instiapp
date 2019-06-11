import Axios from "axios";
import { AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_ERROR, AUTH_SIGN_OUT } from "./types";

import {serverUrl} from '../../helper/url';

export const signUp = (data) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(`${serverUrl}/users/signup`, data);

            dispatch({
                type: AUTH_SIGN_UP,
                payload: {token: res.data.token, user: res.data.user, status: res.status}
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            localStorage.setItem('USER', JSON.stringify(res.data.user));

        } catch (err) {
            
            dispatch({
                type: AUTH_ERROR,
                payload: {status: err.response.status, errorMessage: err.response.data.message}
            });
        }
    }
}

export const signIn = (data) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(`${serverUrl}/users/signin`, data);

            dispatch({
                type: AUTH_SIGN_IN,
                payload: {token: res.data.token, user: res.data.user, status: res.status}
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            localStorage.setItem('USER', JSON.stringify(res.data.user));

        } catch (err) {

            dispatch({
                type: AUTH_ERROR,
                payload: {status: err.response.status, errorMessage: err.response.data.error.message}
            });
        }
    }
}

export const signOut = () => {
    return (dispatch) => {
        localStorage.removeItem('JWT_TOKEN');
        localStorage.removeItem('USER');

        dispatch({
            type: AUTH_SIGN_OUT,
            payload: {}
        })
    }
}