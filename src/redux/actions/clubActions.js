import { CLUBS_LOADING, CLUB_LOADING, ALL_CLUBS_SUCCESS, ALL_CLUBS_FAIL, CLUB_SUCCESS, CLUB_FAIL } from "./types";

import Axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from './authActions';
import {serverUrl} from '../../helper/url';

export const getAllClubs = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: CLUBS_LOADING
            });
            const res = await Axios.get(`${serverUrl}/clubs`, tokenConfig(getState));
            console.log(res.data);

            dispatch({
            type: ALL_CLUBS_SUCCESS,
            payload: { clubs: res.data.clubs, status: res.status}
            });
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            dispatch(
                returnErrors(err.response.data.message, err.response.status, "ALL_CLUBS_FAIL")
            );
            dispatch({
                type: ALL_CLUBS_FAIL,
                payload: { status: err.response.status }
            });
        }
    }
}

export const getClub = (clubId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: CLUB_LOADING
            });
            const res = await Axios.get(`${serverUrl}/clubs/${clubId}`, tokenConfig(getState));
            console.log(res.data);

            dispatch({
            type: CLUB_SUCCESS,
            payload: { club: res.data.club, status: res.status}
            });
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            dispatch(
                returnErrors(err.response.data.message, err.response.status, "CLUB_FAIL")
            );
            dispatch({
                type: CLUB_FAIL,
                payload: { status: err.response.status }
            });
        }
    }
}