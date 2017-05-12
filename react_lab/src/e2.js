import React from  'react'

const Card = (props)=>{
	return (
     <div style={{margin:'1em'}}>
     	<img style={{width:'80'}} src={props.avatarUrl} alt=""/>
     	<div style={{display:'inline-block', margin:'1em'}}>
     		<div style={{fontWeight:'bold', fontSize:'1.25em'}}>{props.name}</div>
     		<div>{props.company}</div>
     	</div>
     </div>
	)
}

let data =[
{ name:"avatar",
  avatarUrl:"https://avatars0.githubusercontent.com/u/10257575?v=3",
  company:"test"
},
{ name:"ratava",
  avatarUrl:"https://avatars0.githubusercontent.com/u/4501255?v=3",
  company:"test"
}
]
const CardList = (props)=>{
	const cards = props.cards;
	return(
		<div>
			{/*<Card avatarUrl='https://avatars0.githubusercontent.com/u/10257575?v=3' name='avatar' company='test'/>
			<Card avatarUrl='https://avatars0.githubusercontent.com/u/4501255?v=3' name='ratava' company='test'/>*/}
			{/*{props.cards.map(singlecard =><Card name={singlecard.name} avatarUrl={singlecard.avatarUrl} company={singlecard.company}/>)}*/}
			{cards.map(card=><Card {...card}/>)}
		</div>
		)
}

class App extends React.Component{
	render(){
		return (
			<CardList cards={data}/>
			)
	}
}

export default App