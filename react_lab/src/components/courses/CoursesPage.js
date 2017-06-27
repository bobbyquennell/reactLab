import React from 'react';
import {connect} from 'react-redux';
//import * as courseActions from '../../actions/courseActions';
import {createCourse} from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import CourseList from './CourseList';
import ManageCoursePage from './ManageCoursePage';

/*eslint-disable no-console*/
class CoursesPage extends React.Component{
    constructor(props){
        super(props);
    // this.state = {
    //   courseInput:''
    // }

        this.state={
            redirect:false
        };
        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }
  // onTitleChange = (event)=>{
  //   //event.preventDefault();
  //   //const course = this.state.course;
  //   //course.title = event.target.value;
  //   this.setState({
  //     courseInput: event.target.value});
  // }
  // onClickSave = ()=>{
  //   //alert("Saving: " + this.state.courseInput);
  //   //option 1 to dispatch action:
  //   console.log("Redux Flow step 1: dispatching action to redux")
  //   //this.props.dispatch(courseActions.createCourse(this.state.courseInput));
  //   //option 2: manually dispatch action with help of mapDispatchToProps
  //   //this.props.actions.createCourse(this.state.courseInput);
  //   this.props.createCourse(this.state.courseInput);
  //   this.setState({
  //     courseInput:''
  //   });
  // }
    courseRow = (course, index)=>{
        return <div key={index}>{course.title}</div>;
    }

    redirectToAddCoursePage(){
    //browserHistory.push('/course'); //this navigation is deprecated in react router v4
    // one of the four new ways to redirect in V4
    //reference:
        this.setState({redirect:true});

    }
    render(){
    //debugger;
    //console.log(this.props.courses);

        const {courses} = this.props;//using ES6 destructuring to assign properties of an object(here is this.props) to
    //variables of the same name. see more at: https://www.saltycrane.com/blog/2016/03/es6-features-used-react-development/


    //below is one of the 4 new ways to redirect using react-router v4
    //for more details, pls refer to:
    // https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4
    // https://stackoverflow.com/questions/43230194/how-to-use-redirect-in-the-new-react-router-dom-of-reactjs

        const {redirect} = this.state;
        if(redirect){
            return <Redirect to="/course" />;
        }
    //debugger;
        return(
      <div>
          <h1>Courses</h1>
          {//{this.props.courses.map(this.courseRow)}
          }
          <input type="submit"
                 value="Add Course"
                 className="btn btn-primary"
                 onClick={this.redirectToAddCoursePage}/>
          <br/>
          <br/>
          <CourseList courses={courses}/>

          {// <h2>Add Courses</h2>
          // <input type="text" onChange={this.onTitleChange} value={this.state.courseInput}/>
          // <input type="submit" value="save" onClick={this.onClickSave}/>
        }
      </div>
        );
    }
}

function mapStateToProps(state, ownProps){//this state here represent the state in redux store
    console.log('Redux Flow step 4: rendering the latest store state: courses--mapStateToProps');
    return{
        courses:state.courseReducer//the courses here will be the property exposed to our component
    };
}
//option 2: manually mappting with mapDispatchToProps function detertimnes what actions are available in the component
// function mapDispatchToProps(dispatch){
//   return {
//     //createANewCourse: newCourse=> dispatch(courseActions.createCourse(newCourse))
//     actions:bindActionCreators(courseActions, dispatch)
//   }
// }
const mapDispatchToProps = {
    createCourse
};
// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
// connect function creates the container component that can interact with redux
// if ignore the second parameter: mapDispatchToProps, connect will insert a dispatch property to props automatically
//dispatch is a function to fire the action
//important: if we define the mapDispatchToProps function, connect will no longer inter a dispatch property in our component's property
