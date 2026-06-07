import { useState, useEffect, useMemo } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { QUESTIONS, Question } from '../data/questions';

type GamePhase = 'menu' | 'playing' | 'result';

export function Arena() {
  const { recordAnswer, recordWin, recordLoss } = usePlayer();
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [difficulty, setDifficulty] = useState<1 | 2 | 3 | 4 | 5>(2);
  const [questionCount, setQuestionCount] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const filteredQuestions = useMemo(
    () => QUESTIONS.filter(q => q.difficulty === difficulty),
    [difficulty]
  );

  const startGame = () => {
    const pool = filteredQuestions.length >= questionCount
      ? filteredQuestions
      : QUESTIONS;
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, questionCount);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setSelected(null);
    setTimeLeft(15);
    setStartTime(Date.now());
    setPhase('playing');
  };

  useEffect(() => {
    if (phase !== 'playing' || selected !== null) return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, selected]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const current = questions[currentIndex];
    const isCorrect = idx === current.correct;
    recordAnswer(isCorrect, current.xp);
    if (isCorrect) {
      setScore(s => s + current.xp + Math.floor(timeLeft * 2));
      setCorrectCount(c => c + 1);
    }
    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        setTotalTime(Math.floor((Date.now() - startTime) / 1000));
        const won = correctCount + (isCorrect ? 1 : 0) >= Math.ceil(questions.length / 2);
        if (won) recordWin(correctCount + (isCorrect ? 1 : 0) === questions.length);
        else recordLoss();
        setPhase('result');
      } else {
        setCurrentIndex(i => i + 1);
        setSelected(null);
        setTimeLeft(15);
      }
    }, 1200);
  };

  if (phase === 'menu') {
    return (
      <div className="relative min-h-screen pt-24 pb-24 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-bounce">⚔️</div>
          <h1 className="text-4xl font-black text-white mb-2">ساحة التحدي</h1>
          <p className="text-gray-400">اختبر سرعتك ودقتك في مباريات سريعة</p>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-red-900/40 to-orange-900/40 border border-red-500/30">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span>⚡</span> مستوى الصعوبة
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d as any)}
                  className={`py-3 rounded-xl font-bold transition-all ${
                    difficulty === d
                      ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white scale-105 shadow-lg'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {'⭐'.repeat(d)}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/30">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span>🎯</span> عدد الأسئلة
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 20].map(n => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`py-3 rounded-xl font-bold transition-all ${
                    questionCount === n
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-105 shadow-lg'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {n} سؤال
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-yellow-500/30">
            <div className="text-yellow-300 font-bold mb-2">💡 قواعد الساحة</div>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• لديك 15 ثانية لكل سؤال</li>
              <li>• الإجابات السريعة تكسبك XP إضافي</li>
              <li>• يجب الإجابة الصحيحة على 50% للفوز</li>
              <li>• السلسلة الانتصارية تزيد المكافآت</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            disabled={filteredQuestions.length === 0}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-black text-xl shadow-2xl hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            ⚔️ ابدأ المعركة
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const percentage = Math.round((correctCount / questions.length) * 100);
    const won = percentage >= 50;
    const perfect = percentage === 100;
    return (
      <div className="relative min-h-screen pt-24 pb-24 px-4 max-w-2xl mx-auto">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-purple-900 border border-purple-500/50 text-center">
          <div className="text-8xl mb-4 animate-bounce">{perfect ? '🏆' : won ? '🎉' : '💀'}</div>
          <h1 className="text-4xl font-black text-white mb-2">
            {perfect ? 'ممتاز!' : won ? 'فوز!' : 'خسارة'}
          </h1>
          <p className="text-gray-300 mb-6">
            {perfect ? 'أداء أسطوري!' : won ? 'أحسنت، استمر!' : 'حاول مرة أخرى'}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-black/40">
              <div className="text-3xl font-black text-green-400">{correctCount}/{questions.length}</div>
              <div className="text-xs text-gray-400 mt-1">إجابات صحيحة</div>
            </div>
            <div className="p-4 rounded-xl bg-black/40">
              <div className="text-3xl font-black text-yellow-400">{score}</div>
              <div className="text-xs text-gray-400 mt-1">نقاط مكتسبة</div>
            </div>
            <div className="p-4 rounded-xl bg-black/40">
              <div className="text-3xl font-black text-purple-400">{percentage}%</div>
              <div className="text-xs text-gray-400 mt-1">الدقة</div>
            </div>
            <div className="p-4 rounded-xl bg-black/40">
              <div className="text-3xl font-black text-cyan-400">{totalTime}s</div>
              <div className="text-xs text-gray-400 mt-1">الوقت</div>
            </div>
          </div>

          {won && (
            <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50">
              <span className="text-green-300 font-bold">+50 XP مكافأة الفوز!</span>
              {perfect && <span className="text-yellow-300 font-bold mr-2">+50 إضافي للإتقان!</span>}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setPhase('menu')}
              className="flex-1 py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20"
            >
              القائمة
            </button>
            <button
              onClick={startGame}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold"
            >
              مرة أخرى
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = questions[currentIndex];
  if (!current) return null;

  return (
    <div className="relative min-h-screen pt-24 pb-24 px-4 max-w-3xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>السؤال {currentIndex + 1} من {questions.length}</span>
          <span className="flex items-center gap-1">
            <span>🏆</span> {score}
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Timer */}
      <div className={`mb-6 p-4 rounded-2xl text-center ${timeLeft <= 5 ? 'bg-red-500/20 border border-red-500/50 animate-pulse' : 'bg-black/40 border border-white/10'}`}>
        <div className={`text-4xl font-black ${timeLeft <= 5 ? 'text-red-400' : 'text-white'}`}>
          ⏱️ {timeLeft}
        </div>
      </div>

      {/* Question */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-900 border border-purple-500/40 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">
            {'⭐'.repeat(current.difficulty)}
          </span>
          <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs">
            +{current.xp} XP
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
          {current.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {current.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === current.correct;
          const showResult = selected !== null;
          let cls = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50 text-white';
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
              className={`w-full p-4 rounded-2xl border-2 text-right font-bold transition-all ${cls}`}
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
