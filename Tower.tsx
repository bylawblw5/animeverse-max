import { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { QUESTIONS, Question } from '../data/questions';

export function Tower() {
  const { player, recordAnswer, advanceTower } = usePlayer();
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState<Question | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [floorProgress, setFloorProgress] = useState(0); // questions answered in current floor
  const [floorCorrect, setFloorCorrect] = useState(0);
  const [showFloorClear, setShowFloorClear] = useState(false);
  const [showFloorFail, setShowFloorFail] = useState(false);

  const QUESTIONS_PER_FLOOR = 5;
  const REQUIRED_CORRECT = 3;
  const isBossFloor = player.towerFloor % 10 === 0;
  const requiredDifficulty: 1 | 2 | 3 | 4 | 5 = isBossFloor
    ? Math.min(5, Math.max(3, Math.floor(player.towerFloor / 10))) as any
    : Math.min(5, Math.max(1, Math.floor(player.towerFloor / 5))) as any;

  const nextQuestion = () => {
    const pool = QUESTIONS.filter(q => q.difficulty >= requiredDifficulty);
    const q = pool[Math.floor(Math.random() * pool.length)] || QUESTIONS[0];
    setCurrent(q);
    setSelected(null);
  };

  const startFloor = () => {
    setPlaying(true);
    setFloorProgress(0);
    setFloorCorrect(0);
    nextQuestion();
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null || !current) return;
    setSelected(idx);
    const isCorrect = idx === current.correct;
    recordAnswer(isCorrect, current.xp);
    if (isCorrect) setFloorCorrect(c => c + 1);

    setTimeout(() => {
      const newProgress = floorProgress + 1;
      if (newProgress >= QUESTIONS_PER_FLOOR) {
        const totalCorrect = floorCorrect + (isCorrect ? 1 : 0);
        if (totalCorrect >= REQUIRED_CORRECT) {
          advanceTower();
          setShowFloorClear(true);
        } else {
          setShowFloorFail(true);
        }
        setPlaying(false);
      } else {
        setFloorProgress(newProgress);
        nextQuestion();
      }
    }, 1200);
  };

  if (showFloorClear) {
    return (
      <div className="min-h-screen pt-24 pb-24 px-4 max-w-2xl mx-auto">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-yellow-900/40 via-orange-900/40 to-red-900/40 border border-yellow-500/50 text-center">
          <div className="text-8xl mb-4 animate-bounce">🎊</div>
          <h1 className="text-4xl font-black text-white mb-2">الطابق {player.towerFloor - 1} مُكتمل!</h1>
          <p className="text-gray-300 mb-6">
            {isBossFloor ? '🔥 هزمت الزعيم!' : 'استمر في الصعود!'}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-black/40">
              <div className="text-3xl font-black text-green-400">{floorCorrect}/{QUESTIONS_PER_FLOOR}</div>
              <div className="text-xs text-gray-400 mt-1">إجابات صحيحة</div>
            </div>
            <div className="p-4 rounded-xl bg-black/40">
              <div className="text-3xl font-black text-yellow-400">+{isBossFloor ? 100 : 30} XP</div>
              <div className="text-xs text-gray-400 mt-1">مكافأة الطابق</div>
            </div>
          </div>
          <button
            onClick={() => { setShowFloorClear(false); }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold"
          >
            الطابق التالي ←
          </button>
        </div>
      </div>
    );
  }

  if (showFloorFail) {
    return (
      <div className="min-h-screen pt-24 pb-24 px-4 max-w-2xl mx-auto">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-red-900/40 to-slate-900 border border-red-500/50 text-center">
          <div className="text-8xl mb-4">💀</div>
          <h1 className="text-4xl font-black text-white mb-2">فشلت!</h1>
          <p className="text-gray-300 mb-6">أجبت على {floorCorrect}/{QUESTIONS_PER_FLOOR} بشكل صحيح (مطلوب {REQUIRED_CORRECT})</p>
          <button
            onClick={() => { setShowFloorFail(false); }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold"
          >
            🔄 إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!playing) {
    return (
      <div className="min-h-screen pt-24 pb-24 px-4 max-w-3xl mx-auto">
        {/* Tower visualization */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2">🗼 برج الأسئلة</h1>
          <p className="text-gray-400">اصعد الطوابق وواجه تحديات أصعب</p>
        </div>

        <div className="relative mb-8 p-8 rounded-3xl bg-gradient-to-b from-indigo-900/40 via-purple-900/40 to-pink-900/40 border border-purple-500/40 overflow-hidden">
          {/* Stars background */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}

          <div className="relative text-center">
            <div className="text-7xl mb-4">{isBossFloor ? '👹' : '🏯'}</div>
            <div className="text-6xl font-black text-white mb-2">
              {player.towerFloor}
            </div>
            <div className="text-purple-300 font-bold mb-1">
              {isBossFloor ? `طابق الزعيم #${Math.floor(player.towerFloor / 10)}` : 'طابق عادي'}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300">
                صعوبة: {'⭐'.repeat(requiredDifficulty)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
            <span className="text-gray-300">🎯 الأسئلة المطلوبة</span>
            <span className="text-white font-bold">{QUESTIONS_PER_FLOOR} أسئلة</span>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
            <span className="text-gray-300">✅ الإجابات الصحيحة المطلوبة</span>
            <span className="text-green-400 font-bold">{REQUIRED_CORRECT} من {QUESTIONS_PER_FLOOR}</span>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
            <span className="text-gray-300">🎁 المكافأة</span>
            <span className="text-yellow-400 font-bold">+{isBossFloor ? 100 : 30} XP</span>
          </div>
          {isBossFloor && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50">
              <div className="text-red-300 font-bold">⚠️ طابق زعيم!</div>
              <div className="text-sm text-gray-300 mt-1">أسئلة صعبة جداً - استعد جيداً</div>
            </div>
          )}
        </div>

        <button
          onClick={startFloor}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-black text-xl shadow-2xl hover:scale-[1.02] transition-transform"
        >
          🗼 ابدأ صعود الطابق {player.towerFloor}
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="text-gray-300">🗼 الطابق {player.towerFloor}</span>
        <span className="text-yellow-300">
          {floorProgress + 1}/{QUESTIONS_PER_FLOOR} | ✅ {floorCorrect}
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-yellow-500 to-red-500 transition-all"
          style={{ width: `${((floorProgress) / QUESTIONS_PER_FLOOR) * 100}%` }}
        />
      </div>

      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-purple-900 border border-purple-500/40 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">
            {'⭐'.repeat(current.difficulty)}
          </span>
          {isBossFloor && (
            <span className="px-2 py-1 rounded-full bg-red-500/30 text-red-300 text-xs animate-pulse">
              👹 زعيم
            </span>
          )}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">{current.question}</h2>
      </div>

      <div className="space-y-3">
        {current.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === current.correct;
          const showResult = selected !== null;
          let cls = 'bg-white/5 border-white/10 hover:bg-white/10 text-white';
          if (showResult) {
            if (isCorrect) cls = 'bg-green-500/20 border-green-500 text-green-200';
            else if (isSelected) cls = 'bg-red-500/20 border-red-500 text-red-200';
            else cls = 'bg-white/5 border-white/10 text-gray-500';
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              className={`w-full p-4 rounded-2xl border-2 text-right font-bold ${cls}`}
            >
              <span className="inline-block w-8 h-8 rounded-full bg-black/40 text-center leading-8 text-sm mr-3">
                {['أ', 'ب', 'ج', 'د'][i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
