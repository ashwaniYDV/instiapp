import { LOSTANDFOUNDS_LOADING, ALL_LOSTANDFOUNDS_SUCCESS, ALL_LOSTANDFOUNDS__FAIL, USER_LOSTANDFOUNDS_SUCCESS, USER_LOSTANDFOUNDS__FAIL } from "./types";

import Axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from './authActions';
import {serverUrl} from '../../helper/url';

export const getAllLostnfounds = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: LOSTANDFOUNDS_LOADING
            });
            const res = await Axios.get(`${serverUrl}/lostnfounds`, tokenConfig(getState));
            console.log(res.data);

            dispatch({
            type: ALL_LOSTANDFOUNDS_SUCCESS,
            payload: { lostnfounds: res.data.lostnfounds, status: res.status}
            });
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            dispatch(
                returnErrors(err.response.data.message, err.response.status, "ALL_LOSTANDFOUNDS__FAIL")
            );
            dispatch({
                type: ALL_LOSTANDFOUNDS__FAIL,
                payload: { status: err.response.status }
            });
        }
    }
}

export const getUserLostnfounds = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: LOSTANDFOUNDS_LOADING
            });
            const res = await Axios.get(`${serverUrl}/lostnfounds/user`, tokenConfig(getState));
            console.log(res.data);

            dispatch({
            type: USER_LOSTANDFOUNDS_SUCCESS,
            payload: { userlostnfounds: res.data.lostnfounds, status: res.status}
            });
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            dispatch(
                returnErrors(err.response.data.message, err.response.status, "USER_LOSTANDFOUNDS__FAIL")
            );
            dispatch({
                type: USER_LOSTANDFOUNDS__FAIL,
                payload: { status: err.response.status }
            });
        }
    }
}

export const deleteLostnfound = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await Axios.delete(`${serverUrl}/lostnfounds/${id}`, tokenConfig(getState));
            console.log(res.data);

        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);
        }
    }
}

export const postLostnfounds = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await Axios.post(`${serverUrl}/lostnfounds`, data, tokenConfig(getState));
            console.log(res.data);

        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            dispatch(
                returnErrors(err.response.data.message, err.response.status, "POST_LOSTANDFOUND__FAIL")
            );
        }
    }
}

export const editLostnfounds = ({data, lostnfoundId}) => {
    return async (dispatch, getState) => {
        console.log("dispatch", data);
        try {
            const res = await Axios.patch(`${serverUrl}/lostnfounds/${lostnfoundId}`, data, tokenConfig(getState));
            console.log(res.data);

        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            dispatch(
                returnErrors(err.response.data.message, err.response.status, "EDIT_LOSTANDFOUND__FAIL")
            );
        }
    }
}