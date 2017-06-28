import React from 'react';
import './App.css';
import _ from 'lodash';
/*this is an App for React Js Getting Started by Samer Buna, Chapter 4: Building the Game interface*/
/*eslint-disable no-console*/
/*eslint-disable react/no-multi-comp*/
const possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    let listSize = arr.length, combinationsCount = (1 << listSize);
    for (let i = 1; i < combinationsCount ; i++ ) {
        let combinationSum = 0;
        for (let j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

const Star=(props)=>{
    const starNumber = props.starCount;
    let stars = [];
    //react encourages using array methods like: map, filter, reduce instead of loops
    for (let i = 0; i < starNumber; i++) {
        stars.push(<i key={i} className="fa fa-star" />);
    }
    return(
         <div className="col-5">
            {stars}
         </div>

    );
};

const Answer=(props)=>{
    const handleClick = (e)=>{
        props.UnselectHandler(e);
    };
    return(
         <div className="col-5">
             {props.selectedNumbers.map((number, i)=><span className={'e3'} key={i} onClick={()=>{props.UnselectHandler(number);}}>{number}</span>)}
         </div>

    );
};
const Button=(props)=>{
    const handleSubmit= ()=>{
        props.submitAnwser();
    };
    const handleCheckAnwser = ()=>{
        props.checkAnwser();
    };
    const handleRedraw = ()=>{
        props.redraw();
    };
    let Mybutton;

    switch(props.isAnswerCorrect)
        {
    case true:
    // note: in function component, there is no "this" keyword, onClick={this.handleSubmit} should be: onClick={handleSubmit}
    //see:
    //https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
        Mybutton = <button className="btn btn-success btn-lg" disabled={props.selectedNumbers.length<=0} onClick={handleSubmit}><i className="fa fa-check" /></button>;
        break;
    case false:
        Mybutton=<button className="btn btn-danger btn-lg" disabled={props.selectedNumbers.length<=0}><i className="fa fa-times" /></button>;
        break;
    default:
    // note: in function component, there is no "this" keyword, onClick={this.handleCheckAnwser} should be: onClick={handleCheckAnwser}
    //see:
    //https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
        Mybutton= <button className="btn btn-default btn-lg" disabled={props.selectedNumbers.length<=0} onClick={handleCheckAnwser}>=</button>;
        break;
    }

    return(

         <div className="col-2 text-center">
           {Mybutton}
           <br/><br/>
           {// note: in function component, there is no "this" keyword, onClick={this.handleRedraw} should be: onClick={handleRedraw}
           //see:
           //https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
           }
           <button className="btn btn-warning" onClick={handleRedraw} disabled={props.redrawLimit===0}>
               <i className="fa fa-refresh" /> {props.redrawLimit}
           </button>
         </div>

    );
};
// class Numbers extends React.Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             numbers:[1,2,3,4,5,6,7,8,9],
//         }
//         this.decideClassName=this.decideClassName.bind(this);

//     }
//     decideClassName (number){
//         // for (var i = 0; i < props.selectedNumbers.length; i++) {
//         //     if(props.selectedNumbers[i] == number){
//         //         return "selected";
//         //     }
//         // }
//         console.log("decideClassName: " +number)
//         if(this.props.selectedNumbers.indexOf(number)>=0){
//             return 'selected';
//         }
//     }

//     render(){
//         return (
//         <div className="card text-center">
//             {this.state.numbers.map((number, i)=><span
//                 className={this.decideClassName(number)} key={i}
//                 onClick={this.props.clickHandler(number,this.decideClassName(number))}>{number}</span>)}
//         </div>
//         );
//     }
// }
const Numbers=(props)=>{
    const numbers = [1,2,3,4,5,6,7,8,9];
    const clickHandler = (number)=>{
        props.clickHandler(number);
    };
    const decideClassName = (number)=>{
        // for (var i = 0; i < props.selectedNumbers.length; i++) {
        //     if(props.selectedNumbers[i] == number){
        //         return "selected";
        //     }
        // }
        if(props.usedNumbers.indexOf(number)>=0){
            return 'used';
        }
        if(props.selectedNumbers.indexOf(number)>=0){
            return 'selected';
        }
    };
    return(
        <div className=" card text-center">
            {numbers.map((number, i)=><span className={'e3 '+ decideClassName(number)} key={i} onClick={()=>{props.clickHandler(number);}}>{number}</span>)}
        </div>
    );
};
const DoneStatus=(props)=>{
    console.log(props.doneStatus);
    return(
        <div className="text-center">
            <h2 className="text-center">{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play Again</button>
        </div>
    );
};
class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            selectedNumbers:[],
            usedNumbers:[],
            starCount:this.randomStarNumber(),
            isAnswerCorrect:null,
            redrawLimit:15,
            doneStatus:null
        });
        this.selectNumber = this.selectNumber.bind(this);
        this.UnselectHandler = this.UnselectHandler.bind(this);
        this.checkAnwser = this.checkAnwser.bind(this);
        this.submitAnwser = this.submitAnwser.bind(this);
        this.redraw = this.redraw.bind(this);
    }
    randomStarNumber(){
        return Math.floor(Math.random()*9) + 1;
    }
    initializeState = ()=>
    {
        this.setState({
            selectedNumbers:[],
            usedNumbers:[],
            starCount:this.randomStarNumber(),
            isAnswerCorrect:null,
            redrawLimit:15,
            doneStatus:null});
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
        }), this.updateDoneStatus);
    }
    checkAnwser(){
        this.setState((prevState)=>({
            isAnswerCorrect: prevState.selectedNumbers.reduce((acc, n)=>acc+n, 0) === prevState.starCount
        }));
        console.log(this.state.isAnswerCorrect);
    }
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
            }), this.updateDoneStatus);

    }
    updateDoneStatus = ()=>{
        console.log("updateDoneStatus");
        this.setState((prevState)=>{
            console.log(prevState.usedNumbers);
            if(prevState.usedNumbers.length ===9){
                console.log("Done");
                return {doneStatus:"Done. Nice!"};
            }
            console.log(prevState.redrawLimit);
            if(prevState.redrawLimit === 0 && !this.possibleSolutions(prevState)){
                console.log('Game Over');
                return {doneStatus:"Game Over!"};
            }
        });
    }
    possibleSolutions=({randomStarNumber, usedNumbers})=>{

        const possibleNumbers = _.range(1,10).filter(number=>usedNumbers.indexOf(number) <0);
        return possibleCombinationSum(possibleNumbers, randomStarNumber);
    }
    resetGame = ()=>{
        this.initializeState();
    }
    render(){
        let result;
        if(this.state.doneStatus !== null){
            console.log("this.doneStatus !== null");
            result=<DoneStatus doneStatus={this.state.doneStatus} resetGame={this.resetGame}/>;
        }
        else{
            console.log("this.doneStatus === null");
            result=<Numbers selectedNumbers={this.state.selectedNumbers}
                      clickHandler={this.selectNumber} usedNumbers={this.state.usedNumbers}/>;
        }

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
            {result}

            <br/>

        </div>
        );
    }
}


class App extends React.Component{

    render(){
        return (
            <Game/>
        );
    }
}
export default App;
