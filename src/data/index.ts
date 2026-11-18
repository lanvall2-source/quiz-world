import type { QuizCategory, QuizQuestion } from "@/types";
import { DINOSAUR_QUESTIONS } from "./dinosaurs";
import { ANIMAL_QUESTIONS } from "./animals";
import { COUNTRY_QUESTIONS } from "./countries";

export { DINOSAUR_QUESTIONS } from "./dinosaurs";
export { ANIMAL_QUESTIONS } from "./animals";
export { COUNTRY_QUESTIONS } from "./countries";

export interface CategoryMeta {
  id: QuizCategory;
  name: string;
  englishName: string;
  title: string;
  description: string;
  badge: string;
  emoji: string;
  gradient: string;
  accentColor: string;
  questions: QuizQuestion[];
}

export const CATEGORIES: Record<QuizCategory, CategoryMeta> = {
  dinosaur: {
    id: "dinosaur",
    name: "공룡 맞히기",
    englishName: "Dinosaurs",
    title: "쿵쾅쿵쾅 신비한 백악기 공룡 탐험",
    description: "티라노사우루스부터 트리케라톱스까지! 멋진 공룡 친구들을 맞혀보세요.",
    badge: "인기 폭발 🔥",
    emoji: "🦖",
    gradient: "from-amber-400 via-orange-400 to-red-400",
    accentColor: "#FF7B25",
    questions: DINOSAUR_QUESTIONS,
  },
  animal: {
    id: "animal",
    name: "동물 맞히기",
    englishName: "Animals",
    title: "초원과 숲속 귀여운 동물 친구들",
    description: "사자, 기린, 펭귄 등 지구촌 신기한 동물들의 특징을 쏙쏙 알아봐요.",
    badge: "어린이 추천 ⭐",
    emoji: "🦁",
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
    accentColor: "#10B981",
    questions: ANIMAL_QUESTIONS,
  },
  country: {
    id: "country",
    name: "나라 맞히기",
    englishName: "Countries",
    title: "국기와 랜드마크로 떠나는 세계 여행",
    description: "에펠탑, 피라미드, 자유의 여신상! 흥미진진한 세계 여러 나라의 비밀!",
    badge: "상식 쑥쑥 🌍",
    emoji: "✈️",
    gradient: "from-blue-400 via-indigo-400 to-purple-500",
    accentColor: "#4F46E5",
    questions: COUNTRY_QUESTIONS,
  },
};

export const ALL_QUESTIONS: QuizQuestion[] = [
  ...DINOSAUR_QUESTIONS,
  ...ANIMAL_QUESTIONS,
  ...COUNTRY_QUESTIONS,
];

export function getCategoryQuestions(category: QuizCategory): QuizQuestion[] {
  return CATEGORIES[category]?.questions || [];
}
