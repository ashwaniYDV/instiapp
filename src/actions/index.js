import Axios from "axios";
import { AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_ERROR, AUTH_SIGN_OUT } from "./types";

export const signUp = (data) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('http://localhost:5000/users/signup', data);
            console.log(res.data);
            console.log(res.status);

            dispatch({
                type: AUTH_SIGN_UP,
                payload: {token: res.data.token, user: res.data.user, status: res.status}
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            localStorage.setItem('USER', JSON.stringify(res.data.user));

        } catch (err) {
            console.log(err.response.data.message);
            console.log(err.response.status);

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
            const res = await Axios.post('http://localhost:5000/users/signin', data);
            console.log(res.status);

            dispatch({
                type: AUTH_SIGN_IN,
                payload: {token: res.data.token, user: res.data.user, status: res.status}
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            localStorage.setItem('USER', JSON.stringify(res.data.user));

        } catch (err) {
            console.log(err.response.data.error.message);
            console.log(err.response.status);

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