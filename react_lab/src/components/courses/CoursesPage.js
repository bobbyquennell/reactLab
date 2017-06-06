import React from 'react';

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
    alert("Saving: " + this.state.courseInput);
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

export default CoursesPage;
