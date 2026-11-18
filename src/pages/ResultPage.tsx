import React, { useEffect } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import confetti from "canvas-confetti";
import {
  Trophy,
  Star,
  Sparkles,
  RotateCcw,
  BookOpen,
  Home,
  CheckCircle,
  Award,
} from "lucide-react";
import { CATEGORIES } from "@/data";
import type { QuizCategory, QuizResult } from "@/types";

export function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = (categoryId as QuizCategory) || "dinosaur";
  const categoryMeta = CATEGORIES[category];

  const result = location.state?.result as QuizResult | undefined;

  useEffect(() => {
    // 80점 이상이면 화려한 폭죽 confetti 발사
    if (result && result.score >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.debug("Confetti err:", err);
      }
    }
  }, [result]);

  if (!result) {
    return (
      <div className="py-16 text-center flex flex-col items-center gap-4">
        <p className="text-slate-500 font-bold">결과 정보가 없습니다.</p>
        <Link
          to="/"
          className="bg-orange-500 text-white px-5 py-2.5 rounded-2xl font-bold"
        >
          홈으로 가기
        </Link>
      </div>
    );
  }

  // 점수에 따른 칭찬 메시지
  const getFeedback = (score: number) => {
    if (score === 100) {
      return {
        title: "완벽해요! 퀴즈 천재 탄생!",
        emoji: "👑",
        desc: "모든 문제를 완벽하게 맞혔어요! 정말 대단해요!",
      };
    }
    if (score >= 80) {
      return {
        title: "참 잘했어요! 멋져요!",
        emoji: "🌟",
        desc: "거의 다 맞혔어요! 조금만 더 하면 만점이에요!",
      };
    }
    if (score >= 60) {
      return {
        title: "좋은 시도예요! 힘내요!",
        emoji: "👏",
        desc: "절반 넘게 맞혔어요! 다시 도전하면 더 잘할 수 있어요!",
      };
    }
    return {
      title: "괜찮아요! 다음엔 더 잘할 수 있어요!",
      emoji: "🌱",
      desc: "틀린 문제를 도감에서 다시 확인해 보세요!",
    };
  };

  const feedback = getFeedback(result.score);

  return (
    <div className="flex flex-col gap-5 pb-12 animate-in zoom-in-95 duration-300">
      {/* 축하 결과 카드 */}
      <div className="bg-white rounded-3xl border-3 border-amber-200 p-6 shadow-card text-center flex flex-col items-center relative overflow-hidden">
        <div className="text-6xl mb-2 animate-bounceSlow">{feedback.emoji}</div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          {feedback.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs">
          {feedback.desc}
        </p>

        {/* 점수 & 맞힌 개수 원형 뱃지 */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 w-full flex items-center justify-around">
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500">점수</span>
            <span className="text-3xl font-black text-orange-600">
              {result.score}점
            </span>
          </div>
          <div className="h-8 w-px bg-amber-200" />
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500">맞힌 문제</span>
            <span className="text-3xl font-black text-slate-800">
              {result.correctCount} / {result.totalQuestions}
            </span>
          </div>
        </div>

        {/* 획득 보상 박스 (XP, 콤보) */}
        <div className="mt-4 w-full grid grid-cols-2 gap-2 text-xs font-bold">
          <div className="bg-purple-50 border border-purple-200 text-purple-900 p-2.5 rounded-xl flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>+{result.earnedXp} XP 획득</span>
          </div>
          <div className="bg-orange-50 border border-orange-200 text-orange-900 p-2.5 rounded-xl flex items-center justify-center gap-1.5">
            <Trophy className="w-4 h-4 text-orange-600" />
            <span>최대 {result.maxCombo}연속 정답</span>
          </div>
        </div>

        {/* 새로 획득한 카드 알림 */}
        {result.newCardsUnlocked.length > 0 && (
          <div className="mt-4 w-full bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 text-emerald-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <div className="text-left">
                <p className="text-xs font-extrabold text-emerald-900">
                  새 도감 카드 획득!
                </p>
                <p className="text-[11px] text-emerald-700">
                  {result.newCardsUnlocked.length}장의 새로운 카드가 도감에 등록되었어요.
                </p>
              </div>
            </div>
            <Link
              to="/collection"
              className="text-xs bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-700"
            >
              확인
            </Link>
          </div>
        )}
      </div>

      {/* 액션 버튼들 */}
      <div className="flex flex-col gap-2.5">
        <Link
          to={`/quiz/${category}`}
          className="w-full btn-kid-touch bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-black text-base rounded-2xl shadow-kid flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>다시 도전하기</span>
        </Link>

        <div className="grid grid-cols-2 gap-2.5">
          <Link
            to="/collection"
            className="btn-kid-touch bg-white hover:bg-slate-50 border-2 border-amber-300 text-slate-800 font-extrabold text-sm rounded-2xl shadow-kid flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>도감 보러가기</span>
          </Link>

          <Link
            to="/"
            className="btn-kid-touch bg-white hover:bg-slate-50 border-2 border-amber-300 text-slate-800 font-extrabold text-sm rounded-2xl shadow-kid flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Home className="w-4 h-4 text-orange-600" />
            <span>홈으로</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
