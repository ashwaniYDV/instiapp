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
    CLOSE_REGISTER_MODAL
  } from "./types";
  
import Axios from "axios";
import { returnErrors } from "./errorActions";

import {serverUrl} from '../../helper/url';

export const signUp = (data) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post(`${serverUrl}/users/signup`, data);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: {token: res.data.token, user: res.data.user, status: res.status}
            });
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
            dispatch({
                type: USER_LOADING
            });
            const res = await Axios.post(`${serverUrl}/users/signin`, data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {token: res.data.token, user: res.data.user, status: res.status}
            });

        } catch (err) {
            dispatch(
                returnErrors(err.response.data.error.message, err.response.status, "LOGIN_FAIL")
              );
              dispatch({ type: LOGIN_FAIL });

            // dispatch({
            //     type: AUTH_ERROR,
            //     payload: {status: err.response.status, errorMessage: err.response.data.error.message}
            // });
        }
    }
}

export const signOut = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: {}
        })
    }
}