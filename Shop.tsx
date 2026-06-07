import { useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { activateVIP } from '../data/accounts';

type ShopItem = { id: string; name: string; emoji: string; cost: number; category: 'avatar' };

const SHOP_ITEMS: ShopItem[] = [
  { id: 'av1', name: 'التنين الذهبي', emoji: '🐉', cost: 500, category: 'avatar' },
  { id: 'av2', name: 'النمر الأبيض', emoji: '🐅', cost: 400, category: 'avatar' },
  { id: 'av3', name: 'العنقاء', emoji: '🦚', cost: 600, category: 'avatar' },
  { id: 'av4', name: 'ساموراي', emoji: '⛩️', cost: 350, category: 'avatar' },
  { id: 'av5', name: 'الشيطان', emoji: '👹', cost: 800, category: 'avatar' },
  { id: 'av6', name: 'البرق', emoji: '⚡', cost: 300, category: 'avatar' },
  { id: 'av7', name: 'الورد', emoji: '🌹', cost: 250, category: 'avatar' },
  { id: 'av8', name: 'القمر', emoji: '🌙', cost: 450, category: 'avatar' },
  { id: 'av9', name: 'النجمة', emoji: '⭐', cost: 200, category: 'avatar' },
  { id: 'av10', name: 'الأسد', emoji: '🦁', cost: 550, category: 'avatar' },
  { id: 'av11', name: 'الذئب', emoji: '🐺', cost: 500, category: 'avatar' },
  { id: 'av12', name: 'الأخطبوط', emoji: '🐙', cost: 700, category: 'avatar' },
];

type CoinPack = { id: string; coins: number; price: number; bonus?: string; popular?: boolean; emoji: string };
const COIN_PACKS: CoinPack[] = [
  { id: 'bronze', coins: 100, price: 0.99, emoji: '🥉' },
  { id: 'silver', coins: 500, price: 3.99, emoji: '🥈' },
  { id: 'gold', coins: 1500, price: 9.99, bonus: '+200 مجاناً', popular: true, emoji: '🥇' },
  { id: 'diamond', coins: 5000, price: 29.99, bonus: '+1000 مجاناً', emoji: '💎' },
  { id: 'legend', coins: 15000, price: 79.99, bonus: '+5000 مجاناً', emoji: '🔥' },
];

type Tab = 'earn' | 'packs' | 'vip' | 'items';

export function Shop() {
  const { account, player, buyItem, setAvatar } = usePlayer();
  const [notification, setNotification] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('earn');
  const [showAdModal, setShowAdModal] = useState(false);
  const [adTimer, setAdTimer] = useState(0);
  const [showLucky, setShowLucky] = useState(false);
  const [luckyResult, setLuckyResult] = useState<number | null>(null);
  const [showPurchase, setShowPurchase] = useState<CoinPack | null>(null);

  const currentAvatar = account?.avatar || '🥷';
  const today = new Date().toDateString();

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  // Daily ad reset
  useEffect(() => {
    if (player.lastAdReset !== today) {
      import('../data/accounts').then(({ updatePlayerStats }) => {
        updatePlayerStats({ adsWatchedToday: 0, lastAdReset: today });
      });
    }
    if (player.lastLuckyReset !== today) {
      import('../data/accounts').then(({ updatePlayerStats }) => {
        updatePlayerStats({ luckySpinsToday: 0, lastLuckyReset: today });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canWatchAd = player.adsWatchedToday < 5;
  const canSpinLucky = player.luckySpinsToday < 3;

  // ========== Earning Actions ==========
  const handleWatchAd = () => {
    if (!canWatchAd) return notify('⚠️ وصلت الحد اليومي (5 إعلانات)');
    setShowAdModal(true);
    setAdTimer(5);
  };

  useEffect(() => {
    if (!showAdModal || adTimer <= 0) return;
    const t = setTimeout(() => setAdTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [adTimer, showAdModal]);

  useEffect(() => {
    if (showAdModal && adTimer === 0) {
      setTimeout(() => {
        import('../data/accounts').then(({ updatePlayerStats }) => {
          updatePlayerStats({
            coins: player.coins + 75,
            adsWatchedToday: player.adsWatchedToday + 1,
          });
        });
        setShowAdModal(false);
        notify('🎉 ربحت 75 عملة!');
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adTimer, showAdModal]);

  const handleLuckySpin = () => {
    if (!canSpinLucky) return notify('⚠️ وصلت الحد اليومي (3 دورات)');
    if (player.coins < 50) return notify('❌ تحتاج 50 عملة للدوران');
    setShowLucky(true);
    setLuckyResult(null);
    
    setTimeout(() => {
      const prizes = [10, 25, 50, 100, 200, 500, 20, 50];
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      setLuckyResult(prize);
      
      import('../data/accounts').then(({ updatePlayerStats }) => {
        updatePlayerStats({
          coins: player.coins - 50 + prize,
          luckySpinsToday: player.luckySpinsToday + 1,
        });
      });
    }, 2500);
  };

  const handleDailyBonus = () => {
    if (player.lastDailyBonus === today) return notify('⚠️ أخذت مكافأة اليوم بالفعل');
    import('../data/accounts').then(({ updatePlayerStats }) => {
      updatePlayerStats({
        coins: player.coins + 100,
        xp: player.xp + 50,
        lastDailyBonus: today,
      });
    });
    notify('🎁 ربحت 100 عملة + 50 XP!');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    import('../data/accounts').then(({ updatePlayerStats }) => {
      updatePlayerStats({ coins: player.coins + 50 });
    });
    notify('🤝 ربحت 50 عملة للدعوة!');
  };

  // ========== Purchase ==========
  const handleBuyPack = (pack: CoinPack) => {
    // محاكاة الشراء - في الإنتاج سيتم ربطها بـ Stripe/Google Play
    import('../data/accounts').then(({ updatePlayerStats, updateCurrentAccount }) => {
      updatePlayerStats({ coins: player.coins + pack.coins });
      updateCurrentAccount({ totalSpent: (account?.totalSpent || 0) + pack.price });
    });
    setShowPurchase(null);
    notify(`💎 تم شراء ${pack.coins} عملة بنجاح!`);
  };

  const handleBuyVIP = (days: number, price: number) => {
    activateVIP(days, price);
    notify('👑 تم تفعيل VIP بنجاح!');
  };

  // ========== Item Shop ==========
  const handleBuyItem = (item: ShopItem) => {
    if (player.unlockedItems.includes(item.id)) {
      if (item.category === 'avatar') {
        setAvatar(item.emoji);
        notify(`✓ تم تفعيل ${item.name}`);
      }
      return;
    }
    if (player.coins < item.cost) return notify('❌ عملات غير كافية');
    if (buyItem(item.id, item.cost)) {
      notify(`🎉 اشتريت ${item.name}!`);
      if (item.category === 'avatar') setAvatar(item.emoji);
    }
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'earn', label: 'اكسب', icon: '💰' },
    { id: 'packs', label: 'باقات', icon: '💎' },
    { id: 'vip', label: 'VIP', icon: '👑' },
    { id: 'items', label: 'متجر', icon: '🛍️' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">💰</div>
        <h1 className="text-3xl font-black text-white mb-1">المتجر</h1>
        <p className="text-gray-400 text-sm">اربح، اشترِ، وتطور!</p>
      </div>

      {/* Balance */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/40">
          <div className="text-xs text-gray-400">🪙 العملات</div>
          <div className="text-2xl font-black text-yellow-300">{player.coins.toLocaleString()}</div>
        </div>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40">
          <div className="text-xs text-gray-400">💎 الجواهر</div>
          <div className="text-2xl font-black text-cyan-300">{player.gems}</div>
        </div>
      </div>

      {account?.vip && (
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border border-yellow-500/50 flex items-center gap-2">
          <span className="text-2xl">👑</span>
          <div className="flex-1">
            <div className="text-yellow-300 font-bold text-sm">VIP نشط</div>
            <div className="text-xs text-gray-400">ينتهي: {account.vipExpiresAt ? new Date(account.vipExpiresAt).toLocaleDateString('ar') : '-'}</div>
          </div>
        </div>
      )}

      {notification && (
        <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-center animate-pulse shadow-lg">
          {notification}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-black/40 p-1.5 rounded-2xl">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
              tab === t.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div>{t.icon}</div>
            <div className="text-[10px] mt-0.5">{t.label}</div>
          </button>
        ))}
      </div>

      {/* ========== TAB: EARN ========== */}
      {tab === 'earn' && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>🎯</span> طرق كسب العملات مجاناً
          </h2>

          {/* Daily Bonus */}
          <button
            onClick={handleDailyBonus}
            disabled={player.lastDailyBonus === today}
            className={`w-full p-4 rounded-2xl border text-right flex items-center gap-4 transition-all ${
              player.lastDailyBonus === today
                ? 'bg-green-500/10 border-green-500/30 opacity-70'
                : 'bg-gradient-to-br from-emerald-600/30 to-teal-600/30 border-emerald-500/50 hover:scale-[1.01]'
            }`}
          >
            <div className="text-5xl">🎁</div>
            <div className="flex-1">
              <div className="text-white font-bold">مكافأة الدخول اليومي</div>
              <div className="text-sm text-gray-300">100 عملة + 50 XP مجاناً</div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-sm">
              {player.lastDailyBonus === today ? '✓ مُستلم' : 'استلم'}
            </div>
          </button>

          {/* Watch Ad */}
          <button
            onClick={handleWatchAd}
            disabled={!canWatchAd}
            className={`w-full p-4 rounded-2xl border text-right flex items-center gap-4 transition-all ${
              !canWatchAd
                ? 'bg-gray-500/10 border-gray-500/30 opacity-60'
                : 'bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border-blue-500/50 hover:scale-[1.01]'
            }`}
          >
            <div className="text-5xl">📺</div>
            <div className="flex-1">
              <div className="text-white font-bold flex items-center gap-2">
                مشاهدة إعلان
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300">مكافأة فورية</span>
              </div>
              <div className="text-sm text-gray-300">+75 عملة لكل إعلان</div>
              <div className="text-xs text-gray-500 mt-1">المتبقي: {5 - player.adsWatchedToday}/5 اليوم</div>
            </div>
            <div className={`px-4 py-2 rounded-xl text-white font-bold text-sm ${canWatchAd ? 'bg-blue-500' : 'bg-gray-600'}`}>
              شاهد
            </div>
          </button>

          {/* Lucky Spin */}
          <button
            onClick={handleLuckySpin}
            disabled={!canSpinLucky || player.coins < 50}
            className={`w-full p-4 rounded-2xl border text-right flex items-center gap-4 transition-all ${
              !canSpinLucky || player.coins < 50
                ? 'bg-gray-500/10 border-gray-500/30 opacity-60'
                : 'bg-gradient-to-br from-pink-600/30 to-purple-600/30 border-pink-500/50 hover:scale-[1.01]'
            }`}
          >
            <div className="text-5xl animate-spin-slow">🎰</div>
            <div className="flex-1">
              <div className="text-white font-bold">عجلة الحظ</div>
              <div className="text-sm text-gray-300">ادفع 50 واربح حتى 500!</div>
              <div className="text-xs text-gray-500 mt-1">المتبقي: {3 - player.luckySpinsToday}/3 اليوم</div>
            </div>
            <div className={`px-4 py-2 rounded-xl text-white font-bold text-sm ${canSpinLucky && player.coins >= 50 ? 'bg-pink-500' : 'bg-gray-600'}`}>
              🎲 لف
            </div>
          </button>

          {/* Share/Invite */}
          <button
            onClick={handleShare}
            className="w-full p-4 rounded-2xl bg-gradient-to-br from-green-600/30 to-emerald-600/30 border border-green-500/50 text-right flex items-center gap-4 hover:scale-[1.01] transition-all"
          >
            <div className="text-5xl">🤝</div>
            <div className="flex-1">
              <div className="text-white font-bold">ادعُ صديق</div>
              <div className="text-sm text-gray-300">+50 عملة لكل دعوة</div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-green-500 text-white font-bold text-sm">مشاركة</div>
          </button>

          {/* Achievements Reminder */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🏅</span>
              <span className="text-white font-bold">الإنجازات</span>
            </div>
            <p className="text-sm text-gray-300">
              اكسب 50 عملة + 50 XP لكل إنجاز تفتحه!
              <br />
              لديك <span className="text-yellow-300 font-bold">{player.unlockedAchievements.length}</span> إنجاز مفتوح
            </p>
          </div>
        </div>
      )}

      {/* ========== TAB: PACKS ========== */}
      {tab === 'packs' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>💎</span> باقات العملات
          </h2>
          <p className="text-sm text-gray-400">ادعم اللعبة واحصل على عملات فورية</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COIN_PACKS.map(pack => (
              <button
                key={pack.id}
                onClick={() => setShowPurchase(pack)}
                className={`relative p-4 rounded-2xl border text-right transition-all hover:scale-[1.02] ${
                  pack.popular
                    ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-500 shadow-lg'
                    : 'bg-gradient-to-br from-slate-800/50 to-purple-900/30 border-purple-500/30 hover:border-purple-500/60'
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-2 right-4 px-2 py-0.5 rounded-full bg-yellow-500 text-black text-[10px] font-black">
                    🔥 الأكثر شعبية
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="text-5xl">{pack.emoji}</div>
                  <div className="flex-1">
                    <div className="text-2xl font-black text-yellow-300">{pack.coins.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">عملة 🪙</div>
                    {pack.bonus && (
                      <div className="text-[10px] text-green-400 font-bold mt-0.5">🎁 {pack.bonus}</div>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-white">${pack.price}</div>
                    <div className="text-xs text-gray-400">شراء</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center text-xs text-gray-500">
            🔒 معاملات آمنة · ضمان استرداد · دفع فوري
          </div>
        </div>
      )}

      {/* ========== TAB: VIP ========== */}
      {tab === 'vip' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-yellow-600/30 via-orange-600/30 to-red-600/30 border-2 border-yellow-500 text-center">
            <div className="text-7xl mb-3 animate-bounce">👑</div>
            <h2 className="text-3xl font-black text-white mb-2">AnimeVerse VIP</h2>
            <p className="text-gray-300 text-sm mb-4">افتح كل المزايا الحصرية</p>
            
            <div className="grid grid-cols-2 gap-2 mb-6 text-sm text-right">
              <div className="p-3 rounded-xl bg-black/40 flex items-center gap-2">
                <span>⚡</span><span className="text-white">XP مضاعف ×2</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 flex items-center gap-2">
                <span>🪙</span><span className="text-white">100 عملة يومياً</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 flex items-center gap-2">
                <span>🚫</span><span className="text-white">بدون إعلانات</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 flex items-center gap-2">
                <span>🎭</span><span className="text-white">شخصية VIP حصرية</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 flex items-center gap-2">
                <span>🏅</span><span className="text-white">شارة VIP ذهبية</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 flex items-center gap-2">
                <span>🎁</span><span className="text-white">هدايا أسبوعية</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleBuyVIP(30, 4.99)}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black hover:scale-[1.02] transition-all"
              >
                <div className="text-lg">شهر واحد</div>
                <div className="text-2xl">$4.99</div>
              </button>
              <button
                onClick={() => handleBuyVIP(90, 11.99)}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-black hover:scale-[1.02] transition-all relative"
              >
                <div className="absolute -top-2 right-4 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black">
                  خصم 20%
                </div>
                <div className="text-lg">3 أشهر</div>
                <div className="text-2xl">$11.99</div>
              </button>
              <button
                onClick={() => handleBuyVIP(365, 39.99)}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black hover:scale-[1.02] transition-all relative"
              >
                <div className="absolute -top-2 right-4 px-2 py-0.5 rounded-full bg-pink-500 text-white text-[10px] font-black">
                  أفضل قيمة - خصم 33%
                </div>
                <div className="text-lg">سنة كاملة</div>
                <div className="text-2xl">$39.99</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== TAB: ITEMS ========== */}
      {tab === 'items' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🎭</span> الشخصيات
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SHOP_ITEMS.map(item => {
              const owned = player.unlockedItems.includes(item.id);
              const canAfford = player.coins >= item.cost;
              const active = currentAvatar === item.emoji;
              return (
                <button
                  key={item.id}
                  onClick={() => handleBuyItem(item)}
                  className={`relative p-4 rounded-2xl border text-center transition-all hover:scale-105 ${
                    active ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-500' :
                    owned ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50' :
                    canAfford ? 'bg-black/40 border-white/20 hover:border-yellow-500/50' :
                    'bg-black/40 border-white/10 opacity-60'
                  }`}
                >
                  <div className="text-5xl mb-2">{item.emoji}</div>
                  <div className="text-white font-bold text-sm mb-1">{item.name}</div>
                  <div className={`text-xs font-bold ${
                    owned ? 'text-green-400' : canAfford ? 'text-yellow-300' : 'text-red-400'
                  }`}>
                    {active ? '✓ مُفعّل' : owned ? '✓ مُشترى' : `🪙 ${item.cost}`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========== Ad Modal ========== */}
      {showAdModal && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 rounded-3xl p-6 border border-purple-500/50 text-center">
            <div className="text-sm text-gray-400 mb-4">📺 إعلان مكافأة</div>
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center mb-4 relative overflow-hidden">
              <div className="absolute inset-0 animate-pulse opacity-30 bg-white" />
              <div className="relative text-center">
                <div className="text-6xl mb-2">🎌</div>
                <div className="text-white font-black text-xl">AnimeVerse MAX</div>
                <div className="text-white/80 text-sm">أفضل منصة أنمي تفاعلية</div>
              </div>
            </div>
            {adTimer > 0 ? (
              <>
                <div className="text-4xl font-black text-white mb-2">⏱️ {adTimer}</div>
                <div className="text-sm text-gray-400">انتظر حتى ينتهي الإعلان...</div>
              </>
            ) : (
              <div className="text-2xl font-black text-green-400 animate-pulse">🎉 جاري إضافة المكافأة...</div>
            )}
          </div>
        </div>
      )}

      {/* ========== Lucky Wheel Modal ========== */}
      {showLucky && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 rounded-3xl p-6 border border-pink-500/50 text-center">
            <div className="text-2xl font-black text-white mb-4">🎰 عجلة الحظ</div>
            <div className={`text-8xl mb-4 ${luckyResult === null ? 'animate-spin' : 'animate-bounce'}`}>
              🎡
            </div>
            {luckyResult === null ? (
              <div className="text-white font-bold">جاري الدوران...</div>
            ) : (
              <>
                <div className="text-sm text-gray-400 mb-2">ربحت</div>
                <div className="text-5xl font-black text-yellow-300 mb-2">🪙 {luckyResult}</div>
                <div className="text-lg text-white font-bold mb-4">عملة!</div>
                <button
                  onClick={() => setShowLucky(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold"
                >
                  رائع! 🎉
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========== Purchase Modal ========== */}
      {showPurchase && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-slate-900 rounded-3xl p-6 border border-yellow-500/50">
            <div className="text-center mb-6">
              <div className="text-6xl mb-2">{showPurchase.emoji}</div>
              <div className="text-2xl font-black text-yellow-300">{showPurchase.coins.toLocaleString()}</div>
              <div className="text-sm text-gray-400">عملة</div>
              <div className="text-3xl font-black text-white mt-2">${showPurchase.price}</div>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => handleBuyPack(showPurchase)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black hover:scale-[1.02] transition-all"
              >
                ✓ تأكيد الشراء (محاكاة)
              </button>
              <button
                onClick={() => setShowPurchase(null)}
                className="w-full py-3 rounded-xl bg-white/5 text-gray-300 font-bold"
              >
                إلغاء
              </button>
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center">
              🔒 هذه محاكاة · لا يتم فرض أي رسوم حقيقية
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
