// نظام إدارة الحسابات - AnimeVerse MAX
export type Account = {
  id: string;
  name: string;
  email: string | null;
  provider: 'guest' | 'local' | 'google';
  avatar: string;
  createdAt: string;
  lastLoginAt: string;
  // بيانات الاشتراك
  vip: boolean;
  vipExpiresAt: string | null;
  totalSpent: number; // إجمالي المبلغ المنفق (محاكاة)
  // بيانات اللاعب
  player: PlayerStats;
};

export type PlayerStats = {
  xp: number;
  totalAnswered: number;
  correctAnswered: number;
  wins: number;
  losses: number;
  currentStreak: number;
  bestStreak: number;
  towerFloor: number;
  coins: number;
  gems: number; // عملة مميزة (تُشترى بالمال)
  perfectGames: number;
  unlockedAchievements: string[];
  unlockedItems: string[];
  dailyCompleted: string[];
  lastDailyReset: string;
  lastDailyBonus: string; // آخر مرة أخذ فيها مكافأة الدخول
  adsWatchedToday: number;
  lastAdReset: string;
  luckySpinsToday: number;
  lastLuckyReset: string;
};

export const defaultPlayerStats = (): PlayerStats => ({
  xp: 0,
  totalAnswered: 0,
  correctAnswered: 0,
  wins: 0,
  losses: 0,
  currentStreak: 0,
  bestStreak: 0,
  towerFloor: 1,
  coins: 100,
  gems: 0,
  perfectGames: 0,
  unlockedAchievements: [],
  unlockedItems: ['🥷'],
  dailyCompleted: [],
  lastDailyReset: new Date().toDateString(),
  lastDailyBonus: '',
  adsWatchedToday: 0,
  lastAdReset: new Date().toDateString(),
  luckySpinsToday: 0,
  lastLuckyReset: new Date().toDateString(),
});

const ACCOUNTS_KEY = 'animeverse_max_accounts';
const CURRENT_KEY = 'animeverse_max_current_account';

export const getAccounts = (): Account[] => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

export const saveAccounts = (accounts: Account[]) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

export const getCurrentAccountId = (): string | null => localStorage.getItem(CURRENT_KEY);
export const setCurrentAccountId = (id: string | null) => {
  if (id) localStorage.setItem(CURRENT_KEY, id);
  else localStorage.removeItem(CURRENT_KEY);
};

export const getCurrentAccount = (): Account | null => {
  const id = getCurrentAccountId();
  if (!id) return null;
  return getAccounts().find(a => a.id === id) || null;
};

export const updateCurrentAccount = (updates: Partial<Account>) => {
  const id = getCurrentAccountId();
  if (!id) return;
  const accounts = getAccounts();
  const idx = accounts.findIndex(a => a.id === id);
  if (idx === -1) return;
  accounts[idx] = { ...accounts[idx], ...updates };
  saveAccounts(accounts);
};

export const updatePlayerStats = (updates: Partial<PlayerStats>) => {
  const id = getCurrentAccountId();
  if (!id) return;
  const accounts = getAccounts();
  const idx = accounts.findIndex(a => a.id === id);
  if (idx === -1) return;
  accounts[idx] = { ...accounts[idx], player: { ...accounts[idx].player, ...updates } };
  saveAccounts(accounts);
};

export const migrateOldData = () => {
  const oldKey = 'animeverse_max_player';
  const old = localStorage.getItem(oldKey);
  if (!old) return;
  try {
    const oldData = JSON.parse(old);
    const accounts = getAccounts();
    const existingGuest = accounts.find(a => a.provider === 'guest' && a.name === oldData.name);
    if (!existingGuest) {
      const guestAccount: Account = {
        id: `guest_${Date.now()}`,
        name: oldData.name || 'ضيف',
        email: null,
        provider: 'guest',
        avatar: oldData.avatar || '🥷',
        createdAt: oldData.createdAt || new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        vip: false,
        vipExpiresAt: null,
        totalSpent: 0,
        player: {
          ...defaultPlayerStats(),
          xp: oldData.xp ?? 0,
          totalAnswered: oldData.totalAnswered ?? 0,
          correctAnswered: oldData.correctAnswered ?? 0,
          wins: oldData.wins ?? 0,
          losses: oldData.losses ?? 0,
          currentStreak: oldData.currentStreak ?? 0,
          bestStreak: oldData.bestStreak ?? 0,
          towerFloor: oldData.towerFloor ?? 1,
          coins: oldData.coins ?? 100,
          perfectGames: oldData.perfectGames ?? 0,
          unlockedAchievements: oldData.unlockedAchievements ?? [],
          unlockedItems: oldData.unlockedItems ?? ['🥷'],
          dailyCompleted: oldData.dailyCompleted ?? [],
          lastDailyReset: oldData.lastDailyReset ?? new Date().toDateString(),
        },
      };
      accounts.push(guestAccount);
      saveAccounts(accounts);
      setCurrentAccountId(guestAccount.id);
    }
    localStorage.removeItem(oldKey);
  } catch {}
};

