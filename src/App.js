import logo from './logo.svg';
import './App.css';
import react,{useState} from 'react';

function App() {

  const pictures =[
  {backFace:require("./images/banana.png")},
  {backFace:require("./images/burger.png")},
  {backFace:require("./images/muffin.png")},
  {backFace:require("./images/pizza.png")},
  {backFace:require("./images/rice.png")},
  {backFace:require("./images/spaghetti.png")},
];



const [cards, setCards] = useState([]);
const [turns, setTurns] = useState(0);
const [firstValue,setFirstValue] =  useState(null);
const [secondValue,setSecondValue] = useState(null);
const shuffleCards = () => {
  const shuffledCards = [...pictures, ...pictures].sort(() => Math.random()-0.5).map((card) => ({...card,id:Math.random()}))


  setCards(shuffledCards);
  setTurns(0);
}

const handleClick = (card) => {
console.log(card);
firstValue ? setSecondValue(card) : setFirstValue(card);
if(firstValue.backFace === secondValue.backFace)
 resetTurn();
 console.log("TRUE");
}

const resetTurn = () => {
  setFirstValue(null);
  setSecondValue(null);
  setTurns((turns)=>turns+1);
}
  return (
  <>
    <button onClick={shuffleCards}>New Game</button>
  <section className="memory-game">
  
   { cards.map((dat)=> {return (<div  className="memory-card" >
   <img className="front-face" src="/images/dish.png"  onClick={()=> handleClick(dat)} alt="JS Badge" />
      <img className="back-face" src={dat.backFace} hidden= {true}  alt="JS Badge" />
    </div>)})}
  
  </section>
  </>
  );
}

export default App;
