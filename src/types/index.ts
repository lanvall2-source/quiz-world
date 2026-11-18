export type QuizCategory = "dinosaur" | "animal" | "country";

export type Difficulty = "easy" | "medium" | "hard";

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  question: string;
  image: string; // 이미지 URL 또는 SVG 식별자
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  emoji?: string; // 이모지 보조 비주얼
  tags?: string[];
}

export interface QuizResult {
  categoryId: QuizCategory;
  totalQuestions: number;
  correctCount: number;
  score: number; // 0 ~ 100
  earnedXp: number;
  maxCombo: number;
  newCardsUnlocked: string[]; // 새로 잠금 해제된 카드 id
  answers: {
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
  completedAt: string;
}

export interface CardItem {
  id: string;
  name: string;
  category: QuizCategory;
  image: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserStats {
  xp: number;
  level: number;
  stars: number;
  unlockedCardIds: string[];
  categoryStats: Record<
    QuizCategory,
    {
      playedGames: number;
      bestScore: number;
      solvedQuestionIds: string[]; // 중복 XP 파밍 방지용
    }
  >;
  history: QuizResult[];
}

export interface UserSettings {
  soundEnabled: boolean;
  reducedMotion: boolean;
  fontSize: "normal" | "large";
}

export interface StorageDataV1 {
  version: 1;
  stats: UserStats;
  settings: UserSettings;
}
