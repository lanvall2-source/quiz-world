import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Sparkles, Trophy, Award, X, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/data";
import { CountryFlag } from "@/components/illustrations/CountryFlag";
import type { QuizCategory, QuizQuestion, UserStats } from "@/types";

interface Props {
  stats: UserStats;
}

export function CollectionPage({ stats }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>("dinosaur");
  const [selectedCard, setSelectedCard] = useState<QuizQuestion | null>(null);

  const categories = Object.values(CATEGORIES);
  const currentCategoryMeta = CATEGORIES[selectedCategory];

  // 잠금 해제된 카드 ID 목록
  const unlockedIds = stats.unlockedCardIds;

  // 전체 진행도
  const totalQuestions = categories.reduce((sum, c) => sum + c.questions.length, 0);
  const totalUnlocked = unlockedIds.length;
  const overallPercentage = Math.round((totalUnlocked / totalQuestions) * 100);

  return (
    <div className="flex flex-col gap-4 pb-16 animate-in fade-in duration-300">
      {/* 도감 헤더 배너 */}
      <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-3xl p-5 text-white shadow-kid">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>나만의 지식 보물상자</span>
          </span>
          <span className="text-xs font-black">
            전체 수집 {totalUnlocked} / {totalQuestions}장 ({overallPercentage}%)
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          퀴즈월드 수집 도감
        </h1>
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden mt-3">
          <div
            className="h-full bg-amber-300 rounded-full transition-all duration-500"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* 카테고리 탭 (공룡 / 동물 / 나라) */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border-2 border-amber-200 shadow-xs">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const catUnlockedCount = cat.questions.filter((q) =>
            unlockedIds.includes(q.id)
          ).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs scale-102"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name.replace(" 맞히기", "")}</span>
              <span className="text-[10px] opacity-80">
                ({catUnlockedCount}/{cat.questions.length})
              </span>
            </button>
          );
        })}
      </div>

      {/* 카드 그리드 리스트 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {currentCategoryMeta.questions.map((q) => {
          const isUnlocked = unlockedIds.includes(q.id);

          return (
            <div
              key={q.id}
              onClick={() => isUnlocked && setSelectedCard(q)}
              className={`rounded-2xl border-2 p-3.5 flex flex-col items-center text-center transition-all relative overflow-hidden select-none ${
                isUnlocked
                  ? "bg-white border-amber-300 shadow-card hover:shadow-kid hover:-translate-y-1 cursor-pointer"
                  : "bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed"
              }`}
            >
              {/* 카드 이미지 영역 */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-2.5 shadow-xs overflow-hidden ${
                  isUnlocked
                    ? "bg-gradient-to-tr from-amber-100 to-orange-100"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {isUnlocked ? (
                  q.category === "country" ? (
                    <div className="w-12 aspect-[3/2] rounded shadow-xs overflow-hidden border border-slate-300">
                      <CountryFlag countryName={q.correctAnswer} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <span role="img" aria-label={q.correctAnswer}>
                      {q.emoji || "⭐"}
                    </span>
                  )
                ) : (
                  <Lock className="w-6 h-6 text-slate-400" />
                )}
              </div>

              {/* 카드 이름 (글자 잘림 방지 break-keep-all) */}
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 break-keep-all leading-tight min-h-[28px] flex items-center justify-center">
                {isUnlocked ? q.correctAnswer : "잠긴 카드"}
              </h3>

              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {isUnlocked ? "눌러서 보기" : "퀴즈를 풀어보세요"}
              </p>

              {/* 획득 뱃지 */}
              {isUnlocked && (
                <div className="absolute top-2 right-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block shadow-xs" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 카드 상세 설명 모달 */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border-3 border-amber-300 shadow-2xl max-w-sm w-full p-6 text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-28 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-100 to-orange-100 flex items-center justify-center text-6xl shadow-kid mb-4 overflow-hidden p-2">
              {selectedCard.category === "country" ? (
                <div className="w-24 aspect-[3/2] rounded-xl shadow-md overflow-hidden border-2 border-slate-700">
                  <CountryFlag countryName={selectedCard.correctAnswer} className="w-full h-full object-cover" />
                </div>
              ) : (
                <span role="img" aria-label={selectedCard.correctAnswer}>
                  {selectedCard.emoji}
                </span>
              )}
            </div>

            <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              {CATEGORIES[selectedCard.category]?.name}
            </span>

            <h3 className="text-2xl font-black text-slate-900 mt-2">
              {selectedCard.correctAnswer}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
              {selectedCard.explanation}
            </p>

            <div className="mt-5">
              <button
                onClick={() => setSelectedCard(null)}
                className="w-full btn-kid-touch bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-sm rounded-2xl shadow-kid"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
