import * as types from '../actions/actionTypes'
import initialState from './initialState';
export default function courseReducer(state=initialState.courses, action){
  switch (action.type) {
    case types.CREATE_COURSE:
      console.log('Redux Flow step 3: Reducer update state in store based on the action.type ' + action.type);
      // state.push(action.course);
      //return state;
      return [...state,//spread operator in es6
        //Object.assign({}, action.course)
        action.course//if course is not an object, cannot use Object.assign() as above
      ];
      break;
    case types.LOAD_COURSES_SUCCESS:
      console.log('Redux Flow step 3: Reducer update state in store based on the action.type ' + action.type);
      // state.push(action.course);
      //return state;
      return action.courses;//if course is not an object, cannot use Object.assign() as above
      break;
    default:
      return state;

  }

}
