import React from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
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
    this.props.dispatch(courseActions.createCourse(this.state.courseInput));
  }
  courseRow = (courseInput, index)=>{
    return <div key={index}>{courseInput}</div>
  }
  render(){
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
  return{
    courses:state.courseReducer//the courses here will be the property exposed to our component
  }
}

// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
export default connect(mapStateToProps)(CoursesPage);
// connect function creates the container component that can interact with redux
// if ignore the second parameter: mapDispatchToProps, connect will insert a dispatch to property automatically
