import { useState, useEffect } from 'react';
import { studyTimeToGoldSmall, studyTimeToGoldLarge, studyTimeToGoldMedium } from './utils/goldCalculator';
import { streakCalculator } from './utils/streakCalculator';
import { gachaCalculator } from './utils/gachaCalculator';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import InventoryPage from './pages/InventoryPage';
import StudyPage from './pages/StudyPage';
import { seedDecoder } from './utils/seedDecoder';
import { FaHome, FaBook, FaStore, FaBoxOpen, FaCoins } from 'react-icons/fa';

export function App() {
  const [gold, setGold] = useState(10000);
  const [streaks, setStreaks] = useState({
    small: 0,
    medium: 0,
    large: 0,
  });
  const [displayStreak, setDisplayStreak] = useState(0);
  const [allChimera, setAllChimera] = useState([]);
  const [displaySeed, setDisplaySeed] = useState(null);

  function finishSmallStudy() {
    const newStreaks = streakCalculator(streaks, 'small');
    setDisplayStreak(newStreaks.small);
    setStreaks(newStreaks);
    setGold(gold + studyTimeToGoldSmall(newStreaks.small));
  }

  function finishMediumStudy() {
    const newStreaks = streakCalculator(streaks, 'medium');
    setDisplayStreak(newStreaks.medium);
    setStreaks(newStreaks);
    setGold(gold + studyTimeToGoldMedium(newStreaks.medium));
  }

  function finishLargeStudy() {
    const newStreaks = streakCalculator(streaks, 'large');
    setDisplayStreak(newStreaks.large);
    setStreaks(newStreaks);
    setGold(gold + studyTimeToGoldLarge(newStreaks.large));
  }

  function buyBasicChest() {
    if (gold < 100) {
      return;
    }

    setGold(gold - 100);
    const gachaOutput = gachaCalculator('basic');
    const gachaSeed = gachaOutput['seed'];
    setAllChimera((prev) => [...prev, gachaSeed]);
    console.log(gachaOutput);
  }

  function buyAdvancedChest() {
    if (gold < 1000) {
      return;
    }

    setGold(gold - 1000);
    const gachaOutput = gachaCalculator('advanced');
    const gachaSeed = gachaOutput['seed'];
    setAllChimera((prev) => [...prev, gachaSeed]);
    console.log(gachaOutput);
  }

  useEffect(() => {
    if (allChimera.length == 1) {
      setDisplaySeed(seedDecoder(allChimera[0]));
    }
  }, [allChimera]);

  let PageComponent;
  const [currentPage, setCurrentPage] = useState('HomePage');

  if (currentPage === 'HomePage') {
    PageComponent = (
      <HomePage
        username="Richard"
        gold={gold}
        onStartStudy={() => setCurrentPage('StudyPage')}
        seed={displaySeed}
      />
    );
  } else if (currentPage === 'StudyPage') {
    PageComponent = (
      <StudyPage
        finishSmallStudy={finishSmallStudy}
        finishMediumStudy={finishMediumStudy}
        finishLargeStudy={finishLargeStudy}
      />
    );
  } else if (currentPage === 'ShopPage') {
    PageComponent = (
      <ShopPage buyBasicChest={buyBasicChest} buyAdvancedChest={buyAdvancedChest} buyGold={setGold} />
    );
    console.log('test');
  } else if (currentPage === 'InventoryPage') {
    PageComponent = <InventoryPage allChimera={allChimera} setDisplaySeed={setDisplaySeed} />;
  }

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Welcome</div>
            <div className="text-sm font-semibold text-slate-900">Richard</div>
          </div>
          <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">Evo Study</h1>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
            <FaCoins className="text-amber-500" />
            {gold}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PageComponent}
      </main>

      <nav className="fixed bottom-0 w-full border-t border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-around px-6">
          <NavButton
            icon={<FaHome />}
            label="Home"
            active={currentPage === 'HomePage'}
            onClick={() => setCurrentPage('HomePage')}
          />
          <NavButton
            icon={<FaBook />}
            label="Study"
            active={currentPage === 'StudyPage'}
            onClick={() => setCurrentPage('StudyPage')}
          />
          <NavButton
            icon={<FaStore />}
            label="Shop"
            active={currentPage === 'ShopPage'}
            onClick={() => setCurrentPage('ShopPage')}
          />
          <NavButton
            icon={<FaBoxOpen />}
            label="Inventory"
            active={currentPage === 'InventoryPage'}
            onClick={() => setCurrentPage('InventoryPage')}
          />
        </div>
      </nav>
    </div>
  );
}

export default App;

function NavButton({ icon, label, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`flex h-full w-20 flex-col items-center justify-center gap-1 text-xs font-medium transition ${
        active ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
      }`}
    >
      <span className={`text-2xl ${active ? 'text-slate-900' : 'text-slate-400'}`}>{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}
