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
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }
  render(){
    return(
      <div>
          <h1>Courses</h1>
          <h2>Add Courses</h2>
          <input type="text" onChange={this.onTitleChange} value={this.state.courseInput}/>
          <input type="submit" value="save" onClick={this.onClickSave}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return{
    courseReducer:state.courses
  }
}

// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
