import logo from './logo.svg';
import './App.css';
import react,{useState,useEffect} from 'react';
import Flipsound from './sounds/flip.mp3';
import Shuffle from './sounds/shuffle.mp3';
import Matchedsound from './sounds/matched.mp3';
import Winning from './sounds/winning.mp3';
import {Howl, Howler} from 'howler';


function App() {

  const pictures =[
  {backFace:require("./images/pancake.png"),hide:false},
  {backFace:require("./images/burger.png"),hide:false},
  {backFace:require("./images/muffin.png"),hide:false},
  {backFace:require("./images/pizza.png"),hide:false},
  {backFace:require("./images/rice.png"),hide:false},
  {backFace:require("./images/eggs.png"),hide:false},
  {backFace:require("./images/icecream.png"),hide:false},
  {backFace:require("./images/spaghetti.png"),hide:false},
  {backFace:require("./images/sandwich.png"),hide:false},
  {backFace:require("./images/taco.png"),hide:false}
];

// Setup the new Howl.
const soundplay = (src) => {
const sound = new Howl({
  src
});
// Play the sound.
sound.play();

}

// Change global volume.


const [cards, setCards] = useState([]);
const [turns, setTurns] = useState(0);
const [firstValue,setFirstValue] =  useState(null);
const [secondValue,setSecondValue] = useState(null);
const [gameStart,setGameStart] = useState(false);
const [disabled, setDisabled] = useState(false);
const [currentID,setCurrentID] = useState(-1);
const [prevID,setprevID] = useState(-1);
const [showpopups,setShowpop] =  useState(false);
const [score,setScore]= useState(0);
const [difficulty,setDifficulty] = useState(0);
const [hideModal,setHideModal] = useState(true);



const shuffleCards = (cardNumbers) => {
  soundplay(Shuffle);
  setGameStart(true);
  setDifficulty(cardNumbers);
  //set the difficulty here
  const pictureCount= pictures.slice(0,cardNumbers)
  const shuffledCards = [...pictureCount, ...pictureCount].sort(() => Math.random()-0.5).map((card) => ({...card,id:Math.random()}))
  setCards(shuffledCards);
  setTurns(0);
  setScore(0);
}

useEffect(()=>{

  if(firstValue && secondValue)
  {
    setDisabled(true);
    if(firstValue.backFace === secondValue.backFace)
      {
      clearTimeout();
      checkScore();
      //checkflipped();
     
      resetTurn();
    soundplay(Matchedsound);
    if( cards.every(checkflipped))
     {
       soundplay(Winning);
        setHideModal(false);
     }
    }
    else{
      setTimeout(() => flipbackCard(prevID,false),1000);
      setTimeout(() => flipbackCard(currentID,false),1000);
      resetTurn();
    }
  }
},[firstValue,secondValue]);

 const checkflipped = (values) => {
  //console.log('for every' + values.hide);
  return values.hide === true;
  
}
const checkScore = () => {
 
  setScore((score) => score+1);
 
}



const handleClick = (cardValue,index) => {
  soundplay(Flipsound);
flipbackCard(index,true);

prevID < 0 ? setprevID(index) : setCurrentID(index);
firstValue ? setSecondValue(cardValue) : setFirstValue(cardValue); 

}




const flipbackCard = (cardID,flipValue) => {
  
  
  setCards(updateCard => {
    return updateCard.map((card,id) => {
      if(id === cardID){
        return{...card, hide:flipValue}
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

Howler.volume(0.5);
  return (
  <>
   

  <section className="memory-header">
   

  
  <h1 className='title'>Flip the cards</h1>
  <section hidden={difficulty>0  ? false: true}>
  <button className='btn-rese'  onClick={()=>{return window.location.reload(true);}} >New game</button> 
  
    </section>



    </section> 
    
    <section className="memory-game">
    <div hidden={gameStart}>
  
  <button className="glow-on-hover"  onClick={()=>shuffleCards(6)}>Easy</button>
   <button className="glow-on-hover" onClick={()=>shuffleCards(8)}>Medium</button> 
   <button className="glow-on-hover" onClick={()=>shuffleCards(10)}>Difficult</button> 
   </div>
   { cards.map((dat,index)=> { 
    
    return  (<div  key={index} className="memory-card" >
    
      <img  className="front-face" 
      
      src={dat.hide  ? dat.backFace : require("./images/dish.png")} 
      onClick={()=>handleClick(dat,index)} alt="JS Badge" />
 
  
    </div>)})}
    <div hidden={hideModal}>
  <h2>Wow! Your score is {Math.floor((score*20)/turns)} out of 20</h2>
</div>
  </section>

  </>
  );
}

export default App;



