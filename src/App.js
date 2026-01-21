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

const API_BASE = 'https://study-timer-backend.onrender.com';

export function App() {
  const [googleId, setGoogleId] = useState(null);
  const [username, setUsername] = useState('Guest');
  const [gold, setGold] = useState(1000);
  const [streaks, setStreaks] = useState({
    small: 0,
    medium: 0,
    large: 0,
  });
  const [displayStreak, setDisplayStreak] = useState(0);
  const [allChimera, setAllChimera] = useState([]);
  const [displaySeed, setDisplaySeed] = useState(null);

  const loadUserData = async (id) => {
    try {
      const [userRes, streakRes, chimeraRes] = await Promise.all([
        fetch(`${API_BASE}/api/user/${id}`),
        fetch(`${API_BASE}/api/streaks/${id}`),
        fetch(`${API_BASE}/api/chimera/${id}`),
      ]);

      if (userRes.status === 404) {
        localStorage.removeItem('user');
        setGoogleId(null);
        setUsername('Guest');
        setGold(1000);
        setStreaks({ small: 0, medium: 0, large: 0 });
        setAllChimera([]);
        setDisplaySeed(null);
        return;
      }

      if (userRes.ok) {
        const data = await userRes.json();
        if (data.user) {
          setUsername(data.user.name || 'Guest');
          setGold(Number.isFinite(data.user.gold) ? data.user.gold : 0);
        }
      }

      if (streakRes.ok) {
        const data = await streakRes.json();
        if (data.streaks) {
          setStreaks({
            small: data.streaks.small || 0,
            medium: data.streaks.medium || 0,
            large: data.streaks.large || 0,
          });
        }
      }

      if (chimeraRes.ok) {
        const data = await chimeraRes.json();
        setAllChimera(Array.isArray(data.chimera) ? data.chimera : []);
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    try {
      const parsed = JSON.parse(storedUser);
      if (parsed?.google_id) {
        setGoogleId(parsed.google_id);
        setUsername(parsed.name || 'Guest');
        setGold(Number.isFinite(parsed.gold) ? parsed.gold : 0);
        loadUserData(parsed.google_id);
      }
    } catch (error) {
      console.error('Failed to parse stored user:', error);
    }
  }, []);

  useEffect(() => {
    if (!googleId) return;
    localStorage.setItem(
      'user',
      JSON.stringify({
        google_id: googleId,
        name: username,
        gold,
      })
    );
  }, [googleId, username, gold]);

  function handleUserLogin(userData) {
    if (!userData?.google_id) return;
    setGoogleId(userData.google_id);
    setUsername(userData.name || 'Guest');
    setGold(Number.isFinite(userData.gold) ? userData.gold : 0);
    setStreaks({ small: 0, medium: 0, large: 0 });
    setAllChimera([]);
    setDisplaySeed(null);
    loadUserData(userData.google_id);
  }

  async function syncGold(nextGold) {
    if (!googleId) return;
    try {
      await fetch(`${API_BASE}/api/user/gold`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ google_id: googleId, gold: nextGold }),
      });
    } catch (error) {
      console.error('Failed to update gold:', error);
    }
  }

  async function syncStreaks(nextStreaks) {
    if (!googleId) return;
    try {
      await fetch(`${API_BASE}/api/streaks/${googleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nextStreaks),
      });
    } catch (error) {
      console.error('Failed to update streaks:', error);
    }
  }

  async function addChimera(seed) {
    if (!googleId) return;
    try {
      await fetch(`${API_BASE}/api/chimera`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ google_id: googleId, seed }),
      });
    } catch (error) {
      console.error('Failed to save chimera:', error);
    }
  }

  function finishSmallStudy() {
    const newStreaks = streakCalculator(streaks, 'small');
    const newGold = gold + studyTimeToGoldSmall(newStreaks.small);
    setDisplayStreak(newStreaks.small);
    setStreaks(newStreaks);
    setGold(newGold);
    syncGold(newGold);
    syncStreaks(newStreaks);
  }

  function finishMediumStudy() {
    const newStreaks = streakCalculator(streaks, 'medium');
    const newGold = gold + studyTimeToGoldMedium(newStreaks.medium);
    setDisplayStreak(newStreaks.medium);
    setStreaks(newStreaks);
    setGold(newGold);
    syncGold(newGold);
    syncStreaks(newStreaks);
  }

  function finishLargeStudy() {
    const newStreaks = streakCalculator(streaks, 'large');
    const newGold = gold + studyTimeToGoldLarge(newStreaks.large);
    setDisplayStreak(newStreaks.large);
    setStreaks(newStreaks);
    setGold(newGold);
    syncGold(newGold);
    syncStreaks(newStreaks);
  }

  function buyBasicChest() {
    if (!googleId) {
      alert('Please sign in before opening chests.');
      return;
    }

    if (gold < 100) {
      return;
    }

    const newGold = gold - 100;
    setGold(newGold);
    const gachaOutput = gachaCalculator('basic');
    const gachaSeed = gachaOutput['seed'];
    setAllChimera((prev) => [...prev, gachaSeed]);
    syncGold(newGold);
    addChimera(gachaSeed);
  }

  function buyAdvancedChest() {
    if (!googleId) {
      alert('Please sign in before opening chests.');
      return;
    }

    if (gold < 1000) {
      return;
    }

    const newGold = gold - 1000;
    setGold(newGold);
    const gachaOutput = gachaCalculator('advanced');
    const gachaSeed = gachaOutput['seed'];
    setAllChimera((prev) => [...prev, gachaSeed]);
    syncGold(newGold);
    addChimera(gachaSeed);
  }

  useEffect(() => {
    if (allChimera.length > 0 && !displaySeed) {
      setDisplaySeed(seedDecoder(allChimera[0]));
    }
  }, [allChimera, displaySeed]);

  let PageComponent;
  const [currentPage, setCurrentPage] = useState('HomePage');

  if (currentPage === 'HomePage') {
    PageComponent = (
      <HomePage
        username={username}
        gold={gold}
        onStartStudy={() => setCurrentPage('StudyPage')}
        seed={displaySeed}
        onUserLogin={handleUserLogin}
        isSignedIn={Boolean(googleId)}
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
  } else if (currentPage === 'InventoryPage') {
    PageComponent = <InventoryPage allChimera={allChimera} setDisplaySeed={setDisplaySeed} />;
  }

  const isInventoryPage = currentPage === 'InventoryPage';

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Welcome</div>
            <div className="text-sm font-semibold text-slate-900">{username}</div>
          </div>
          <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">Evo Study</h1>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
            <FaCoins className="text-amber-500" />
            {gold}
          </div>
        </div>
      </header>

      <main
        className={`flex-1 pb-20 ${
          isInventoryPage
            ? 'overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            : 'overflow-hidden'
        }`}
      >
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
