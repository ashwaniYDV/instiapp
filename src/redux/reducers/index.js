    
import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import AuthReducer from './authReducer';
import UserReducer from './userReducer';
import FeedReducer from './feedReducer';
import ClubReducer from './clubReducer';
import LostnfoundReducer from './lostnfoundReducer';
import ErrorReducer from './errorReducer';

export default combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  user: UserReducer,
  feed: FeedReducer,
  club: ClubReducer,
  lostnfound: LostnfoundReducer,
  error: ErrorReducer
});