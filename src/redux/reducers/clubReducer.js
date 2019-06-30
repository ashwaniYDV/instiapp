import { CLUBS_LOADING, CLUB_LOADING, ALL_CLUBS_SUCCESS, ALL_CLUBS_FAIL, CLUB_SUCCESS, CLUB_FAIL } from "../actions/types";

const DEFAULT_STATE={
    clubs: null,
    club: null,
    clubsLoading: false,
    clubLoading: false,
    status: null
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type) {
        case CLUBS_LOADING:
            return {
                ...state,
                clubsLoading: true
            }
        case CLUB_LOADING:
            return {
                ...state,
                clubLoading: true
            }
        case ALL_CLUBS_SUCCESS:
            return {
                ...state, 
                clubs: action.payload.clubs,
                status: action.payload.status,
                clubsLoading: false
            }
        case ALL_CLUBS_FAIL:
            return {
                ...state, 
                clubs: null,
                status: action.payload.status,
                clubsLoading: false
            }
        case CLUB_SUCCESS:
            return {
                ...state, 
                club: action.payload.club,
                status: action.payload.status,
                clubLoading: false
            }
        case CLUB_FAIL:
            return {
                ...state, 
                club: null,
                status: action.payload.status,
                clubLoading: false
            }
        default:
            return state;
    }
}