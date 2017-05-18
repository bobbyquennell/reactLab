import React from 'react';
import './App.css';
/*this is an App for React Js Getting Started by Samer Buna, Chapter 4: Building the Game interface*/


const Star=()=>{
	return(
		 <div className="col-5">
		 <i className="fa fa-star"></i>
		 <i className="fa fa-star"></i>
		 <i className="fa fa-star"></i>
		 <i className="fa fa-star"></i>
		 </div>

		)
}
const Answer=()=>{
	return(
		 <div className="col-2">
		 ...
		 </div>

		)
}
const Button=()=>{
	return(
		 <div className="col-5">
		 <button className="btn btn-default btn-lg">=</button>
		 </div>

		)
}
const Numbers=()=>{
	return(
		<div className="text-center">
			<span className="notselected">1</span>
			<span className="selected">2</span>
			<span className="used">3</span>
			<span>4</span>
		</div>
		)
}
const Game = ()=>{
	return (
		<div>
			<h2>Play Nine</h2>
			<hr/>
			<div className="row">
			<Star />
			<Button />
			<Answer />
			</div>
			<br/>
			<Numbers/>
		</div>
	)
}




class App extends React.Component{

  render(){
  	return (
  		<Game/>
  	)
  }
}
export default App