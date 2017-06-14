import * as types from '../actions/actionTypes'
import initialState from './initialState';
export default function authorReducer(state=initialState.authors, action){
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      console.log('Redux Flow step 3: Reducer update state in store based on the action.type ' + action.type);
      // state.push(action.course);
      //return state;
      return action.authors;//if course is not an object, cannot use Object.assign() as above
      break;
    default:
      return state;

  }

}
