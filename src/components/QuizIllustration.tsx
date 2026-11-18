import React from "react";
import type { QuizCategory } from "@/types";
import { CountryFlag } from "./illustrations/CountryFlag";
import { DinosaurIllustration } from "./illustrations/DinosaurIllustration";
import { AnimalIllustration } from "./illustrations/AnimalIllustration";

interface Props {
  category: QuizCategory;
  emoji?: string;
  image?: string;
  title: string; // 정답 이름 (예: "대한민국", "티라노사우루스", "사자")
  className?: string;
}

export function QuizIllustration({
  category,
  emoji,
  title,
  className = "",
}: Props) {
  // 카테고리별 테마 스타일
  const getCategoryTheme = () => {
    switch (category) {
      case "dinosaur":
        return {
          bg: "from-amber-100 via-orange-100/80 to-amber-50",
          border: "border-amber-400",
          tagBg: "bg-amber-600",
          tagText: "공룡 탐험 🦖",
        };
      case "animal":
        return {
          bg: "from-emerald-100 via-teal-100/80 to-green-50",
          border: "border-emerald-400",
          tagBg: "bg-emerald-600",
          tagText: "동물 왕국 🦁",
        };
      case "country":
        return {
          bg: "from-blue-100 via-indigo-100/80 to-sky-50",
          border: "border-blue-400",
          tagBg: "bg-blue-600",
          tagText: "세계 국기 여행 ✈️",
        };
    }
  };

  const theme = getCategoryTheme();

  return (
    <div
      className={`relative w-full aspect-[16/9] sm:aspect-[2/1] max-h-52 sm:max-h-60 rounded-3xl bg-gradient-to-b ${theme.bg} border-3 sm:border-4 ${theme.border} flex items-center justify-center overflow-hidden shadow-card transition-all duration-300 ${className}`}
    >
      {/* 배경 장식 원형 파티클 */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/50 rounded-full blur-xs pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/50 rounded-full blur-xs pointer-events-none" />

      {/* 카테고리 좌상단 뱃지 */}
      <div className="absolute top-3 left-3 z-20">
        <span
          className={`text-[11px] sm:text-xs font-black text-white px-3 py-1 rounded-full shadow-xs ${theme.tagBg}`}
        >
          {theme.tagText}
        </span>
      </div>

      {/* 1. 나라 맞히기: 실제 고해상도 국기 SVG 렌더링 */}
      {category === "country" && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-3 pt-7">
          <div className="relative group">
            {/* 국기 깃대 느낌의 카드 프레임 */}
            <div className="w-48 sm:w-56 aspect-[3/2] rounded-2xl shadow-kid border-3 border-slate-700/80 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
              <CountryFlag countryName={title} className="w-full h-full object-cover" />
            </div>
            {/* 펄럭이는 효과 광택 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none rounded-2xl" />
          </div>

          {/* 하단 힌트 캡션 */}
          <div className="mt-2 bg-white/90 border border-blue-200 px-3 py-1 rounded-full shadow-2xs">
            <span className="text-blue-900 text-[11px] sm:text-xs font-black tracking-tight">
              🚩 이 국기를 가진 나라는 어디일까요?
            </span>
          </div>
        </div>
      )}

      {/* 2. 공룡 맞히기: 서식지 뱃지 & 핵심 신체 특징 그래픽 */}
      {category === "dinosaur" && (
        <DinosaurIllustration dinoName={title} className="z-10 pt-6" />
      )}

      {/* 3. 동물 맞히기: 서식지 뱃지 & 대표 외형 특징 그래픽 */}
      {category === "animal" && (
        <AnimalIllustration animalName={title} className="z-10 pt-6" />
      )}
    </div>
  );
}
