import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import './index.css';

class Button extends React.Component {

    incrementHandler = ()=>{
    	this.props.onClickHandler(this.props.incrementStep);
    }

	render = (props) => {
		return (
			<button onClick={this.incrementHandler}>+{this.props.incrementStep}</button>
			)
	}
}


const Result = (props)=>{
	return (
			<div>{props.counter}</div>
		);
}
class ClrRst extends React.Component{

	render(props){
		return(
			<button onClick={this.props.onClickHandler}>Clear</button>
			)
	}

}

class App extends React.Component{
		constructor(props){
		super(props);
		this.state = {counter:0};
        this.handleClick = this.handleClick.bind(this);
	}
    handleClick = (value)=>{
      this.setState((prevState)=>({
      	counter:prevState.counter + value
      }
      ));
	}
	clrRstClick = ()=>{
      this.setState((prevState)=>({
      	counter:0
      }
      ));
	}
	render(){
		return (
		<div>
			<Button onClickHandler={this.handleClick} incrementStep={1}/>
			<Button onClickHandler={this.handleClick} incrementStep={5}/>
			<Button onClickHandler={this.handleClick} incrementStep={10}/>
			<Button onClickHandler={this.handleClick} incrementStep={20}/>
			<Button onClickHandler={this.handleClick} incrementStep={100}/>
			<ClrRst onClickHandler={this.clrRstClick}/>
			<Result counter={this.state.counter}/>
		</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));