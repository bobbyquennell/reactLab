import React from 'react';
import {connect} from 'react-redux';
//import * as courseActions from '../../actions/courseActions';
import {createCourse} from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
class CoursesPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      courseInput:''
    }
  };
  onTitleChange = (event)=>{
    //event.preventDefault();
    //const course = this.state.course;
    //course.title = event.target.value;
    this.setState({
      courseInput: event.target.value});
  }
  onClickSave = ()=>{
    //alert("Saving: " + this.state.courseInput);
    //option 1 to dispatch action:
    console.log("Redux Flow step 1: dispatching action to redux")
    //this.props.dispatch(courseActions.createCourse(this.state.courseInput));
    //option 2: manually dispatch action with help of mapDispatchToProps
    //this.props.actions.createCourse(this.state.courseInput);
    this.props.createCourse(this.state.courseInput);
    this.setState({
      courseInput:''
    });
  }
  courseRow = (courseTitle, index)=>{
    return <div key={index}>{courseTitle}</div>
  }
  render(){
    //debugger;
    //console.log(this.props.courses);
    return(
      <div>
          <h1>Courses</h1>
          {this.props.courses.map(this.courseRow)}
          <h2>Add Courses</h2>
          <input type="text" onChange={this.onTitleChange} value={this.state.courseInput}/>
          <input type="submit" value="save" onClick={this.onClickSave}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){//this state here represent the state in redux store
  console.log('Redux Flow step 4: rendering the latest store state: courses--mapStateToProps');
  return{
    courses:state.courseReducer//the courses here will be the property exposed to our component
  }
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
