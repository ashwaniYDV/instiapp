import Axios from "axios";
import { USER_UPDATE, USER_LOADED } from "./types";

import {serverUrl} from '../../helper/url';

export const updateUser = ({ updatedUser, userId }) => {
    return async (dispatch, getState) => {
        try {
          const res = await Axios.patch(`${serverUrl}/users/${userId}`, updatedUser, tokenConfig(getState));
          console.log(res.data);
          console.log(res.status);

          dispatch({
              type: USER_UPDATE,
              payload: { user: res.data.user, status: res.status}
          });
          dispatch({
            type: USER_LOADED,
            payload: { user: res.data.user, status: res.status}
        });

          localStorage.setItem('USER', JSON.stringify(res.data.user));

        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);

            // dispatch({
            //     type: AUTH_ERROR,
            //     payload: {status: err.response.status, errorMessage: err.response.data.message}
            // });
        }
    }
}

const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  }