import { POST_MESS_SUCCESS, POST_MESS_FAIL, UPDATE_MESS_SUCCESS, UPDATE_MESS_FAIL, CANCEL_MESS_SUCCESS, CANCEL_MESS_FAIL } from "./types";

import Axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from './authActions';
import {serverUrl} from '../../helper/url';

export const postMess = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await Axios.post(`${serverUrl}/mess`, data, tokenConfig(getState));
            console.log(res.data);

            dispatch({
                type: POST_MESS_SUCCESS,
                payload: { mess: res.data.mess, status: res.status}
            });
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            dispatch(
                returnErrors(err.response.data.message, err.response.status, "POST_MESS_FAIL")
            );
            dispatch({
                type: POST_MESS_FAIL,
                payload: { status: err.response.status }
            });
        }
    }
}

export const updateMess = ({studentMongoId, data}) => {
    console.log("data", data);
    return async (dispatch, getState) => {
        try {
            const res = await Axios.patch(`${serverUrl}/mess/${studentMongoId}`, data, tokenConfig(getState));
            console.log(res.data);

            dispatch({
                type: UPDATE_MESS_SUCCESS,
                payload: { mess: res.data.updatedMess, status: res.status}
            });
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            dispatch(
                returnErrors(err.response.data.message, err.response.status, "UPDATE_MESS_FAIL")
            );
            dispatch({
                type: UPDATE_MESS_FAIL,
                payload: { status: err.response.status }
            });
        }
    }
}

export const cancelMess = ({studentMongoId, data}) => {
    console.log("data", data);
    return async (dispatch, getState) => {
        try {
            const res = await Axios.patch(`${serverUrl}/mess/cancel/${studentMongoId}`, data, tokenConfig(getState));
            console.log(res.data);

            dispatch({
                type: CANCEL_MESS_SUCCESS,
                payload: { cancelMessage: res.data.message, status: res.status}
            });
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            dispatch(
                returnErrors(err.response.data.message, err.response.status, "CANCEL_MESS_FAIL")
            );
            dispatch({
                type: CANCEL_MESS_FAIL,
                payload: { status: err.response.status }
            });
        }
    }
}