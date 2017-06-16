import {combineReducers} from 'redux';
import courseReducer from './courseReducer';
import authorReducer from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';//ajaxCallsInProgress is the alias for ajaxStatusReducer
//see: https://stackoverflow.com/questions/39282253/how-can-i-alias-a-default-import-in-javascript

const rootReducer = combineReducers({
  courseReducer,//es6 shorthand property name:equals to courses:courses
  authorReducer,
  ajaxCallsInProgress
});

export default rootReducer;
