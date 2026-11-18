import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Star, Trophy } from "lucide-react";
import { getLevelProgress } from "@/lib/storage";
import type { UserStats } from "@/types";

interface Props {
  stats: UserStats;
}

export function Header({ stats }: Props) {
  const { currentLevel, currentXpInLevel, requiredXpForNext, percentage } =
    getLevelProgress(stats.xp);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-xs">
      <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* 로고 */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-white shadow-kid transform group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-slate-800 tracking-tight flex items-center gap-1">
              퀴즈월드
              <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">키즈</span>
            </span>
          </div>
        </Link>

        {/* 사용자 레벨 및 별 */}
        <div className="flex items-center gap-2.5">
          {/* 별 개수 */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold text-amber-900 shadow-2xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{stats.stars}</span>
          </div>

          {/* 레벨 뱃지 및 미니 경험치 바 */}
          <Link
            to="/collection"
            title="도감 및 내 레벨 보기"
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-xs hover:opacity-95 transition-opacity"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Lv.{currentLevel}</span>
            <div className="w-10 h-2 bg-white/30 rounded-full overflow-hidden hidden sm:block">
              <div
                className="h-full bg-amber-300 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
