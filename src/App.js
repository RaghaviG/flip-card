import logo from './logo.svg';
import './App.css';
import react,{useState,useEffect} from 'react';

function App() {

  const pictures =[
  {backFace:require("./images/banana.png"),hide:false},
  {backFace:require("./images/burger.png"),hide:false},
  {backFace:require("./images/muffin.png"),hide:false},
  {backFace:require("./images/pizza.png"),hide:false},
  {backFace:require("./images/rice.png"),hide:false},
  {backFace:require("./images/spaghetti.png"),hide:false},
];



const [cards, setCards] = useState([]);
const [turns, setTurns] = useState(0);
const [firstValue,setFirstValue] =  useState(null);
const [secondValue,setSecondValue] = useState(null);
const [disabled, setDisabled] = useState(false);
const [currentID,setCurrentID] = useState(-1);
const [prevID,setprevID] = useState(-1);
const [flipped,setFlipped] =  useState(false);
const shuffleCards = () => {
  const shuffledCards = [...pictures, ...pictures].sort(() => Math.random()-0.5).map((card) => ({...card,id:Math.random()}))


  setCards(shuffledCards);
  console.log(cards);
  setTurns(0);
}

useEffect(()=>{
  
  
  if(firstValue && secondValue)
  {
   
    console.log('first value:'+firstValue.backFace+" second value:"+secondValue.backFace);
    setDisabled(true);
    if(firstValue.backFace === secondValue.backFace)
      {console.log("match");
      clearTimeout();
      resetTurn();
    }
    else{
      setTimeout(() => flipbackCard(prevID,false),1000);
      setTimeout(() => flipbackCard(currentID,false),1000);
      resetTurn();
    }
  }
},[firstValue,secondValue])

const handleClick = (cardValue,index) => {
flipbackCard(index,true);
 //console.log(index);
 ///setCurrentID(index);
prevID < 0 ? setprevID(index) : setCurrentID(index);
firstValue ? setSecondValue(cardValue) : setFirstValue(cardValue); 

}


const flipbackCard = (cardID,flipValue) => {
  
  {console.log('inside flip back card for :' + cardID + ', '+flipValue)
  setCards(updateCard => {
    return updateCard.map((card,id) => {
      if(id === cardID){
        return{...card, hide:flipValue}
      }
      else{
        return card;
      }
    })
  })}
}
const flipCard = (cardToFlip) =>{
  setCards(prevCard=>{
    return prevCard.map(card=>{
      if(card.backFace === cardToFlip.backFace){
        return{...card,hide:true}
      }
      else{
        return card;
      }
    })
  })
}
const resetTurn = () => {
  setFirstValue(null);
  setSecondValue(null);
  setCurrentID(-1);
  setprevID(-1);
  setTurns((turns)=>turns+1);
}
  return (
  <>
  <h1 className='title'>Flip the cards</h1>
    <button className='button' onClick={shuffleCards}>New Game</button>
  <section className="memory-game">
  
   { cards.map((dat,index)=> { 
    
    return  (<div  key={index} className="memory-card" >
    
      <img  className="front-face" 
      
      src={dat.hide  ? dat.backFace : require("./images/dish.png")} 
      onClick={()=>handleClick(dat,index)} alt="JS Badge" />
      {/* <img  className="back-face"  src={require("./images/dish.png")}    
      onClick={()=> handleClick(dat,index)} hidden={ dat.hide} alt="JS Badge" />
       */}
    </div>)})}
  
  </section>
  </>
  );
}

export default App;
