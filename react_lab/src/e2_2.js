import React from 'react'
//import ReactDOM from 'react-dom'
import axios from 'axios'
import _ from 'lodash'
class Form extends React.Component{
	constructor(props){
		super(props);
		this.state = (
		    {
				usrNameInput:''
			}
		)
		this.usrNameChangeHandler = this.usrNameChangeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}
	usrNameChangeHandler(event){
       console.log("userName Changed");
       this.setState({usrNameInput:event.target.value})
	}
	submitHandler(event){
		event.preventDefault();
		console.log('form submit ',this.state.usrNameInput);
		axios.get(`https://api.github.com/users/${this.state.usrNameInput}`)
		.then((response)=>{
			console.log(response.data);
            this.props.getNewCard(response.data);
			this.setState({usrNameInput:''})
		})
	}
	render(){
		return(
			<form onSubmit={this.submitHandler}>
				<input type="text" value={this.state.usrNameInput} onChange={this.usrNameChangeHandler} placeholder='user name'/>
				<button type="submit">submit</button>
			</form>
		)
	}
}

const Card = (props)=>{
	return (
		 <div style={{margin:'20'}}>
		 	<img src={props.avatar_url} alt="img" style={{width:'75'}}/>
		 	<div style={{display:'inline-block', margin:'10'}}>
		 	<h4>{props.name}</h4>
		 	<p>{props.company}</p>
		    </div>
		 </div>
		)
}

const CardList =(props)=>{
		return(
			<div>
				{props.cards.map(card=><Card {...card}/>)}
			</div>
			);
}


class App extends React.Component{
	constructor(props){
		super(props);
		this.state = ({
			cards:[]
		}
		);
		this.addNewCards = this.addNewCards.bind(this);
	}
	addNewCards(cardInfo){

		this.setState((prevState)=>({
			cards:  prevState.cards.concat(cardInfo)

		}));
	}
	render(){
		return(
			<div style={{margin:'20'}}>
				<Form getNewCard={this.addNewCards}/>
				<CardList cards={this.state.cards}/>
			</div>
			)
	}
}

export default App