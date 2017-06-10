import * as types from './actionTypes';
export function createCourse(course) {
  //debugger;
  console.log("Redux Flow step 2: Action Creator: createCouse " + course);
  return {type:types.CREATE_COURSE, course};//type property is required for Redux
}
