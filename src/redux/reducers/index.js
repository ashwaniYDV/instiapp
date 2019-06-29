    
import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import AuthReducer from './authReducer';
import UserReducer from './userReducer';
import FeedReducer from './feedReducer';
import ErrorReducer from './errorReducer';
import ClubReducer from './clubReducer';

export default combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  user: UserReducer,
  feed: FeedReducer,
   club: ClubReducer,
  error: ErrorReducer
});