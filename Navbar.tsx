import { usePlayer } from '../context/PlayerContext';
import { calculateLevel, getRank, getNextRank } from '../data/questions';

type Page = 'home' | 'arena' | 'tower' | 'leaderboard' | 'profile' | 'daily' | 'achievements' | 'shop';

export function Navbar({ currentPage, setPage, onLogout }: { currentPage: Page; setPage: (p: Page) => void; onLogout: () => void }) {
  const { account, player } = usePlayer();
  const level = calculateLevel(player.xp);
  const rank = getRank(player.xp);
  const nextRank = getNextRank(player.xp);
  const progressToNextRank = nextRank
    ? ((player.xp - rank.min) / (nextRank.min - rank.min)) * 100
    : 100;

  const name = account?.name || 'ضيف';
  const avatar = account?.avatar || '🥷';

  const items: { id: Page; label: string; icon: string }[] = [
    { id: 'home', label: 'المدينة', icon: '🏙️' },
    { id: 'arena', label: 'الساحة', icon: '⚔️' },
    { id: 'tower', label: 'البرج', icon: '🗼' },
    { id: 'daily', label: 'المهام', icon: '🎁' },
    { id: 'leaderboard', label: 'الترتيب', icon: '🏆' },
    { id: 'achievements', label: 'الإنجازات', icon: '🏅' },
    { id: 'shop', label: 'المتجر', icon: '💰' },
    { id: 'profile', label: 'ملفي', icon: '👤' },
  ];

  return (
    <>
      {/* Top HUD */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-purple-500/30 px-3 py-2 md:px-6">
        <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <div className="text-2xl md:text-3xl flex-shrink-0 animate-pulse">{avatar}</div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm md:text-base truncate">{name}</span>
                <span className={`px-1.5 py-0.5 text-[10px] md:text-xs rounded bg-gradient-to-r ${rank.color} text-white font-bold`}>
                  {rank.icon} {rank.name}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-purple-300">Lv.{level}</span>
                <div className="flex-1 h-1.5 w-20 md:w-32 bg-purple-900/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${progressToNextRank}%` }}
                  />
                </div>
                <span className="text-xs text-purple-300 hidden md:inline">{player.xp} XP</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full">
              <span>🪙</span>
              <span className="text-orange-300 font-bold text-xs md:text-sm">{player.coins}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 border border-red-500/50 rounded-full">
              <span>🔥</span>
              <span className="text-red-300 font-bold text-xs md:text-sm">{player.currentStreak}</span>
            </div>
            <button
              onClick={onLogout}
              title="تسجيل الخروج"
              className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-300 hover:bg-red-500/40 transition-colors text-sm"
            >
              ⏻
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-purple-500/30">
        <div className="flex items-center justify-around max-w-5xl mx-auto overflow-x-auto">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex flex-col items-center justify-center px-2 md:px-4 py-2 min-w-[56px] transition-all ${
                currentPage === item.id
                  ? 'text-purple-300 scale-110'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="text-lg md:text-xl">{item.icon}</span>
              <span className="text-[9px] md:text-xs mt-0.5 whitespace-nowrap">{item.label}</span>
              {currentPage === item.id && (
                <div className="absolute top-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
