import { usePlayer } from '../context/PlayerContext';
import { ACHIEVEMENTS } from '../data/questions';

export function Achievements() {
  const { player } = usePlayer();
  const unlocked = player.unlockedAchievements;

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">🏅</div>
        <h1 className="text-3xl font-black text-white mb-1">الإنجازات</h1>
        <p className="text-gray-400 text-sm">{unlocked.length} من {ACHIEVEMENTS.length} مفتوح</p>
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold">📊 نسبة الإكمال</span>
          <span className="text-yellow-300 font-black">
            {Math.round((unlocked.length / ACHIEVEMENTS.length) * 100)}%
          </span>
        </div>
        <div className="h-3 rounded-full bg-black/40 overflow-hidden mt-2">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all"
            style={{ width: `${(unlocked.length / ACHIEVEMENTS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map(ach => {
          const isUnlocked = unlocked.includes(ach.id);
          return (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border text-center transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50'
                  : 'bg-black/40 border-white/10 opacity-50 grayscale'
              }`}
            >
              <div className={`text-5xl mb-2 ${isUnlocked ? 'animate-pulse' : ''}`}>
                {isUnlocked ? ach.icon : '🔒'}
              </div>
              <h3 className="text-white font-bold text-sm mb-1">{ach.name}</h3>
              <p className="text-[11px] text-gray-400">{ach.desc}</p>
              {isUnlocked && (
                <div className="mt-2 text-[10px] text-yellow-300 font-bold">✓ مُكتمل</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
