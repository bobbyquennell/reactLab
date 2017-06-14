import {combineReducers} from 'redux';
import courseReducer from './courseReducer';
import authorReducer from './authorReducer';
const rootReducer = combineReducers({
  courseReducer,//es6 shorthand property name:equals to courses:courses
  authorReducer
});

export default rootReducer;
