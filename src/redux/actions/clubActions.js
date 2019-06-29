import {CLUBS_GET_SUCCESS,CLUBS_GET_FAIL,CLUBS_LOADING} from './types';
import Axios from "axios";
import { returnErrors } from "./errorActions";

import {serverUrl} from '../../helper/url';

export const getClub = ()=>{
    return async (dispatch)=>{
        try {
            dispatch({
                type:CLUBS_LOADING
            })
        const clubsList = await Axios.get(`${serverUrl}/clubs/`);
        dispatch({
            type: CLUBS_GET_SUCCESS,
            payload: clubsList.data.clubs
        })
        }
        catch(err){
            dispatch(
                returnErrors(err.response.data.message, err.response.status, "LOGIN_FAIL")
              );
              dispatch({
                  type: CLUBS_GET_FAIL,
                  payload: err.response.data.message
              })
        }
    }
}