import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

/*eslint-disable no-console*/
export function createCourse(course) {
    //debugger;
    console.log("Redux Flow step 2: Action Creator: createCouse " + course);
    return {type:types.CREATE_COURSE, course};//type property is required for Redux
}
export function loadCoursesSuccess(courses){
    return{type: types.LOAD_COURSES_SUCCESS, courses};
}
export function updateCourseSuccess(course){
    return{type: types.UPDATE_COURSE_SUCCESS, course};
}
export function createCourseSuccess(course){
    return{type: types.CREATE_COURSE_SUCCESS, course};
}


//thunk for async call: getAllCourses, then dispatch another action :
//loadCoursesSuccess
export function loadCourses(){
    return function(dispatch){
        dispatch(beginAjaxCall());
        return courseApi.getAllCourses().then(courses =>{
            dispatch(loadCoursesSuccess(courses));
        }).catch(error =>{ throw(error);});
    };
}

//thunk for async call: saveCourse, then dispatch another action :
//updateCourseSuccess or createCourseSuccess, based on the course.id
export function saveCourse(course){
    return function(dispatch, getState){
        dispatch(beginAjaxCall());
        return courseApi.saveCourse(course).then(savedCourse =>{
            course.id? dispatch(updateCourseSuccess(savedCourse)) :
                dispatch(createCourseSuccess(savedCourse));
        }).catch(error =>{
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}
