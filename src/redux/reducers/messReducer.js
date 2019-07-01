import { POST_MESS_SUCCESS, POST_MESS_FAIL, UPDATE_MESS_SUCCESS, UPDATE_MESS_FAIL, CANCEL_MESS_SUCCESS, CANCEL_MESS_FAIL } from "../actions/types";

const DEFAULT_STATE={
    mess: null,
    postMessage: null,
    updateMessage: null,
    cancelMessage: null,
    status: null
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type) {
        case POST_MESS_SUCCESS:
            return {
                ...state,
                mess: action.payload.mess,
                postMessage: 1,
                updateMessage: null,
                status: action.payload.status
            }
        case POST_MESS_FAIL:
            return {
                ...state,
                mess: null,
                postMessage: null,
                status: action.payload.status
            }
        case UPDATE_MESS_SUCCESS:
            return {
                ...state,
                mess: action.payload.mess,
                updateMessage: 1,
                postMessage: null,
                status: action.payload.status
            }
        case UPDATE_MESS_FAIL:
            return {
                ...state,
                mess: null,
                updateMessage: null,
                status: action.payload.status
            }
        case CANCEL_MESS_SUCCESS:
            return {
                ...state,
                cancelMessage: action.payload.cancelMessage,
                status: action.payload.status
            }
        case CANCEL_MESS_FAIL:
            return {
                ...state,
                cancelMessage: null,
                status: action.payload.status
            }
        default:
            return state;
    }
}