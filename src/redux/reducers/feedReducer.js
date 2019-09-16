import { FEEDS_LOADING, FEED_LOADING, ALL_FEEDS_SUCCESS, ALL_FEEDS_FAIL, FEED_SUCCESS, FEED_FAIL, POST_FEED_SUCCESS, POST_FEED_FAIL } from "../actions/types";

const DEFAULT_STATE={
    feeds: null,
    feed: null,
    feedsLoading: false,
    feedLoading: false,
    status: null
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type) {
        case FEEDS_LOADING:
            return {
                ...state,
                feedsLoading: true
            }
        case FEED_LOADING:
            return {
                ...state,
                feedLoading: true
            }
        case ALL_FEEDS_SUCCESS:
            return {
                ...state, 
                feeds: action.payload.feeds,
                status: action.payload.status,
                feedsLoading: false
            }
        case ALL_FEEDS_FAIL:
            return {
                ...state, 
                feeds: null,
                status: action.payload.status,
                feedsLoading: false
            }
        case FEED_SUCCESS:
            return {
                ...state, 
                feed: action.payload.feed,
                status: action.payload.status,
                feedLoading: false
            }
        case FEED_FAIL:
            return {
                ...state, 
                feed: null,
                status: action.payload.status,
                feedLoading: false
            }
        case POST_FEED_FAIL:
            return {
                ...state, 
                feed: null,
                status: action.payload.status,
                feedLoading: false
            }
        case POST_FEED_SUCCESS:
            return {
                ...state, 
                feed: action.payload.feed,
                status: action.payload.status,
                feedLoading: false
            }
        default:
            return state;
    }
}