import { useState } from 'react';
import { studyTimeToGoldSmall, studyTimeToGoldLarge, studyTimeToGoldMedium } from './utils/goldCalculator';
import { streakCalculator} from './utils/streakCalculator';

function App() {
  // ========== STATE ==========
  const [gold, setGold] = useState(0);
  const [streaks, setStreaks] = useState({
    small: 0,
    medium: 0,
    large: 0
  });
  const [displayStreak, setDisplayStreak] = useState(0);
  
  
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

  
  
  
  // ========== DISPLAY ==========
  return (
    <div style={{ padding: '20px' }}>
      <h1>Evo Study</h1>
      <h2>You have this much: {gold} gold</h2>
      <h2>Your current streak is: {displayStreak}</h2>
      {/* Your code goes here */}
      <button onClick={() => mediumStudy()}>
        click me for 30 min study
      </button>
      <button onClick={() => smallStudy()}>
        click me for 15 min study
      </button>
      <button onClick={() => largeStudy()}>
        click me for 60 min study
      </button>
    </div>
  );
}

export default App;