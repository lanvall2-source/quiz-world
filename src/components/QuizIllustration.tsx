import React from "react";
import type { QuizCategory } from "@/types";

interface Props {
  category: QuizCategory;
  emoji?: string;
  image?: string;
  title: string;
  className?: string;
}

export function QuizIllustration({ category, emoji, title, className = "" }: Props) {
  // 카테고리별 테두리 및 배경 그라디언트
  const getCategoryTheme = () => {
    switch (category) {
      case "dinosaur":
        return {
          bg: "from-amber-100 via-orange-100 to-amber-50",
          border: "border-amber-300",
          shadow: "shadow-amber-100",
          tagBg: "bg-amber-500",
          defaultEmoji: "🦖",
        };
      case "animal":
        return {
          bg: "from-emerald-100 via-teal-100 to-green-50",
          border: "border-emerald-300",
          shadow: "shadow-emerald-100",
          tagBg: "bg-emerald-500",
          defaultEmoji: "🦁",
        };
      case "country":
        return {
          bg: "from-blue-100 via-indigo-100 to-sky-50",
          border: "border-blue-300",
          shadow: "shadow-blue-100",
          tagBg: "bg-blue-500",
          defaultEmoji: "🌍",
        };
    }
  };

  const theme = getCategoryTheme();
  const displayEmoji = emoji || theme.defaultEmoji;

  return (
    <div
      className={`relative w-full aspect-video sm:aspect-2/1 max-h-56 rounded-3xl bg-gradient-to-b ${theme.bg} border-4 ${theme.border} flex items-center justify-center overflow-hidden shadow-card transition-transform duration-300 ${className}`}
    >
      {/* 배경 장식 원형 파티클 */}
      <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/40 rounded-full blur-xs pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/40 rounded-full blur-xs pointer-events-none" />

      {/* 중앙 초대형 비주얼 이모지/일러스트 */}
      <div className="relative z-10 flex flex-col items-center justify-center transform transition-transform hover:scale-110 duration-200">
        <span
          className="text-7xl sm:text-8xl drop-shadow-md select-none animate-bounceSlow"
          role="img"
          aria-label={title}
        >
          {displayEmoji}
        </span>
      </div>

      {/* 카테고리 뱃지 */}
      <div className="absolute top-3 left-3 z-10">
        <span className={`text-[11px] sm:text-xs font-bold text-white px-2.5 py-1 rounded-full shadow-xs ${theme.tagBg}`}>
          {category === "dinosaur" ? "공룡 탐험" : category === "animal" ? "동물 왕국" : "세계 여행"}
        </span>
      </div>
    </div>
  );
}
