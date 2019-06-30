import { LOSTANDFOUNDS_LOADING, ALL_LOSTANDFOUNDS_SUCCESS, ALL_LOSTANDFOUNDS__FAIL, USER_LOSTANDFOUNDS_SUCCESS, USER_LOSTANDFOUNDS__FAIL } from "../actions/types";

const DEFAULT_STATE={
    lostnfounds: null,
    userlostnfounds: null,
    lostnfoundsLoading: false,
    status: null
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type) {
        case LOSTANDFOUNDS_LOADING:
            return {
                ...state,
                lostnfoundsLoading: true
            }
        case ALL_LOSTANDFOUNDS_SUCCESS:
            return {
                ...state, 
                lostnfounds: action.payload.lostnfounds,
                status: action.payload.status,
                lostnfoundsLoading: false
            }
        case ALL_LOSTANDFOUNDS__FAIL:
            return {
                ...state, 
                lostnfounds: null,
                status: action.payload.status,
                lostnfoundsLoading: false
            }
        case USER_LOSTANDFOUNDS_SUCCESS:
                return {
                    ...state, 
                    userlostnfounds: action.payload.userlostnfounds,
                    status: action.payload.status,
                    lostnfoundsLoading: false
                }
            case USER_LOSTANDFOUNDS__FAIL:
                return {
                    ...state, 
                    userlostnfounds: null,
                    status: action.payload.status,
                    lostnfoundsLoading: false
                }
        default:
            return state;
    }
}