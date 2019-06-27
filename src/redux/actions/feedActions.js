import { FEEDS_LOADING, FEED_LOADING, ALL_FEEDS_SUCCESS, ALL_FEEDS_FAIL, FEED_SUCCESS, FEED_FAIL } from "./types";

import Axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from './authActions';
import {serverUrl} from '../../helper/url';

export const getAllFeeds = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: FEEDS_LOADING
            });
            const res = await Axios.get(`${serverUrl}/feeds`, tokenConfig(getState));
            console.log(res.data);

            dispatch({
            type: ALL_FEEDS_SUCCESS,
            payload: { feeds: res.data.feeds, status: res.status}
            });
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            dispatch(
                returnErrors(err.response.data.message, err.response.status, "ALL_FEEDS_FAIL")
            );
            dispatch({
                type: ALL_FEEDS_FAIL,
                payload: { status: err.response.status }
            });
        }
    }
}

export const getFeed = (feedId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: FEED_LOADING
            });
            const res = await Axios.get(`${serverUrl}/feeds/${feedId}`, tokenConfig(getState));
            console.log(res.data);
            // dispatch({
            //     type: FEED_LOADED
            // });

            dispatch({
            type: FEED_SUCCESS,
            payload: { feed: res.data.feed, status: res.status}
            });
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            dispatch(
                returnErrors(err.response.data.message, err.response.status, "FEED_FAIL")
            );
            dispatch({
                type: FEED_FAIL,
                payload: { status: err.response.status }
            });
        }
    }
}