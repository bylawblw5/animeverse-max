import { useMemo } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { getRank } from '../data/questions';
import { getAccounts } from '../data/accounts';

export function Leaderboard() {
  const { account, player } = usePlayer();
  const playerRank = getRank(player.xp);
  const playerName = account?.name || 'ضيف';
  const playerAvatar = account?.avatar || '🥷';

  // جلب كل الحسابات الحقيقية المسجلة على هذا الجهاز
  const realAccounts = useMemo(() => {
    return getAccounts()
      .filter(a => a.player.xp > 0 || a.player.totalAnswered > 0) // فقط اللي لعبوا
      .sort((a, b) => b.player.xp - a.player.xp)
      .map((a, i) => ({
        rank: i + 1,
        id: a.id,
        name: a.name,
        avatar: a.avatar,
        xp: a.player.xp,
        wins: a.player.wins,
        streak: a.player.bestStreak,
        provider: a.provider,
        isPlayer: a.id === account?.id,
      }));
  }, [account?.id, player.xp]); // إعادة الحساب عند تغيير XP

  // إذا كان المستخدم الحالي لم يظهر بعد (لأنه ما لعب)، ضعه في النهاية
  const currentUserInList = realAccounts.find(u => u.isPlayer);
  const displayList = currentUserInList
    ? realAccounts
    : [...realAccounts, {
        rank: realAccounts.length + 1,
        id: account?.id || '',
        name: playerName,
        avatar: playerAvatar,
        xp: player.xp,
        wins: player.wins,
        streak: player.bestStreak,
        provider: account?.provider || 'guest',
        isPlayer: true,
      }];

  const top3 = displayList.slice(0, 3);
  const rest = displayList.slice(3);

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">🏆</div>
        <h1 className="text-3xl font-black text-white mb-1">قاعة الترتيب</h1>
        <p className="text-gray-400 text-sm">ترتيب اللاعبين الحقيقيين</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
          <div className="text-2xl font-black text-purple-300">{displayList.length}</div>
          <div className="text-xs text-gray-400">عدد اللاعبين</div>
        </div>
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
          <div className="text-2xl font-black text-yellow-300">
            {displayList.reduce((sum, u) => sum + u.xp, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">إجمالي XP</div>
        </div>
        <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
          <div className="text-2xl font-black text-orange-300">
            {displayList.reduce((sum, u) => sum + u.wins, 0)}
          </div>
          <div className="text-xs text-gray-400">إجمالي الانتصارات</div>
        </div>
      </div>

      {displayList.length === 0 || (displayList.length === 1 && player.xp === 0) ? (
        // حالة فارغة
        <div className="p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-purple-900/40 border border-purple-500/30 text-center">
          <div className="text-7xl mb-4 animate-bounce">🎮</div>
          <h2 className="text-2xl font-bold text-white mb-2">الترتيب فارغ!</h2>
          <p className="text-gray-400 mb-6">
            كن أول لاعب يفتح قائمة الترتيب!
            <br />
            ابدأ اللعب واكسب XP لتظهر هنا
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 text-sm">
            <span>💡</span>
            <span>ادعُ أصدقاءك للمنافسة</span>
          </div>
        </div>
      ) : (
        <>
          {/* Top 3 */}
          {top3.length >= 1 && (
            <div className="grid grid-cols-3 gap-3 mb-6 items-end">
              {top3.map((user, i) => {
                const order = i === 0 ? 1 : i === 1 ? 0 : 2;
                const isTop = order === 1;
                return (
                  <div
                    key={user.id + i}
                    className={`relative rounded-2xl p-3 text-center ${
                      isTop ? 'bg-gradient-to-b from-yellow-500/30 to-amber-900/40 border-2 border-yellow-500' :
                      order === 0 ? 'bg-gradient-to-b from-slate-400/30 to-slate-900/40 border border-slate-400' :
                      'bg-gradient-to-b from-amber-700/30 to-amber-900/40 border border-amber-700'
                    } ${user.isPlayer ? 'ring-2 ring-purple-500' : ''}`}
                  >
                    {isTop && <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">👑</div>}
                    <div className="text-4xl mb-2">{user.avatar}</div>
                    <div className={`text-xs font-bold truncate ${user.isPlayer ? 'text-purple-300' : 'text-white'}`}>
                      {user.name}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">{user.xp.toLocaleString()} XP</div>
                    <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white ${
                      isTop ? 'bg-yellow-500' : order === 0 ? 'bg-slate-400' : 'bg-amber-700'
                    }`}>
                      {user.rank}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Rest */}
          {rest.length > 0 && (
            <div className="space-y-2">
              {rest.map(user => {
                const rank = getRank(user.xp);
                return (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      user.isPlayer
                        ? 'bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-purple-500 shadow-lg'
                        : 'bg-black/40 border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${rank.color} flex items-center justify-center text-xs font-black text-white flex-shrink-0`}>
                      {user.rank}
                    </div>
                    <div className="text-3xl flex-shrink-0">{user.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold truncate ${user.isPlayer ? 'text-purple-300' : 'text-white'}`}>
                          {user.name}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r ${rank.color} text-white`}>
                          {rank.icon}
                        </span>
                        {user.provider === 'google' && <span className="text-[10px]">🔗</span>}
                      </div>
                      <div className="text-xs text-gray-400">🏆 {user.wins} | 🔥 {user.streak}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-yellow-300 font-bold text-sm">{user.xp.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-400">XP</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Your stats */}
      <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/40">
        <h3 className="text-white font-bold mb-3">📊 ترتيبك الحالي</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl font-black text-purple-300">
              #{displayList.findIndex(u => u.isPlayer) + 1 || '-'}
            </div>
            <div className="text-xs text-gray-400">الترتيب</div>
          </div>
          <div>
            <div className="text-2xl font-black text-yellow-300">{player.xp.toLocaleString()}</div>
            <div className="text-xs text-gray-400">XP</div>
          </div>
          <div>
            <div className="text-2xl font-black">
              <span className={`bg-gradient-to-r ${playerRank.color} bg-clip-text text-transparent`}>
                {playerRank.icon}
              </span>
            </div>
            <div className="text-xs text-gray-400">الرتبة</div>
          </div>
        </div>
      </div>

      {/* Invite CTA */}
      <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🤝</div>
          <div className="flex-1">
            <div className="text-white font-bold mb-1">ادعُ أصدقاءك للمنافسة!</div>
            <div className="text-sm text-gray-300">شارك الرابط مع أصدقائك وابدؤوا المنافسة على الترتيب</div>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('تم نسخ الرابط! شاركه مع أصدقائك 🔗');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600"
          >
            نسخ الرابط
          </button>
        </div>
      </div>
    </div>
  );
}
