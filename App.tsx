import { useState } from 'react';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Arena } from './pages/Arena';
import { Tower } from './pages/Tower';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { Daily } from './pages/Daily';
import { Achievements } from './pages/Achievements';
import { Shop } from './pages/Shop';
import { Login } from './pages/Login';

type Page = 'home' | 'arena' | 'tower' | 'leaderboard' | 'profile' | 'daily' | 'achievements' | 'shop';

function AppInner() {
  const { account, logout } = usePlayer();
  const [page, setPage] = useState<Page>('home');
  const [authKey, setAuthKey] = useState(0);

  const handleLogout = () => {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      logout();
      setAuthKey(k => k + 1);
    }
  };

  if (!account) {
    return (
      <Login
        key={authKey}
        onSuccess={() => setAuthKey(k => k + 1)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white" dir="rtl">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Navbar currentPage={page} setPage={setPage} onLogout={handleLogout} />

      <main>
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'arena' && <Arena />}
        {page === 'tower' && <Tower />}
        {page === 'leaderboard' && <Leaderboard />}
        {page === 'profile' && <Profile />}
        {page === 'daily' && <Daily />}
        {page === 'achievements' && <Achievements />}
        {page === 'shop' && <Shop />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <AppInner />
    </PlayerProvider>
  );
}
