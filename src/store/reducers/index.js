import { combineReducers } from 'redux';
import articlesReducer from './articlesReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
});

export default rootReducer;
