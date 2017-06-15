import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import PropTypes from 'prop-types';

class ManageCoursePage extends React.Component{
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
    this.context.router.push('/courses');
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

ManageCoursePage.contextTypes = {
  router:PropTypes.object
};

function mapStateToProps(state, ownProps){
  let course = {id:'', watchHref:'', title:'', authorId:'', length:'', category:''};

  const authorsFormattedForDropdown = state.authorReducer.map(author =>{
    return {
      value:author.id,
      text:author.firstName + ' ' + author.lastName
    };
  });
  return {
    course:course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
