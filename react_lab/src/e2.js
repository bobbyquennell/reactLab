import React from  'react';
import axios from 'axios';

/*eslint-disable react/no-multi-comp */
/*eslint-disable no-console*/
const Card = (props)=>{
    return (
     <div style={{margin:'1em'}}>
         <img style={{width:'80'}} src={props.avatar_url} alt=""/>
         <div style={{display:'inline-block', margin:'1em'}}>
             <div style={{fontWeight:'bold', fontSize:'1.25em'}}>{props.name}</div>
             <div>{props.company}</div>
         </div>
     </div>
    );
};

const CardList = (props)=>{
    const cards = props.cards;
    return(
        <div>
            {/*<Card avatarUrl='https://avatars0.githubusercontent.com/u/10257575?v=3' name='avatar' company='test'/>
            <Card avatarUrl='https://avatars0.githubusercontent.com/u/4501255?v=3' name='ratava' company='test'/>*/}
            {/*{props.cards.map(singlecard =><Card name={singlecard.name} avatarUrl={singlecard.avatarUrl} company={singlecard.company}/>)}*/}
            {cards.map(card=><Card key={card.id} {...card}/>)}
        </div>
    );
};

class Form extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            userName:''
        };
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('Event: form submit', this.state.userName);
        //ajax... (using fetch method or third party library: axios)
        axios.get(`https://api.github.com/users/${this.state.userName}`)//option 1
       .then(response =>{
           this.props.onSubmit(response.data);
       });
       // fetch(`https://api.github.com/users/${this.state.userName}`)//option 2
       // .then(resp =>{
       //     console.log(resp);
       // })
        this.setState({userName:''});
    }
    handleChange= (event)=>{
        this.setState({userName: event.target.value});
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Github username" required
                value={this.state.userName}
                onChange={this.handleChange}
                 //ref={(input) => this.input = input}
                 />
                <button type="submit">Add card</button>
            </form>

        );
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cards:    [
                // { name:"avatar",
                //   avatarUrl:"https://avatars0.githubusercontent.com/u/10257575?v=3",
                //   company:"test"
                // },
                // { name:"ratava",
                //   avatarUrl:"https://avatars0.githubusercontent.com/u/4501255?v=3",
                //   company:"test"
                // }
            ]
        };
    }
    addNewCard = (cardInfo) =>{
        this.setState((prevState)=>({
            cards:  prevState.cards.concat(cardInfo)

        }));
    }
    render(){
        return (
            <div>
            <Form onSubmit ={this.addNewCard}/>
            <CardList cards={this.state.cards}/>
            </div>
        );
    }
}



export default App;
