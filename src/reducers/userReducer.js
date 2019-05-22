import { USER_UPDATE } from '../actions/types';

const DEFAULT_STATE={
    user: JSON.parse(localStorage.getItem('USER'))
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type) {
        case USER_UPDATE:
            return {...state, user: action.payload }
        default:
            return state;
    }
}