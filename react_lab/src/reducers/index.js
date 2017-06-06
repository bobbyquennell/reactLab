import {combineReducers} from 'redux';
import courseReducer from './courseReducer';
const rootReducer = combineReducers({
  courseReducer//es6 shorthand property name:equals to courses:courses
});

export default rootReducer;
