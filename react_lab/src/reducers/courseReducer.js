import * as types from '../actions/actionTypes'
import initialState from './initialState';
export default function courseReducer(state=initialState.courses, action){
  switch (action.type) {
    case types.CREATE_COURSE:
      console.log('Redux Flow step 3: Reducer update state in store based on the action.type ' + action.type);
      // state.push(action.course); in Redux, state is immutable.
      //Immutability is important for performance, simplicity,and predictablity.
      //And it's precisely what enables interesting features like time-travel
      //debugging, so we cannot simply push another value into state right here.
      //return state;
      return [...state,//spread operator in es6
        //Object.assign({}, action.course)
        action.course//if course is not an object, cannot use Object.assign() as above
      ];
      break;
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
      break;
    case types.UPDATE_COURSE_SUCCESS:
      return [...state.filter(course=> course.id !== action.course.id),//remove the old one, add the new one with same id
        Object.assign({}, action.course)
      ];
      break;
    case types.CREATE_COURSE_SUCCESS:
      return [...state,//spread operator in es6
        Object.assign({}, action.course)
      ];
      break;
    default:
      return state;

  }

}
