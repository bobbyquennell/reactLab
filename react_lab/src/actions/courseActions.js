export function createCourse(course) {
  return {type:'CREATE_COURSE', course};//type property is required for Redux
}