export const createGuestAccount = (): Account => {
  const accounts = getAccounts();
  const guestNumber = accounts.filter(a => a.provider === 'guest').length + 1;
  const account: Account = {
    id: `guest_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: `ضيف ${guestNumber}`,
    email: null,
    provider: 'guest',
    avatar: '🥷',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    vip: false,
    vipExpiresAt: null,
    totalSpent: 0,
    player: defaultPlayerStats(),
  };
  accounts.push(account);
  saveAccounts(accounts);
  setCurrentAccountId(account.id);
  return account;
};

export const createLocalAccount = (name: string, email: string, password: string): Account | { error: string } => {
  const accounts = getAccounts();
  if (accounts.some(a => a.email?.toLowerCase() === email.toLowerCase())) {
    return { error: 'هذا البريد مسجل بالفعل. حاول تسجيل الدخول.' };
  }
  const hashedPassword = btoa(unescape(encodeURIComponent(password + '_animeverse_salt_2026')));
  const account: Account = {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name,
    email: email.toLowerCase(),
    provider: 'local',
    avatar: '🎌',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    vip: false,
    vipExpiresAt: null,
    totalSpent: 0,
    player: defaultPlayerStats(),
  };
  const passwords = JSON.parse(localStorage.getItem('animeverse_passwords') || '{}');
  passwords[account.id] = hashedPassword;
  localStorage.setItem('animeverse_passwords', JSON.stringify(passwords));
  accounts.push(account);
  saveAccounts(accounts);
  setCurrentAccountId(account.id);
  return account;
};

export const loginLocalAccount = (email: string, password: string): Account | { error: string } => {
  const accounts = getAccounts();
  const account = accounts.find(a => a.email?.toLowerCase() === email.toLowerCase() && a.provider === 'local');
  if (!account) return { error: 'البريد الإلكتروني غير موجود' };
  const passwords = JSON.parse(localStorage.getItem('animeverse_passwords') || '{}');
  const hashed = btoa(unescape(encodeURIComponent(password + '_animeverse_salt_2026')));
  if (passwords[account.id] !== hashed) return { error: 'كلمة المرور غير صحيحة' };
  account.lastLoginAt = new Date().toISOString();
  saveAccounts(accounts);
  setCurrentAccountId(account.id);
  return account;
};

export const createOrLoginGoogle = (googleName: string, googleEmail: string): Account => {
  const accounts = getAccounts();
  const existing = accounts.find(a => a.email?.toLowerCase() === googleEmail.toLowerCase() && a.provider === 'google');
  if (existing) {
    existing.lastLoginAt = new Date().toISOString();
    existing.name = googleName;
    saveAccounts(accounts);
    setCurrentAccountId(existing.id);
    return existing;
  }
  const account: Account = {
    id: `google_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: googleName,
    email: googleEmail.toLowerCase(),
    provider: 'google',
    avatar: '🎌',
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    vip: false,
    vipExpiresAt: null,
    totalSpent: 0,
    player: defaultPlayerStats(),
  };
  accounts.push(account);
  saveAccounts(accounts);
  setCurrentAccountId(account.id);
  return account;
};

export const logout = () => setCurrentAccountId(null);

export const deleteAccount = (id: string) => {
  const accounts = getAccounts().filter(a => a.id !== id);
  saveAccounts(accounts);
  if (getCurrentAccountId() === id) setCurrentAccountId(null);
};

// ========== نظام VIP والاشتراكات ==========
export const activateVIP = (days: number, amount: number) => {
  const account = getCurrentAccount();
  if (!account) return;
  const now = new Date();
  let expires = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  // إذا كان عنده VIP بالفعل، نمدده
  if (account.vipExpiresAt && new Date(account.vipExpiresAt) > now) {
    expires = new Date(new Date(account.vipExpiresAt).getTime() + days * 24 * 60 * 60 * 1000);
  }
  updateCurrentAccount({
    vip: true,
    vipExpiresAt: expires.toISOString(),
    totalSpent: account.totalSpent + amount,
  });
};

export const checkVIPExpired = () => {
  const account = getCurrentAccount();
  if (!account || !account.vipExpiresAt) return;
  if (new Date(account.vipExpiresAt) < new Date()) {
    updateCurrentAccount({ vip: false, vipExpiresAt: null });
  }
};
