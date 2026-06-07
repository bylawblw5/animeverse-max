import { usePlayer } from '../context/PlayerContext';


const DAILY_TASKS = [
  { id: 'answer_10', title: 'أجب على 10 أسئلة', desc: 'اكسب XP من الإجابات', icon: '📝', reward: 100, xp: 50 },
  { id: 'win_arena', title: 'الفوز في ساحة', desc: 'اكسب مباراة واحدة', icon: '⚔️', reward: 150, xp: 75 },
  { id: 'climb_tower', title: 'اصعد 3 طوابق', desc: 'تقدم في البرج', icon: '🗼', reward: 200, xp: 100 },
  { id: 'streak_5', title: 'سلسلة 5', desc: 'حقق 5 إجابات متتالية', icon: '🔥', reward: 120, xp: 60 },
  { id: 'play_30min', title: 'العب 30 دقيقة', desc: 'قضي وقت في المنصة', icon: '⏰', reward: 80, xp: 40 },
  { id: 'perfect_round', title: 'جولة مثالية', desc: 'بدون أخطاء', icon: '💯', reward: 300, xp: 150 },
];

export function Daily() {
  const { player, markDailyDone, addXP: addXp } = usePlayer();

  const claimTask = (task: typeof DAILY_TASKS[0]) => {
    if (player.dailyCompleted.includes(task.id)) return;
    addXp(task.xp);
    markDailyDone(task.id);
  };

  const completedCount = player.dailyCompleted.length;

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-6xl mb-2 animate-bounce">🎁</div>
        <h1 className="text-3xl font-black text-white mb-1">المهام اليومية</h1>
        <p className="text-gray-400 text-sm">جوائز جديدة كل 24 ساعة!</p>
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 mb-6 flex items-center justify-between">
        <div>
          <div className="text-white font-bold">📈 التقدم اليومي</div>
          <div className="text-sm text-gray-300">{completedCount} من {DAILY_TASKS.length} مهام</div>
        </div>
        <div className="text-3xl font-black text-emerald-300">
          {Math.round((completedCount / DAILY_TASKS.length) * 100)}%
        </div>
      </div>

      <div className="space-y-3">
        {DAILY_TASKS.map(task => {
          const done = player.dailyCompleted.includes(task.id);
          return (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all ${
                done
                  ? 'bg-green-500/10 border-green-500/30 opacity-70'
                  : 'bg-gradient-to-br from-slate-900 to-purple-900/40 border-purple-500/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl flex-shrink-0">{task.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold">{task.title}</h3>
                    {done && <span className="text-green-400">✓</span>}
                  </div>
                  <p className="text-sm text-gray-400">{task.desc}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className="text-yellow-300">🪙 +{task.reward}</span>
                    <span className="text-purple-300">⚡ +{task.xp} XP</span>
                  </div>
                </div>
                <button
                  onClick={() => claimTask(task)}
                  disabled={done}
                  className={`px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0 ${
                    done
                      ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 transition-transform'
                  }`}
                >
                  {done ? '✓ مُكتمل' : 'ادعاء'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-yellow-500/30">
        <div className="text-yellow-300 font-bold mb-2">🎯 نصيحة</div>
        <p className="text-sm text-gray-300">
          أكمل كل المهام اليومية لكسب مكافأة إضافية قدرها 500 XP! يتم تجديد المهام كل 24 ساعة.
        </p>
      </div>
    </div>
  );
}
