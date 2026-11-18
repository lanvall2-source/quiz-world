import React from "react";
import { Link } from "react-router-dom";
import { Play, Sparkles, Trophy, Award } from "lucide-react";
import { CATEGORIES } from "@/data";
import type { QuizCategory, UserStats } from "@/types";

interface Props {
  stats: UserStats;
}

export function HomePage({ stats }: Props) {
  const categoriesList = Object.values(CATEGORIES);

  return (
    <div className="flex flex-col gap-5 pb-8 animate-in fade-in duration-300">
      {/* 환영 키즈 배너 */}
      <section className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 rounded-3xl p-5 text-white shadow-kid relative overflow-hidden">
        <div className="absolute -right-4 -bottom-6 text-7xl opacity-30 select-none pointer-events-none">
          🎮
        </div>
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>매일매일 재미있는 퀴즈 탐험</span>
          </span>
          <h1 className="text-xl sm:text-2xl font-black leading-tight tracking-tight">
            어떤 퀴즈를 풀어볼까요?
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-1 font-medium">
            10문제를 모두 맞히고 멋진 도감 카드를 모아보세요!
          </p>
        </div>
      </section>

      {/* 카테고리 3대 퀴즈 카드 리스트 */}
      <section className="flex flex-col gap-4">
        {categoriesList.map((cat) => {
          const catStats = stats.categoryStats[cat.id as QuizCategory] || {
            playedGames: 0,
            bestScore: 0,
            solvedQuestionIds: [],
          };
          const collectedCount = catStats.solvedQuestionIds.length;
          const totalQuestions = cat.questions.length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border-3 border-amber-200 p-4 sm:p-5 shadow-card hover:shadow-kid transition-all flex flex-col gap-3 relative overflow-hidden group"
            >
              {/* 상단 뱃지 및 메타 */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full">
                  {cat.badge}
                </span>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>최고 {catStats.bestScore}점</span>
                  </span>
                  <span>&middot;</span>
                  <span>카드 {collectedCount}/{totalQuestions}</span>
                </div>
              </div>

              {/* 본문 정보 (대표 비주얼 + 설명) */}
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-18 h-18 rounded-2xl bg-gradient-to-tr ${cat.gradient} flex items-center justify-center text-4xl shadow-kid shrink-0 transform group-hover:scale-105 transition-transform`}
                >
                  <span role="img" aria-label={cat.name}>
                    {cat.emoji}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* 진행률 바 */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (collectedCount / totalQuestions) * 100)}%`,
                  }}
                />
              </div>

              {/* 퀴즈 시작 버튼 (대형 터치 영역: 52px) */}
              <Link
                to={`/quiz/${cat.id}`}
                className="w-full btn-kid-touch bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base rounded-2xl shadow-kid hover:shadow-kid-hover active:shadow-kid-active active:translate-y-1 flex items-center justify-center gap-2 transition-all mt-1"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>게임 시작하기</span>
              </Link>
            </div>
          );
        })}
      </section>

      {/* 하단 어린이 도감 바로가기 안내 */}
      <section className="bg-amber-100/70 border-2 border-dashed border-amber-300 rounded-3xl p-4 text-center flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
          <Award className="w-4 h-4 text-amber-600" />
          <span>내가 모은 카드가 궁금하다면?</span>
        </div>
        <Link
          to="/collection"
          className="text-xs font-extrabold text-amber-900 bg-white px-4 py-2 rounded-xl shadow-xs hover:bg-amber-50 transition-colors"
        >
          📖 도감 열어보기 &rarr;
        </Link>
      </section>
    </div>
  );
}
