import type {
  QuizCategory,
  QuizResult,
  StorageDataV1,
  UserSettings,
  UserStats,
} from "@/types";

export const STORAGE_KEY = "quizworld_save_v1";

export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  reducedMotion: false,
  fontSize: "normal",
};

export const DEFAULT_STATS: UserStats = {
  xp: 0,
  level: 1,
  stars: 0,
  unlockedCardIds: [],
  categoryStats: {
    dinosaur: { playedGames: 0, bestScore: 0, solvedQuestionIds: [] },
    animal: { playedGames: 0, bestScore: 0, solvedQuestionIds: [] },
    country: { playedGames: 0, bestScore: 0, solvedQuestionIds: [] },
  },
  history: [],
};

export const INITIAL_STORAGE: StorageDataV1 = {
  version: 1,
  stats: DEFAULT_STATS,
  settings: DEFAULT_SETTINGS,
};

/**
 * 레벨 계산 함수 (50XP당 1레벨 기본 점진 증가)
 */
export function calculateLevel(xp: number): number {
  if (xp < 0) return 1;
  // Lv 1: 0~49, Lv 2: 50~119, Lv 3: 120~209, Lv 4: 210~319 ...
  // 필요 XP: 50 + (level - 1) * 20
  let currentLevel = 1;
  let accumulatedXp = 0;
  while (true) {
    const nextLevelReq = 50 + (currentLevel - 1) * 20;
    if (accumulatedXp + nextLevelReq > xp) {
      break;
    }
    accumulatedXp += nextLevelReq;
    currentLevel++;
  }
  return currentLevel;
}

/**
 * 현재 레벨의 진행도 (0 ~ 100%)
 */
export function getLevelProgress(xp: number): {
  currentLevel: number;
  currentXpInLevel: number;
  requiredXpForNext: number;
  percentage: number;
} {
  let currentLevel = 1;
  let accumulatedXp = 0;
  while (true) {
    const nextLevelReq = 50 + (currentLevel - 1) * 20;
    if (accumulatedXp + nextLevelReq > xp) {
      const currentXpInLevel = xp - accumulatedXp;
      const percentage = Math.min(
        100,
        Math.floor((currentXpInLevel / nextLevelReq) * 100)
      );
      return {
        currentLevel,
        currentXpInLevel,
        requiredXpForNext: nextLevelReq,
        percentage,
      };
    }
    accumulatedXp += nextLevelReq;
    currentLevel++;
  }
}

/**
 * 퀴즈 완료 시 경험치 및 별 계산
 * - 최초 정답: 문제당 10XP (이미 푼 문제는 2XP)
 * - 게임 완료: 20XP
 * - 3연속 콤보: +10XP
 * - 5연속 이상 콤보: +20XP 추가
 */
export function calculateGameReward(
  answers: { questionId: string; isCorrect: boolean }[],
  solvedQuestionIds: string[],
  maxCombo: number
): { earnedXp: number; earnedStars: number; newlySolvedIds: string[] } {
  let xp = 0;
  const newlySolvedIds: string[] = [];

  // 게임 완료 기본 보상
  xp += 20;

  // 콤보 보너스
  if (maxCombo >= 5) {
    xp += 30; // 3콤보(10) + 5콤보(20)
  } else if (maxCombo >= 3) {
    xp += 10;
  }

  // 문제별 정답 보상
  answers.forEach((ans) => {
    if (ans.isCorrect) {
      if (!solvedQuestionIds.includes(ans.questionId)) {
        xp += 10; // 최초 정답
        newlySolvedIds.push(ans.questionId);
      } else {
        xp += 2; // 반복 플레이는 2XP로 제한 (어뷰징 방지)
      }
    }
  });

  // 맞힌 문제 비율에 따른 별(1~3개) 부여
  const correctCount = answers.filter((a) => a.isCorrect).length;
  let earnedStars = 1;
  if (correctCount >= 9) {
    earnedStars = 3;
  } else if (correctCount >= 6) {
    earnedStars = 2;
  }

  return { earnedXp: xp, earnedStars, newlySolvedIds };
}

/**
 * 로컬스토리지 로드 (데이터 무결성 검증 및 손상 시 안전 복구)
 */
export function loadStorage(): StorageDataV1 {
  try {
    if (typeof window === "undefined") return INITIAL_STORAGE;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STORAGE;

    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 1 && parsed.stats) {
      return {
        version: 1,
        stats: {
          ...DEFAULT_STATS,
          ...parsed.stats,
          categoryStats: {
            ...DEFAULT_STATS.categoryStats,
            ...(parsed.stats.categoryStats || {}),
          },
        },
        settings: {
          ...DEFAULT_SETTINGS,
          ...(parsed.settings || {}),
        },
      };
    }
    return INITIAL_STORAGE;
  } catch (err) {
    console.error("Storage corrupted. Resetting to initial:", err);
    return INITIAL_STORAGE;
  }
}

/**
 * 로컬스토리지 저장
 */
export function saveStorage(data: StorageDataV1): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (err) {
    console.error("Failed to save storage:", err);
  }
}

/**
 * 게임 결과 저장 후 갱신된 UserStats 반환
 */
export function recordQuizCompletion(
  category: QuizCategory,
  result: QuizResult
): UserStats {
  const current = loadStorage();
  const prevCategory = current.stats.categoryStats[category] || {
    playedGames: 0,
    bestScore: 0,
    solvedQuestionIds: [],
  };

  const updatedSolvedIds = Array.from(
    new Set([...prevCategory.solvedQuestionIds, ...result.newCardsUnlocked])
  );

  const updatedCards = Array.from(
    new Set([...current.stats.unlockedCardIds, ...result.newCardsUnlocked])
  );

  const newTotalXp = current.stats.xp + result.earnedXp;
  const newLevel = calculateLevel(newTotalXp);

  const newStats: UserStats = {
    ...current.stats,
    xp: newTotalXp,
    level: newLevel,
    stars: current.stats.stars + (result.score >= 90 ? 3 : result.score >= 60 ? 2 : 1),
    unlockedCardIds: updatedCards,
    categoryStats: {
      ...current.stats.categoryStats,
      [category]: {
        playedGames: prevCategory.playedGames + 1,
        bestScore: Math.max(prevCategory.bestScore, result.score),
        solvedQuestionIds: updatedSolvedIds,
      },
    },
    history: [result, ...current.stats.history].slice(0, 30),
  };

  saveStorage({
    ...current,
    stats: newStats,
  });

  return newStats;
}

/**
 * 설정 업데이트
 */
export function updateSettings(patch: Partial<UserSettings>): UserSettings {
  const current = loadStorage();
  const newSettings = { ...current.settings, ...patch };
  saveStorage({ ...current, settings: newSettings });
  return newSettings;
}

/**
 * 데이터 초기화 (초기화 기능)
 */
export function resetAllData(): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (err) {
    console.error("Reset error:", err);
  }
}
