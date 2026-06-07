import { useState } from 'react';
import {
  getAccounts,
  createGuestAccount,
  createLocalAccount,
  loginLocalAccount,
  createOrLoginGoogle,
  setCurrentAccountId,
} from '../data/accounts';

type LoginProps = {
  onSuccess: () => void;
};

type Mode = 'welcome' | 'login' | 'signup' | 'google' | 'switch';

export function Login({ onSuccess }: LoginProps) {
  const [mode, setMode] = useState<Mode>('welcome');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');

  // Google form
  const [googleName, setGoogleName] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');

  const accounts = getAccounts();

  const handleGuest = () => {
    setLoading(true);
    setTimeout(() => {
      createGuestAccount();
      onSuccess();
    }, 500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!loginEmail || !loginPassword) {
      setError('الرجاء ملء جميع الحقول');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = loginLocalAccount(loginEmail, loginPassword);
      if ('error' in result) {
        setError(result.error);
        setLoading(false);
      } else {
        onSuccess();
      }
    }, 500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!signupName || !signupEmail || !signupPassword) {
      setError('الرجاء ملء جميع الحقول');
      return;
    }
    if (signupPassword.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    if (signupPassword !== signupConfirm) {
      setError('كلمات المرور غير متطابقة');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) {
      setError('البريد الإلكتروني غير صالح');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = createLocalAccount(signupName.trim(), signupEmail.trim(), signupPassword);
      if ('error' in result) {
        setError(result.error);
        setLoading(false);
      } else {
        onSuccess();
      }
    }, 500);
  };

  const handleGoogle = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!googleName || !googleEmail) {
      setError('الرجاء إدخال اسمك وبريدك الإلكتروني');
      return;
    }
    if (!googleEmail.toLowerCase().endsWith('@gmail.com')) {
      setError('يجب استخدام بريد Gmail');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      createOrLoginGoogle(googleName.trim(), googleEmail.trim());
      onSuccess();
    }, 800);
  };

  const handleSwitchAccount = (accountId: string) => {
    setCurrentAccountId(accountId);
    onSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden" dir="rtl">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{
            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`, animationDuration: `${2 + Math.random() * 2}s`,
          }} />
        ))}
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-2xl opacity-50" />
            <h1 className="relative text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              AnimeVerse MAX
            </h1>
          </div>
          <p className="text-gray-400 text-sm mt-2">🎌 عالم أنمي تفاعلي 🎮</p>
        </div>

        {/* Card */}
        <div className="relative p-6 md:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 shadow-2xl">
          {/* Welcome Mode */}
          {mode === 'welcome' && (
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white text-center mb-2">ابدأ رحلتك الآن</h2>
              <p className="text-gray-400 text-sm text-center mb-6">اختر طريقة الدخول</p>

              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white text-slate-900 font-bold hover:bg-gray-100 transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>الدخول بحساب Google</span>
              </button>

              <button
                onClick={() => setMode('signup')}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                <span>✨</span>
                <span>إنشاء حساب جديد</span>
              </button>

              <button
                onClick={() => setMode('login')}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all border border-slate-700"
              >
                <span>🔐</span>
                <span>تسجيل الدخول</span>
              </button>

              <button
                onClick={handleGuest}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-transparent border border-dashed border-slate-600 text-gray-300 font-medium hover:border-orange-500 hover:text-orange-300 transition-all"
              >
                {loading ? <span className="animate-spin">⏳</span> : <span>👤</span>}
                <span>الدخول كضيف (تجربة سريعة)</span>
              </button>

              {accounts.length > 0 && (
                <button
                  onClick={() => setMode('switch')}
                  className="w-full mt-4 py-2 text-sm text-purple-300 hover:text-purple-200 transition-colors"
                >
                  تبديل الحساب ({accounts.length} {accounts.length === 1 ? 'حساب محفوظ' : 'حسابات محفوظة'}) →
                </button>
              )}

              <div className="pt-4 border-t border-slate-700/50 mt-4">
                <p className="text-xs text-gray-500 text-center">
                  🔒 بياناتك محفوظة بأمان على جهازك
                </p>
              </div>
            </div>
          )}

          {/* Login Mode */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <button type="button" onClick={() => setMode('welcome')} className="text-gray-400 hover:text-white">→</button>
                <h2 className="text-xl font-bold text-white">تسجيل الدخول</h2>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
                  ⚠️ {error}
                </div>
              )}

              <Input label="📧 البريد الإلكتروني" type="email" value={loginEmail} onChange={setLoginEmail} placeholder="example@email.com" />
              <Input label="🔒 كلمة المرور" type="password" value={loginPassword} onChange={setLoginPassword} placeholder="••••••••" />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? '⏳ جاري الدخول...' : 'تسجيل الدخول'}
              </button>

              <p className="text-sm text-gray-400 text-center">
                ليس لديك حساب؟{' '}
                <button type="button" onClick={() => setMode('signup')} className="text-purple-400 hover:text-purple-300 font-bold">
                  أنشئ حساباً
                </button>
              </p>
            </form>
          )}

          {/* Signup Mode */}
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <button type="button" onClick={() => setMode('welcome')} className="text-gray-400 hover:text-white">→</button>
                <h2 className="text-xl font-bold text-white">إنشاء حساب جديد</h2>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
                  ⚠️ {error}
                </div>
              )}

              <Input label="👤 الاسم" value={signupName} onChange={setSignupName} placeholder="اسمك في AnimeVerse" />
              <Input label="📧 البريد الإلكتروني" type="email" value={signupEmail} onChange={setSignupEmail} placeholder="example@email.com" />
              <Input label="🔒 كلمة المرور" type="password" value={signupPassword} onChange={setSignupPassword} placeholder="6 أحرف على الأقل" />
              <Input label="🔒 تأكيد كلمة المرور" type="password" value={signupConfirm} onChange={setSignupConfirm} placeholder="أعد إدخال كلمة المرور" />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? '⏳ جاري الإنشاء...' : '✨ إنشاء الحساب'}
              </button>

              <p className="text-sm text-gray-400 text-center">
                لديك حساب؟{' '}
                <button type="button" onClick={() => setMode('login')} className="text-purple-400 hover:text-purple-300 font-bold">
                  سجّل دخولك
                </button>
              </p>
            </form>
          )}

          {/* Google Mode */}
          {mode === 'google' && (
            <form onSubmit={handleGoogle} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <button type="button" onClick={() => setMode('welcome')} className="text-gray-400 hover:text-white">→</button>
                <h2 className="text-xl font-bold text-white">ربط حساب Google</h2>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center">
                <div className="text-4xl mb-2">🔗</div>
                <p className="text-sm text-blue-300">
                  أدخل بيانات حساب Google الخاص بك
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
                  ⚠️ {error}
                </div>
              )}

              <Input label="👤 اسمك في Google" value={googleName} onChange={setGoogleName} placeholder="الاسم الكامل" />
              <Input label="📧 بريد Gmail" type="email" value={googleEmail} onChange={setGoogleEmail} placeholder="example@gmail.com" />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-slate-900 font-bold hover:bg-gray-100 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>جاري الاتصال بـ Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>متابعة مع Google</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Switch Account Mode */}
          {mode === 'switch' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <button onClick={() => setMode('welcome')} className="text-gray-400 hover:text-white">→</button>
                <h2 className="text-xl font-bold text-white">اختر حساب</h2>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {accounts.map(acc => (
                  <button
                    key={acc.id}
                    onClick={() => handleSwitchAccount(acc.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-purple-500 hover:bg-slate-800 transition-all text-right"
                  >
                    <div className="text-3xl">{acc.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold truncate">{acc.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${acc.provider === 'google' ? 'bg-blue-500/20 text-blue-300' : acc.provider === 'local' ? 'bg-purple-500/20 text-purple-300' : 'bg-orange-500/20 text-orange-300'}`}>
                          {acc.provider === 'google' ? 'Google' : acc.provider === 'local' ? 'بريد' : 'ضيف'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 truncate">{acc.email || 'بدون بريد'}</div>
                      <div className="text-xs text-purple-300 mt-1">
                        Lv.{Math.floor(acc.player.xp / 100) + 1} · {acc.player.xp} XP
                      </div>
                    </div>
                    <span className="text-purple-400">←</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setMode('welcome')}
                className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← العودة
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2026 AnimeVerse MAX · صُنع بـ ❤️ لعشاق الأنمي
        </p>
      </div>
    </div>
  );
}

function Input({ label, type = 'text', value, onChange, placeholder }: { label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm text-gray-300 font-bold mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
      />
    </div>
  );
}
