import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import {
  Account,
  PlayerStats,
  defaultPlayerStats,
  getCurrentAccount,
  updatePlayerStats,
  updateCurrentAccount,
  logout as apiLogout,
  setCurrentAccountId,
  migrateOldData,
  checkVIPExpired,
} from '../data/accounts';
import { ACHIEVEMENTS } from '../data/questions';

type PlayerContextType = {
  account: Account | null;
  player: PlayerStats;
  refreshAccount: () => void;
  switchAccount: (id: string) => void;
  logout: () => void;
  addXP: (amount: number) => void;
  recordAnswer: (correct: boolean, xp: number) => void;
  recordWin: (perfect: boolean) => void;
  recordLoss: () => void;
  advanceTower: () => void;
  unlockAchievement: (id: string) => boolean;
  buyItem: (itemId: string, cost: number) => boolean;
  setAvatar: (avatar: string) => void;
  setName: (name: string) => void;
  markDailyDone: (taskId: string) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

const emptyPlayer: PlayerStats = defaultPlayerStats();

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(() => {
    migrateOldData();
    checkVIPExpired();
    return getCurrentAccount();
  });

  const refreshAccount = useCallback(() => {
    setAccount(getCurrentAccount());
  }, []);

  const switchAccount = (id: string) => {
    setCurrentAccountId(id);
    setAccount(getCurrentAccount());
  };

  const logout = () => {
    apiLogout();
    setAccount(null);
  };

  const player = account?.player || emptyPlayer;

  const updateLocal = useCallback((newPlayer: PlayerStats) => {
    setAccount(prev => {
      if (!prev) return prev;
      const updated = { ...prev, player: newPlayer };
      // حفظ في localStorage عبر updatePlayerStats
      updatePlayerStats(newPlayer);
      return updated;
    });
  }, []);

  const addXP = (amount: number) => {
    if (!account) return;
    updateLocal({ ...player, xp: player.xp + amount });
  };

  const recordAnswer = (correct: boolean, xp: number) => {
    if (!account) return;
    const newStreak = correct ? player.currentStreak + 1 : 0;
    const newBestStreak = Math.max(player.bestStreak, newStreak);
    updateLocal({
      ...player,
      totalAnswered: player.totalAnswered + 1,
      correctAnswered: player.correctAnswered + (correct ? 1 : 0),
      currentStreak: newStreak,
      bestStreak: newBestStreak,
      xp: player.xp + (correct ? xp : 0),
      coins: player.coins + (correct ? Math.floor(xp / 2) : 0),
    });
  };

  const recordWin = (perfect: boolean) => {
    if (!account) return;
    updateLocal({
      ...player,
      wins: player.wins + 1,
      xp: player.xp + 50,
      coins: player.coins + 25,
      perfectGames: perfect ? player.perfectGames + 1 : player.perfectGames,
    });
  };

  const recordLoss = () => {
    if (!account) return;
    updateLocal({ ...player, losses: player.losses + 1, currentStreak: 0 });
  };

  const advanceTower = () => {
    if (!account) return;
    updateLocal({
      ...player,
      towerFloor: player.towerFloor + 1,
      xp: player.xp + 30,
      coins: player.coins + 10,
    });
  };

  const unlockAchievement = (id: string) => {
    if (!account) return false;
    if (player.unlockedAchievements.includes(id)) return false;
    updateLocal({
      ...player,
      unlockedAchievements: [...player.unlockedAchievements, id],
      xp: player.xp + 50,
      coins: player.coins + 50,
    });
    return true;
  };

  const buyItem = (itemId: string, cost: number) => {
    if (!account) return false;
    if (player.coins < cost || player.unlockedItems.includes(itemId)) return false;
    updateLocal({
      ...player,
      coins: player.coins - cost,
      unlockedItems: [...player.unlockedItems, itemId],
    });
    return true;
  };

  const setAvatar = (avatar: string) => {
    if (!account) return;
    const updated = { ...account, avatar };
    updateCurrentAccount({ avatar });
    setAccount(updated);
  };

  const setName = (name: string) => {
    if (!account || !name) return;
    const updated = { ...account, name };
    updateCurrentAccount({ name });
    setAccount(updated);
  };

  const markDailyDone = (taskId: string) => {
    if (!account) return;
    updateLocal({ ...player, dailyCompleted: [...player.dailyCompleted, taskId] });
  };

  // Daily reset
  useEffect(() => {
    if (!account) return;
    const today = new Date().toDateString();
    if (player.lastDailyReset !== today) {
      updateLocal({ ...player, dailyCompleted: [], lastDailyReset: today });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.id]);

  // Auto-check achievements
  useEffect(() => {
    if (!account) return;
    const level = Math.floor(player.xp / 100) + 1;
    ACHIEVEMENTS.forEach(a => {
      const p: any = { ...player };
      p.level = level;
      if (!player.unlockedAchievements.includes(a.id) && a.condition(p)) {
        unlockAchievement(a.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.totalAnswered, player.wins, player.bestStreak, player.xp, player.perfectGames]);

  return (
    <PlayerContext.Provider value={{
      account,
      player,
      refreshAccount,
      switchAccount,
      logout,
      addXP,
      recordAnswer,
      recordWin,
      recordLoss,
      advanceTower,
      unlockAchievement,
      buyItem,
      setAvatar,
      setName,
      markDailyDone,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};
