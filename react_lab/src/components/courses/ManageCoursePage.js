import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import PropTypes from 'prop-types';

class ManageCoursePage extends React.Component{
  //this is used for redirect by context, the declaration can be done outside the class, see below
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props, context){
    super(props,context);
    this.state = {
      course: Object.assign({}, this.props.initialCourse),
      errors:{}
    };
    this.updateCourseState = this.updateCourseState.bind(this);
  }
  updateCourseState(event){
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }
  saveCourse = (event)=>{
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    //this.context.router.push('/courses');this won't work in V4 react router
    this.context.router.history.push('/courses');
  }
  render(){
    return(
         <CourseForm
           allAuthors={this.props.authors}
           course={this.state.course}
           errors={this.state.errors}
           onChange={this.updateCourseState}
           onSave={this.saveCourse}
         />
       );
  }

}
//this is used for redirect by context, the declaration can be done inside the class, see above
// ManageCoursePage.contextTypes = {
//   router:PropTypes.object
// };
function getCourseById(courses, id){
  const course = courses.filter(course => course.id === id);
  if(course) return course[0]; //since filter returns an array, have to grab the first element.
  return null;
}


//ownProps will be able to get the parameters from the URL
function mapStateToProps(state, ownProps){
  //const courseId= ownProps.params.id;// this won't work in router V4, in V4 we have a prop: 'match' which React Router sends down to the rout component
  //see details at :https://jaketrent.com/post/access-route-params-react-router-v4/
  const courseId= ownProps.match.params.id;// from the path '/course/:id'
  let course = {id:'', watchHref:'', title:'', authorId:'', length:'', category:''};
  if(courseId){
    course = getCourseById(state.courseReducer, courseId);
  }

  const authorsFormattedForDropdown = state.authorReducer.map(author =>{
    return {
      value:author.id,
      text:author.firstName + ' ' + author.lastName
    };
  });
  return {
    initialCourse:course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
