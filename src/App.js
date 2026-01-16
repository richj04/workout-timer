import { useState, useEffect } from 'react';
import { studyTimeToGoldSmall, studyTimeToGoldLarge, studyTimeToGoldMedium } from './utils/goldCalculator';
import { streakCalculator} from './utils/streakCalculator';
import { gachaCalculator } from './utils/gachaCalculator';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import InventoryPage from './pages/InventoryPage';
import StudyPage from './pages/StudyPage';
import { seedDecoder } from './utils/seedDecoder';
import { FaHome, FaBook, FaStore, FaBoxOpen, FaTrophy, FaCoins } from 'react-icons/fa';


function App() {
  // ========== STATE ==========
  const [gold, setGold] = useState(10000);
  const [streaks, setStreaks] = useState({
    small: 0,
    medium: 0,
    large: 0
  });
  const [displayStreak, setDisplayStreak] = useState(0);
  const [allChimera, setAllChimera] = useState([]);
  const [displaySeed, setDisplaySeed] = useState(null);
  
  // ========== FUNCTIONS ==========

  //10 min on 5 min off
  function finishSmallStudy(){
    const newStreaks = streakCalculator(streaks, "small");
    setDisplayStreak(newStreaks.small);
    setStreaks(newStreaks);
    setGold(gold + studyTimeToGoldSmall(newStreaks.small));
  }
  //25 min on 5 min off
  function finishMediumStudy(){
    const newStreaks = streakCalculator(streaks, "medium");
    setDisplayStreak(newStreaks.medium);
    setStreaks(newStreaks);
    setGold(gold + studyTimeToGoldMedium(newStreaks.medium));
  }
  //50 min on 10 min off
  function finishLargeStudy(){
    const newStreaks = streakCalculator(streaks, "large");
    setDisplayStreak(newStreaks.large);
    setStreaks(newStreaks);
    setGold(gold + studyTimeToGoldLarge(newStreaks.large));
  }

  function buyBasicChest(){
    if(gold < 100){ return; }
    
    setGold(gold - 100);
    const gachaOutput = gachaCalculator("basic");
    const gachaSeed = gachaOutput["seed"];
    setAllChimera(prev => [...prev, gachaSeed]);
    console.log(gachaOutput);
  }
  //tester variable
  function buyAdvancedChest(){
    if(gold < 1000){ return; }
    
    setGold(gold - 1000);
    const gachaOutput = gachaCalculator("advanced");
    const gachaSeed = gachaOutput["seed"];
    setAllChimera(prev => [...prev, gachaSeed]);
    console.log(gachaOutput);

  }

  useEffect(() =>{
    if(allChimera.length == 1){
      setDisplaySeed(seedDecoder(allChimera[0]));
    }
  }, [allChimera]);

  //PAGE RENDERING LOGIC BELOW
  let PageComponent;
  const [currentPage, setCurrentPage] = useState('HomePage');

  if (currentPage === 'HomePage') {
    PageComponent = (
        <HomePage 
          username="Richard"
          gold={gold}
          onStartStudy={() => setCurrentPage('Study')}
          seed={displaySeed}
    />);
  }else if (currentPage === 'StudyPage') {
    PageComponent = (
      <StudyPage />
    );
  }else if (currentPage === 'ShopPage') {
    PageComponent = (
      <ShopPage
        buyBasicChest={buyBasicChest}
        buyAdvancedChest={buyAdvancedChest}
        buyGold={setGold}
      />
    );
    console.log("test");
  }else if (currentPage === 'InventoryPage') {
    PageComponent = (
      <InventoryPage 
        allChimera={allChimera}
        setDisplaySeed={setDisplaySeed}
      />
    );
  }

  return (
    <div>
      {/* ===== Top Bar ===== */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        {/* Username */}
        <div className="font-semibold text-gray-800">Richard</div>
          <h1 className="text-3xl font-bold text-gray-900">Evo Study</h1>
          <div className="flex items-center gap-1">
          <FaCoins className="text-yellow-500" />
          <span className="font-medium">{gold}</span>
        </div>
      </div>
      
      {/*Actual Page*/}
      {PageComponent}

      {/* ===== Bottom Navigation Bar ===== */}
      <nav className="fixed bottom-0 w-full flex justify-around items-center h-16 bg-white shadow-inner">
      {/* Each button: icon on top, text below */}
        <NavButton icon={<FaHome />} label="Home" onClick={() => setCurrentPage("HomePage")}/>
        <NavButton icon={<FaBook />} label="Study" onClick={() => setCurrentPage("StudyPage")}/>
        <NavButton icon={<FaStore />} label="Shop" onClick={() => setCurrentPage("ShopPage")}/>
        <NavButton icon={<FaBoxOpen />} label="Inventory" onClick={() => setCurrentPage("InventoryPage")}/>
        <NavButton icon={<FaTrophy />} label="Leaderboard" />
      </nav>
    </div>
    
  );
}

export default App;

function NavButton({ icon, label, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center justify-center w-16 h-full text-gray-700 hover:text-blue-500 cursor-pointer">
      <div className="text-3xl md:text-3xl">{icon}</div>
      <span className="text-xs md:text-sm truncate">{label}</span>
    </div>
  );
}