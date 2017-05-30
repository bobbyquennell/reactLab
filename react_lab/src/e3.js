import React from 'react';
import './App.css';
/*this is an App for React Js Getting Started by Samer Buna, Chapter 4: Building the Game interface*/


const Star=(props)=>{
   const starNumber = props.starCount;
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
		 	{props.selectedNumbers.map((number, i)=><span key={i} onClick={()=>props.UnselectHandler(number)}>{number}</span>)}
		 </div>

		)
}
const Button=(props)=>{
			let Mybutton;

		switch(props.isAnswerCorrect)
		{
			case true:
				Mybutton = <button className="btn btn-success btn-lg" disabled={props.selectedNumbers.length<=0} onClick={()=>props.submitAnwser()}><i className="fa fa-check"></i></button>;
				break;
			case false:
				Mybutton=<button className="btn btn-danger btn-lg" disabled={props.selectedNumbers.length<=0}><i className="fa fa-times"></i></button>
				break;
			default:
				Mybutton=<button className="btn btn-default btn-lg" disabled={props.selectedNumbers.length<=0} onClick={()=>{
					   props.checkAnwser();}}>=</button>
				break;
		}

	return(

		 <div className="col-2 text-center">
		   {Mybutton}
		   <br/><br/>
		   <button className="btn btn-warning"onClick={()=>props.redraw()} disabled={props.redrawLimit===0}>
		   	<i className="fa fa-refresh"></i> {props.redrawLimit}
		   </button>
		 </div>

		)
}
// class Numbers extends React.Component{

//     constructor(props){
//     	super(props);
//     	this.state = {
//     		numbers:[1,2,3,4,5,6,7,8,9],
//     	}
//     	this.decideClassName=this.decideClassName.bind(this);

//     }
//     decideClassName (number){
// 		// for (var i = 0; i < props.selectedNumbers.length; i++) {
// 		// 	if(props.selectedNumbers[i] == number){
// 		// 		return "selected";
// 		// 	}
// 		// }
// 		console.log("decideClassName: " +number)
// 		if(this.props.selectedNumbers.indexOf(number)>=0){
// 			return 'selected';
// 		}
// 	}

// 	render(){
// 		return (
// 		<div className="card text-center">
// 			{this.state.numbers.map((number, i)=><span 
// 				className={this.decideClassName(number)} key={i} 
// 				onClick={this.props.clickHandler(number,this.decideClassName(number))}>{number}</span>)}
// 		</div>
// 		);
// 	}
// }
const Numbers=(props)=>{
	const numbers = [1,2,3,4,5,6,7,8,9];
	const decideClassName = (number)=>{
		// for (var i = 0; i < props.selectedNumbers.length; i++) {
		// 	if(props.selectedNumbers[i] == number){
		// 		return "selected";
		// 	}
		// }
		if(props.usedNumbers.indexOf(number)>=0){
			return 'used';
		}
		if(props.selectedNumbers.indexOf(number)>=0){
			return 'selected';
		}
	}
	return(
		<div className=" card text-center">
			{numbers.map((number, i)=><span className={decideClassName(number)} key={i} onClick={()=>{ props.clickHandler(number);}}>{number}</span>)}
		</div>
		)
}
class Game extends React.Component{
	randomStarNumber(){
		return Math.floor(Math.random()*9) + 1;
	}
    constructor(props){
    	super(props);
		this.state = ({
	    	selectedNumbers:[],
	    	usedNumbers:[],
	    	starCount:this.randomStarNumber(),
	    	isAnswerCorrect:null,
	    	redrawLimit:5
		});
		this.selectNumber = this.selectNumber.bind(this);
		this.UnselectHandler = this.UnselectHandler.bind(this);
		this.checkAnwser = this.checkAnwser.bind(this);
		this.submitAnwser = this.submitAnwser.bind(this);
		this.redraw = this.redraw.bind(this);
    }
    selectNumber(clickedNumber){
    	 if(this.state.selectedNumbers.indexOf(clickedNumber)<0 && this.state.usedNumbers.indexOf(clickedNumber)<0){
	    	this.setState((prevState)=>({
	    		selectedNumbers:prevState.selectedNumbers.concat(clickedNumber),
	    		isAnswerCorrect:null
	    	}));
    	}
    }
    submitAnwser(){

    	this.setState((prevState)=>({
            starCount:this.randomStarNumber(),
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers:[],
            isAnswerCorrect:null
    	}))
    }
    checkAnwser(){
    	this.setState((prevState)=>({
    		isAnswerCorrect: prevState.selectedNumbers.reduce((acc, n)=>acc+n, 0) === prevState.starCount
    	}));
    	console.log(this.state.isAnswerCorrect);
    };
    UnselectHandler(clickedNumber){
       this.setState((prevState)=>({
	    		selectedNumbers:prevState.selectedNumbers.filter(number=> number!==clickedNumber),
	    		isAnswerCorrect:null
	    	}));
    }
    redraw(){
    	if(this.state.redrawLimit>0)
		this.setState((prevState)=>({
    		starCount:this.randomStarNumber(),
    		redrawLimit: prevState.redrawLimit-1,
    		selectedNumbers:[],
    		isAnswerCorrect:null
		}));

    }
	render(){
		return (
		<div className="container">
			<h2>Play Nine</h2>
			<hr/>
			<div className="row">
			<Star starCount={this.state.starCount}/>
			<Button selectedNumbers={this.state.selectedNumbers} checkAnwser={this.checkAnwser} submitAnwser={this.submitAnwser}  isAnswerCorrect={this.state.isAnswerCorrect} redraw={this.redraw}
			redrawLimit={this.state.redrawLimit}/>

			<Answer selectedNumbers={this.state.selectedNumbers} UnselectHandler={this.UnselectHandler}/>
			</div>
			<br/>
			<Numbers selectedNumbers={this.state.selectedNumbers}
			          clickHandler={this.selectNumber} usedNumbers={this.state.usedNumbers}/>
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