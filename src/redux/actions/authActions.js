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
          dispatch({
            type: USER_LOADING
          });
          const res = await Axios.post(`${serverUrl}/users/signup`, data);
          dispatch({
              type: REGISTER_SUCCESS,
              payload: {token: res.data.token, user: res.data.user, status: res.status}
          });
        } catch (err) {
          dispatch(
            returnErrors(err.response.data.message, err.response.status, "REGISTER_FAIL")
          );
          dispatch({ type: REGISTER_FAIL });
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
                returnErrors(err.response.data.message, err.response.status, "LOGIN_FAIL")
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

export const openLoginModal = () => dispatch => {
    dispatch({ type: OPEN_LOGIN_MODAL });
  };
  
  export const closeLoginModal = () => dispatch => {
    dispatch({ type: CLOSE_LOGIN_MODAL });
  };
  
  export const openRegisterModal = () => dispatch => {
    dispatch({ type: OPEN_REGISTER_MODAL });
  };
  
  export const closeRegisterModal = () => dispatch => {
    dispatch({ type: CLOSE_REGISTER_MODAL });
  };
  
  export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (token) {
      config.headers["authorization"] = token;
    }
    return config;
  };