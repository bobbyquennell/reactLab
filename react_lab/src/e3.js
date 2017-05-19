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
const Answer=(props)=>{
	return(
		 <div className="col-5">
		 	{props.selectedNumbers.map((number, i)=><span key={i}>{number}</span>)}
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
const Numbers=(props)=>{
	const numbers = [1,2,3,4,5,6,7,8,9];
	const decideClassName = (number)=>{
		// for (var i = 0; i < props.selectedNumbers.length; i++) {
		// 	if(props.selectedNumbers[i] == number){
		// 		return "selected";
		// 	}
		// }
		if(props.selectedNumbers.indexOf(number)>=0){
			return 'selected';
		}
	}
	return(
		<div className=" card text-center">
			{numbers.map((number, i)=><span className={decideClassName(number)} key={i}>{number}</span>)}
		</div>
		)
}
class Game extends React.Component{
    constructor(props){
    	super(props);
		this.state = ({
	    	selectedNumbers:[3,9]
		});
    }
	render(){
		return (
		<div className="container">
			<h2>Play Nine</h2>
			<hr/>
			<div className="row">
			<Star />
			<Button />
			<Answer selectedNumbers = {this.state.selectedNumbers}/>
			</div>
			<br/>
			<Numbers selectedNumbers = {this.state.selectedNumbers}/>
		</div>
	);
	}
}




class App extends React.Component{

  render(){
  	return (
  		<Game/>
  	)
  }
}
export default App