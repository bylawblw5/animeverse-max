import { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { QUESTIONS, CATEGORIES_INFO, calculateLevel, getRank } from '../data/questions';

type Page = 'home' | 'arena' | 'tower' | 'leaderboard' | 'profile' | 'daily' | 'achievements' | 'shop';

export function Home({ setPage }: { setPage: (p: Page) => void }) {
  const { account, player } = usePlayer();
  const [onlineCount] = useState(() => 1234 + Math.floor(Math.random() * 5000));
  const level = calculateLevel(player.xp);
  const rank = getRank(player.xp);

  const name = account?.name || 'ضيف';
  const avatar = account?.avatar || '🥷';

  const stats = [
    { label: 'الأسئلة المتاحة', value: QUESTIONS.length + '+', icon: '📚' },
    { label: 'التصنيفات', value: Object.keys(CATEGORIES_INFO).length, icon: '🎯' },
    { label: 'المستويات', value: '∞', icon: '🗼' },
  ];

  const modes = [
    { id: 'arena' as Page, title: 'ساحة التحدي', desc: 'مباريات سريعة بزمن محدد', icon: '⚔️', gradient: 'from-red-600 via-orange-600 to-yellow-500', glow: 'shadow-red-500/50' },
    { id: 'tower' as Page, title: 'برج الأسئلة', desc: `الطابق ${player.towerFloor} بانتظارك`, icon: '🗼', gradient: 'from-purple-600 via-fuchsia-600 to-pink-500', glow: 'shadow-purple-500/50' },
    { id: 'daily' as Page, title: 'المهام اليومية', desc: 'جوائز XP وعملات مجانية', icon: '🎁', gradient: 'from-emerald-500 via-teal-500 to-cyan-500', glow: 'shadow-emerald-500/50' },
    { id: 'leaderboard' as Page, title: 'قاعة الترتيب', desc: 'أفضل اللاعبين في العالم', icon: '🏆', gradient: 'from-yellow-500 via-amber-500 to-orange-500', glow: 'shadow-yellow-500/50' },
  ];

  return (
    <div className="relative min-h-screen pt-20 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative mb-8 p-6 md:p-10 rounded-3xl bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-pink-900/40 border border-purple-500/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_50%)]" />
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 2}s` }} />
        ))}

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 text-xs font-bold animate-pulse">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                {onlineCount.toLocaleString()} متصل الآن
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 text-xs font-bold">
                🎌 AnimeVerse MAX
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
              أهلاً بعودتك، <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{name}</span>!
            </h1>
            <p className="text-gray-300 text-sm md:text-base mb-4">
              عالم الأنمي ينتظرك. اكسب XP، ارتقِ بترتبتك، وأصبح أسطورة!
            </p>
            <div className="flex flex-wrap gap-3">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/30 border border-white/10">
                  <span className="text-xl">{s.icon}</span>
                  <div>
                    <div className="text-xs text-gray-400">{s.label}</div>
                    <div className="text-white font-bold">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex-shrink-0">
            <div className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br ${rank.color} p-1 shadow-2xl ${rank.name === 'Legend' ? 'animate-pulse' : ''}`}>
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-6xl md:text-7xl">
                {avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full w-10 h-10 flex items-center justify-center text-sm font-black text-white border-2 border-slate-900">
                {level}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🎮</span>
        <span>أنماط اللعب</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {modes.map(mode => (
          <button key={mode.id} onClick={() => setPage(mode.id)} className={`group relative overflow-hidden rounded-2xl p-6 text-right transition-all hover:scale-[1.02] hover:shadow-2xl ${mode.glow}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-90`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_50%)]" />
            <div className="absolute -right-8 -bottom-8 text-[140px] opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">{mode.icon}</div>
            <div className="relative">
              <div className="text-5xl mb-3 drop-shadow-lg">{mode.icon}</div>
              <h3 className="text-2xl font-black text-white mb-1 drop-shadow-lg">{mode.title}</h3>
              <p className="text-white/90 text-sm">{mode.desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black/30 rounded-full text-white text-sm font-bold">
                ادخل الآن
                <span className="group-hover:translate-x-[-4px] transition-transform">←</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><span>📢</span> آخر الأخبار</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2"><span className="text-yellow-400">🎉</span><span>أضفنا 50 سؤال جديد عن Jujutsu Kaisen!</span></li>
            <li className="flex items-start gap-2"><span className="text-red-400">🔥</span><span>بطولة الأسبوع تبدأ يوم الجمعة</span></li>
            <li className="flex items-start gap-2"><span className="text-green-400">✨</span><span>رتبة Legend الجديدة متاحة الآن</span></li>
          </ul>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-900/40 to-rose-900/40 border border-pink-500/30">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><span>💡</span> نصيحة اليوم</h3>
          <p className="text-sm text-gray-300 leading-relaxed">السلسلة الانتصارية تزيد من XP الذي تحصل عليه! حاول الإجابة على 10 أسئلة متتالية صحيحة للحصول على مكافأة مضاعفة.</p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs text-pink-300">
            <span>سلسلتك الحالية:</span>
            <span className="px-2 py-1 bg-red-500/30 rounded-full font-bold">🔥 {player.currentStreak}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
