import {CLUBS_GET_SUCCESS,CLUBS_GET_FAIL,CLUBS_LOADING,CLUB_GET_FAIL,CLUB_GET_SUCCESS,CLUB_LOADING} from '../actions/types';

const initialState = {
status: null,
clubs:null,
clubsLoading: false,
clubsError: null,
club:null
}
export default function(state=initialState,{type,payload}){
    switch (type) {
        case CLUBS_LOADING:
            return {
                ...state,
                clubsLoading:true
            }
        case CLUBS_GET_SUCCESS:
            return {
                ...state,
                clubs: payload,
                status: payload.status,
                clubsLoading: false
            }
        case CLUBS_GET_FAIL:
            return{
                ...state,
                clubsLoading: false,
                clubsError: payload

            }
        case CLUB_LOADING:
            return {
                ...state,
                clubsLoading:true
            }
        case CLUB_GET_SUCCESS:
            return{
                ...state,
                club:payload,
                clubsLoading:false
            }
        case CLUB_GET_FAIL:
            return{
                ...state,
                clubsLoading:false,
                clubsError:payload
            }
        default:
            return null;
    }
    
}