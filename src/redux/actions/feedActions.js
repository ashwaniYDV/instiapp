import { FEEDS_LOADING, FEED_LOADING, ALL_FEEDS_SUCCESS, ALL_FEEDS_FAIL, FEED_SUCCESS, FEED_FAIL, POST_FEED_SUCCESS, POST_FEED_FAIL, EDIT_FEED_SUCCESS, EDIT_FEED_FAIL } from "./types";

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

export const getUserFeeds = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: FEEDS_LOADING
            });
            const res = await Axios.get(`${serverUrl}/feeds/userfeeds`, tokenConfig(getState));
            console.log(res.data);

            dispatch({
            type: ALL_FEEDS_SUCCESS,
            payload: { feeds: res.data.feeds, status: res.status}
            });
        } catch (err) {
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

export const postFeed = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await Axios.post(`${serverUrl}/feeds`, data, tokenConfig(getState));
            
            dispatch({
            type: POST_FEED_SUCCESS,
            payload: { feed: res.data.feed, status: res.status}
            });
        } catch (err) {
            dispatch(
                returnErrors(err.response.data.message, err.response.status, "POST_FEED_FAIL")
            );
            dispatch({
                type: POST_FEED_FAIL,
                payload: { status: err.response.status }
            });
        }
    }
}

export const editFeed = ({data, feedId}) => {
    return async (dispatch, getState) => {
        try {
            const res = await Axios.patch(`${serverUrl}/feeds/${feedId}`, data, tokenConfig(getState));
            console.log(data);

            dispatch({
            type: EDIT_FEED_SUCCESS,
            payload: { feed: res.data.feed, status: res.status}
            });
        } catch (err) {
            dispatch(
                returnErrors(err.response.data.message, err.response.status, "EDIT_FEED_FAIL")
            );
            dispatch({
                type: EDIT_FEED_FAIL,
                payload: { status: err.response.status }
            });
        }
    }
}

export const deleteFeed = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await Axios.delete(`${serverUrl}/feeds/${id}`, tokenConfig(getState));
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);
        }
    }
}