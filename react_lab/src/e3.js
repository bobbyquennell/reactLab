import React from 'react';
import './App.css';
/*this is an App for React Js Getting Started by Samer Buna, Chapter 4: Building the Game interface*/


const Star=(props)=>{
   const starNumber = Math.floor(Math.random()*9) + 1;
   var stars = [];
   //react encourages using array methods like: map, filter, reduce instead of loops
   for (let i = 0; i < starNumber; i++) {
   	   stars.push(<i key={i} className="fa fa-star"></i>);
   }
	return(
		 <div className="col-5">
			{stars}
		 </div>

		)
}
const Answer=()=>{
	return(
		 <div className="col-5">
			<span>5</span>
			<span>6</span>
		 </div>

		)
}
const Button=()=>{
	return(
		 <div className="col-2">
		 <button className="btn btn-default btn-lg">=</button>
		 </div>

		)
}
const Numbers=()=>{
	const numbers = [1,2,3,4,5,6,7,8,9];
	return(
		<div className=" card text-center">
{/*			<span>1</span>
			<span className="selected">2</span>
			<span className="used">3</span>
			<span>4</span>*/}
			{numbers.map((number, i)=>{return (<span key={i}>{number}</span>);})}
		</div>
		)
}
const Game = ()=>{
	return (
		<div className="container">
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