import { useState } from 'react';
import { studyTimeToGoldSmall, studyTimeToGoldLarge, studyTimeToGoldMedium } from './utils/goldCalculator';
import { streakCalculator} from './utils/streakCalculator';
import { gachaCalculator } from './utils/gachaCalculator';
import HomePage from './pages/HomePage';
import { seedDecoder } from './utils/seedDecoder';

function App() {
  // ========== STATE ==========
  const [gold, setGold] = useState(1000);
  const [streaks, setStreaks] = useState({
    small: 0,
    medium: 0,
    large: 0
  });
  const [displayStreak, setDisplayStreak] = useState(0);
  const [allChimera, setAllChimera] = useState([]);
  
  
  // ========== FUNCTIONS ==========

  //10 min on 5 min off
  function smallStudy(){
    const newStreaks = streakCalculator(streaks, "small");
    setDisplayStreak(newStreaks.small);
    setStreaks(newStreaks);
    setGold(gold + studyTimeToGoldSmall(newStreaks.small));

  }
  //25 min on 5 min off
  function mediumStudy(){
    const newStreaks = streakCalculator(streaks, "medium");
    setDisplayStreak(newStreaks.medium);
    setStreaks(newStreaks);
    setGold(gold + studyTimeToGoldMedium(newStreaks.medium));
  }
  //50 min on 10 min off
  function largeStudy(){
    const newStreaks = streakCalculator(streaks, "large");
    setDisplayStreak(newStreaks.large);
    setStreaks(newStreaks);
    setGold(gold + studyTimeToGoldLarge(newStreaks.large));
  }

  function buyBasicChest(){
    if(gold < 100){ return; }
    
    setGold(gold - 100);
    const gachaOutput = gachaCalculator("basic");
    setAllChimera(prev => [...prev, gachaOutput]);
    console.log(gachaOutput);
  }
  //tester variable
  const [testSeedDecode,setTestSeedDecode] = useState(null);
  function buyAdvancedChest(){
    if(gold < 1000){ return; }
    
    setGold(gold - 1000);
    const gachaOutput = gachaCalculator("advanced");
    setAllChimera(prev => [...prev, gachaOutput]);
    console.log(gachaOutput);

    //LINES BELOW ARE TESTING, DELETE ON FINISHED PRODUCT
    setTestSeedDecode(seedDecoder(gachaOutput.seed));
    //setTestSeedDecode(seedDecoder("013404014201015405"));
  }

  //PAGE RENDERING LOGIC BELOW
  let PageComponent;
  const [currentPage, setCurrentPage] = useState('Home');

  if (currentPage === 'Home') {

    if (testSeedDecode && Object.keys(testSeedDecode).length > 0) {
      PageComponent = (
        <HomePage 
          username="Richard"
          gold={gold}
          onStartStudy={() => setCurrentPage('Study')}
          seed={testSeedDecode}
        />
      );
    } else {
      // Optionally render a loading state or default chimera
      PageComponent = <div>Loading...</div>;
    }
  }
  buyAdvancedChest();
  
  
  
  // ========== DISPLAY ==========
  /**
   * return (
    <div style={{ padding: '20px' }}>
      <h1>Evo Study</h1>
      <h2>You have this much: {gold} gold</h2>
      <h2>Your current streak is: {displayStreak}</h2>
      {Your code goes here }
      <button onClick={() => mediumStudy()}>
        click me for 30 min study
      </button>
      <button onClick={() => smallStudy()}>
        click me for 15 min study
      </button>
      <button onClick={() => largeStudy()}>
        click me for 60 min study
      </button>
      <button onClick={() => buyBasicChest()}>
        Click me for basic chest 100 gold
      </button>
      <button onClick={() => buyAdvancedChest()}>
        Click me for basic chest 1000 gold
      </button>
    </div>
      );
      
   **/
  return (
    <div>
      {PageComponent}
    </div>
    
  );
}

export default App;