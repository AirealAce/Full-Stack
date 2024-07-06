import './App.css';
import { useState } from 'react';

// Define the Card component outside of the App component
function Card({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false); //by default, usestate is false, card is unflipped

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
      {isFlipped ? (//display back view
        <div className="card-back">{back}</div>
      ) : (//default is front view
        <div className="card-front">{front}</div>
      )}
    </div>
  );
}

const App = () => {
  // Initialized currentCard state
// Initialize currentCard with more structure and a flipped boolean
  const [currentCard, setCurrentCard] = useState({ card: { front: '', back: '' }, isFlipped: false });
  //^ current card is a card where front & back are ' ' 
  const [currentDeck, setCurrentDeck] = useState([]); //keep track of current deck in use
  const [currentIndex, setCurrentIndex] = useState(0); //keep track of current index of deck

  const easyDeck = {
    name: "Easy Deck",
    description: "This deck will test your understanding of simple Japanese words",
    cards: [
    { front: "EQ1: What does 返す mean?", back: "EA1: to return (something)" },
    { front: "EQ2: What is the hiragana for 雑用?", back: "EA2: ざつよう" },
    { front: "EQ3: What does しかたない mean?", back: "EA3: cannot be helped" },
    // ... other cards
    ]
  };

  const mediumDeck = {
    name: "Medium Deck",
    description: "Test your translation skills by interpreting the sentence",
    cards: [
    { front: "MQ1: そう じゃあ ご飯 抜き に する わ よ 鎖 も 外し て あげ ない‌", 
    back: "MA1: Okay then, no food for you.‌ I won't take the chain off of you, either.‌" },
    { front: "MQ2: そう よ 、 どう し て イギリス人 の 私 が 日本語 を 喋ら なく て は いけ ませ ん の ？‌", 
    back: "MA2: Anyway, why does an English girl‌ like me have to speak Japanese?‌" },
    { front: "MQ3: 挨拶 し たら 倒れこん じゃった よ‌", back: "MA3: She fell down after I greeted her.‌" },
    { front: "MQ4: 茉莉 ちゃー ん 、 家 まで 送って こっかー ？‌", 
    back: "MA4: Matsuri, want me to drop you off‌ at home?‌" },
    { front: "MQ5: まったく 、 どう かし てる な 、 僕 も … ‌", 
    back: "MA5: eriously... I must be going insane...‌" },
    { front: "MQ6: わたし ちょっと 鈍く て‌r", back: "MA6: I'm kinda dense...‌" },

    // ... other cards
    ]
  };

  const hardDeck = {
    name: "Hard Deck",
    description: "Guess the show's name in Japanese using only images",
    cards: [
    { front: <>HQ1: <img src="/Images/HQ1.jpg" alt="Description" style={{width: "300px"}} /></>, 
    back: "HA1: がされて藍蘭島" },
    { front: <>HQ2: <img src="/Images/HQ2.jpg" alt="Description" style={{width: "300px"}} /></>, 
    back: "HA2: ナルト" },
    { front: <>HQ3: <img src="/Images/HQ3.jpg" alt="Description" style={{width: "300px"}} /></>, 
    back: "HA3: ドラゴンボール" },
    { front: <>HQ4: <img src="/Images/HQ4.jpg" alt="Description" style={{width: "300px"}} /></>, 
    back: "HA4: 寄生獣" },
    { front: <>HQ5: <img src="/Images/HQ5.jpg" alt="Description" style={{width: "300px"}} /></>, 
    back: "HA5: うまるちゃん" },
    
    // ... other cards
    ]
  };
  // Update to store current deck info
  const [currentDeckInfo, setCurrentDeckInfo] = useState({ name: 'Select a Deck!', description: '. . .', cards: [] });
  //keep track of cards user has seen
  const [history, setHistory] = useState([]); 

  // Function to handle deck selection
  const handleDeckSelection = (deck) => {
    setCurrentDeck(deck.cards); //use the card deck
    setCurrentCard({ card: deck.cards[0], isFlipped: false });
    setCurrentDeckInfo(deck);     //store current deck's information
    setCurrentIndex(0);           //start from card 1
    setHistory([]);               //reset user deck history
    };
   
   const handlePrev = () => {
    if (history.length === 0) {
      //do nothing
      return;
    }
    const newIndex = history.pop(); //remove the last index from history and use it as the new index
    setCurrentCard({ card: currentDeck[newIndex], isFlipped: false });
    setCurrentIndex(newIndex);
    setHistory(history.slice(0, -1)); //update history to remove the last index
  };
        
  const handleNext = () => {
    let newIndex;
    do {//get random next card
      newIndex = Math.floor(Math.random() * currentDeck.length);
    } while (newIndex === currentIndex); // Ensure the new index is not the same as the current index
    setHistory(currentHistory => [...currentHistory, currentIndex]); // Add current index to history
    setCurrentCard({ card: currentDeck[newIndex], isFlipped: false });
    setCurrentIndex(newIndex);
  };
  
  
  const toggleCardSide = () => {
    setCurrentCard(current => ({ ...current, isFlipped: !current.isFlipped }));
  };
  
  return (
    <div className="App">
      <div className="header">
        <h1>日本語 Study Session</h1>
        <h2 >Flashcards</h2>
        <div className="deck-info">
          <h3>{currentDeckInfo.name}</h3>
          <p>{currentDeckInfo.description}</p>
          <p>Number of Cards: {currentDeckInfo.cards.length}</p>
        </div>
        {/* <div className="text-box" onClick={toggleCardSide}> */}
        <div className={`text-box ${currentDeckInfo.name === 'Easy Deck' ? 'text-box-easy' : currentDeckInfo.name === 'Medium Deck' ? 'text-box-medium' : currentDeckInfo.name === 'Hard Deck' ? 'text-box-hard' : ''}`} onClick={toggleCardSide}>
          <p style={{ fontSize: '50px' }}>{currentCard.isFlipped ? currentCard.card.back : currentCard.card.front}</p>
        </div>        
        <div className="navigation">
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
        <div className='container'>
          <div className="upgrade">
            <button onClick={() => handleDeckSelection(easyDeck)}>Easy</button>
          </div>
          <div className="upgrade">
            <button onClick={() => handleDeckSelection(mediumDeck)}>Medium</button>
          </div>
          <div className="upgrade">
            <button onClick={() => handleDeckSelection(hardDeck)}>Hard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
