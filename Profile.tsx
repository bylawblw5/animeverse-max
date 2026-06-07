import { usePlayer } from '../context/PlayerContext';
import { calculateLevel, getRank, getNextRank } from '../data/questions';

export function Profile() {
  const { account, player, setName, setAvatar } = usePlayer();
  const level = calculateLevel(player.xp);
  const rank = getRank(player.xp);
  const nextRank = getNextRank(player.xp);
  const progressToNextRank = nextRank
    ? ((player.xp - rank.min) / (nextRank.min - rank.min)) * 100
    : 100;
  const accuracy = player.totalAnswered > 0
    ? Math.round((player.correctAnswered / player.totalAnswered) * 100)
    : 0;

  const name = account?.name || 'ضيف';
  const avatar = account?.avatar || '🥷';
  const email = account?.email;
  const provider = account?.provider;
  const createdAt = account?.createdAt;

  const avatars = ['🥷', '⚔️', '👹', '🐉', '🦊', '🔥', '⚡', '🌸', '🎌', '🗡️', '🧙‍♂️', '🦁', '🐺', '🦅', '🐲'];

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black text-white mb-6 text-center">👤 الملف الشخصي</h1>

      <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/40 mb-6">
        <div className="flex flex-col items-center">
          <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${rank.color} p-1 shadow-2xl mb-4`}>
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-7xl">{avatar}</div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full w-12 h-12 flex items-center justify-center font-black text-white border-2 border-slate-900">{level}</div>
          </div>

          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="text-2xl font-black text-white bg-transparent border-b-2 border-purple-500 text-center outline-none px-4 py-2 mb-2"
            maxLength={20}
          />

          {provider === 'google' && (
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-gray-300 mb-2">
              <span>🔗</span> متصل عبر Google
            </div>
          )}
          {provider === 'guest' && (
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-xs text-orange-300 mb-2">
              <span>👤</span> حساب ضيف
            </div>
          )}
          {email && (
            <div className="text-xs text-gray-400 mb-2">{email}</div>
          )}

          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${rank.color} text-white font-bold mb-4`}>
            {rank.icon} {rank.name}
          </div>

          {nextRank && (
            <div className="w-full max-w-sm">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{rank.name}</span>
                <span>{nextRank.name}</span>
              </div>
              <div className="h-3 rounded-full bg-black/40 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${nextRank.color} transition-all`} style={{ width: `${progressToNextRank}%` }} />
              </div>
              <div className="text-center text-xs text-gray-400 mt-1">{nextRank.min - player.xp} XP للرتبة التالية</div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 mb-6">
        <h3 className="text-white font-bold mb-3">🎭 اختر شخصيتك</h3>
        <div className="grid grid-cols-5 gap-2">
          {avatars.map(a => (
            <button key={a} onClick={() => setAvatar(a)} className={`aspect-square rounded-xl text-4xl flex items-center justify-center transition-all ${avatar === a ? 'bg-gradient-to-br from-purple-600 to-pink-600 scale-110 shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}>
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="XP" value={player.xp.toLocaleString()} icon="⚡" color="purple" />
        <StatCard label="المستوى" value={level.toString()} icon="⭐" color="yellow" />
        <StatCard label="سلسلة" value={player.bestStreak.toString()} icon="🔥" color="red" />
        <StatCard label="دقة" value={`${accuracy}%`} icon="🎯" color="cyan" />
        <StatCard label="إجابات" value={player.totalAnswered.toString()} icon="✅" color="green" />
        <StatCard label="صحيحة" value={player.correctAnswered.toString()} icon="💯" color="emerald" />
        <StatCard label="انتصارات" value={player.wins.toString()} icon="🏆" color="orange" />
        <StatCard label="خسائر" value={player.losses.toString()} icon="💀" color="slate" />
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30">
        <h3 className="text-white font-bold mb-3">📊 معلومات إضافية</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-300"><span>🗼 أعلى طابق</span><span className="text-white font-bold">{player.towerFloor}</span></div>
          <div className="flex justify-between text-gray-300"><span>💯 جولات كاملة</span><span className="text-white font-bold">{player.perfectGames}</span></div>
          <div className="flex justify-between text-gray-300"><span>🏅 إنجازات مفتوحة</span><span className="text-white font-bold">{player.unlockedAchievements.length}</span></div>
          <div className="flex justify-between text-gray-300"><span>📅 تاريخ الانضمام</span><span className="text-white font-bold">{createdAt ? new Date(createdAt).toLocaleDateString('ar') : '-'}</span></div>
          <div className="flex justify-between text-gray-300"><span>🔐 نوع الحساب</span><span className="text-white font-bold">{provider === 'google' ? 'Google' : provider === 'local' ? 'بريد إلكتروني' : 'ضيف'}</span></div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  const colors: any = {
    purple: 'from-purple-500/20 to-purple-900/40 border-purple-500/30',
    yellow: 'from-yellow-500/20 to-yellow-900/40 border-yellow-500/30',
    red: 'from-red-500/20 to-red-900/40 border-red-500/30',
    cyan: 'from-cyan-500/20 to-cyan-900/40 border-cyan-500/30',
    green: 'from-green-500/20 to-green-900/40 border-green-500/30',
    emerald: 'from-emerald-500/20 to-emerald-900/40 border-emerald-500/30',
    orange: 'from-orange-500/20 to-orange-900/40 border-orange-500/30',
    slate: 'from-slate-500/20 to-slate-900/40 border-slate-500/30',
  };
  return (
    <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} border text-center`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-black text-white">{value}</div>
      <div className="text-[10px] text-gray-400">{label}</div>
    </div>
  );
}
