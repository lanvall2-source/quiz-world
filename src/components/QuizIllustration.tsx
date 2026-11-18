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
      className={`relative w-full h-34 sm:h-42 rounded-2xl sm:rounded-3xl bg-gradient-to-b ${theme.bg} border-2 sm:border-3 ${theme.border} flex items-center justify-center overflow-hidden shadow-card transition-all duration-300 ${className}`}
    >
      {/* 배경 장식 원형 파티클 */}
      <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/50 rounded-full blur-xs pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/50 rounded-full blur-xs pointer-events-none" />

      {/* 카테고리 좌상단 뱃지 */}
      <div className="absolute top-2 left-2 z-20">
        <span
          className={`text-[9px] sm:text-[11px] font-black text-white px-2 py-0.5 rounded-full shadow-xs ${theme.tagBg}`}
        >
          {theme.tagText}
        </span>
      </div>

      {/* 1. 나라 맞히기: 실제 고해상도 국기 SVG 렌더링 */}
      {category === "country" && (
        <div className="relative z-10 flex flex-col items-center justify-between w-full h-full p-2 pt-3 pb-2">
          <div className="relative group my-auto">
            {/* 국기 깃대 느낌의 카드 프레임 */}
            <div className="w-28 sm:w-36 aspect-[3/2] rounded-xl shadow-kid border-2 border-slate-700/80 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
              <CountryFlag countryName={title} className="w-full h-full object-cover" />
            </div>
            {/* 펄럭이는 효과 광택 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none rounded-xl" />
          </div>

          {/* 하단 힌트 캡션 (글자 잘림 방지) */}
          <div className="bg-white/95 border border-blue-200 px-2.5 py-0.5 rounded-full shadow-2xs max-w-[94%]">
            <span className="text-blue-900 text-[10px] sm:text-[11px] font-black tracking-tight text-center break-keep-all leading-tight">
              🚩 이 국기를 가진 나라는 어디일까요?
            </span>
          </div>
        </div>
      )}

      {/* 2. 공룡 맞히기: 서식지 뱃지 & 핵심 신체 특징 그래픽 */}
      {category === "dinosaur" && (
        <DinosaurIllustration dinoName={title} className="z-10" />
      )}

      {/* 3. 동물 맞히기: 서식지 뱃지 & 대표 외형 특징 그래픽 */}
      {category === "animal" && (
        <AnimalIllustration animalName={title} className="z-10" />
      )}
    </div>
  );
}
