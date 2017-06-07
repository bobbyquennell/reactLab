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
    this.setState({
      courseInput: event.target.value });
  }
  onClickSave = ()=>{
    //alert("Saving: " + this.state.courseInput);
    this.props.dispatch(courseActions.createCourse(this.state.courseInput));
  }
  courseRow = (course, index)=>{
    return <div key={index}>{course}</div>
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

function mapStateToProps(state, ownProps){
  return{
    courses:state.courseReducer
  }
}

// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
export default connect(mapStateToProps)(CoursesPage);
