import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors';

export class ManageCoursePage extends React.Component{

  //note: static property is not a es6 feature, will cause babel compiling error:see :https://github.com/yannickcr/eslint-plugin-react/issues/203
  //how to solve: install: babel-plugin-transform-class-properties and update the .babelrc file settings
  // see details at :https://babeljs.io/docs/plugins/transform-class-properties/
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props, context){
    super(props,context);
    this.state = {
      course: Object.assign({}, this.props.initialCourse),
      errors:{},
      saving: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.courseFormIsValid = this.courseFormIsValid.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.initialCourse.id != nextProps.initialCourse.id){
      //Necessary to populate form when existing course is loaded directly.
      this.setState({course:Object.assign({}, nextProps.initialCourse)});
    }
  }

  updateCourseState(event){
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid(){
    let formIsValid = true;
    let errors = {};
    if(this.state.course.title.length < 5){
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }
  //below is also an experimental syntax: property initializer syntax: https://facebook.github.io/react/docs/handling-events.html
  //we need to install: babel-plugin-transform-class-properties and update the .babelrc file settings.
  //otherwise, will have babel compiling errors when run test with mocha.
  //see details at :https://babeljs.io/docs/plugins/transform-class-properties/
  saveCourse = (event)=>{
    event.preventDefault();
    if(!this.courseFormIsValid()){
      return;
    }
    this.setState({saving:true});
    this.props.actions.saveCourse(this.state.course).then(
      ()=>{
        this.setState({saving:false});
        toastr.success('Course Saved')
        //this.context.router.push('/courses');this won't work in V4 react router
        this.context.router.history.push('/courses');
      })
      .catch(error =>{
        //error:server side error: server side validation failed from mockCourseApi.js
        this.setState({saving:false});
        debugger;
        toastr.error(error);
      });

    //this.context.router.history.push('/courses'); move it to thunk's promises, see above
  }
  render(){
    return(
         <CourseForm
           allAuthors={this.props.authors}
           course={this.state.course}
           errors={this.state.errors}
           onChange={this.updateCourseState}
           onSave={this.saveCourse}
           saving={this.state.saving}
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
  if(courseId && state.courseReducer.length > 0){
    course = getCourseById(state.courseReducer, courseId);
  }


  return {
    initialCourse:course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
