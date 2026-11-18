import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Flame,
  Volume2,
  VolumeX,
} from "lucide-react";
import { CATEGORIES } from "@/data";
import { prepareQuizGame, checkAnswer, calculateScore } from "@/features/quiz/engine";
import { calculateGameReward, recordQuizCompletion } from "@/lib/storage";
import { QuizIllustration } from "@/components/QuizIllustration";
import type { QuizCategory, QuizQuestion, QuizResult, UserSettings, UserStats } from "@/types";

interface Props {
  stats: UserStats;
  settings: UserSettings;
  onStatsUpdate: (newStats: UserStats) => void;
}

export function QuizPage({ stats, settings, onStatsUpdate }: Props) {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  // 유효한 카테고리인지 확인
  const category = (categoryId as QuizCategory) || "dinosaur";
  const categoryMeta = CATEGORIES[category];

  // 10문제 게임 세션 준비 (컴포넌트 마운트 시 1회 준비)
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // 사용자 답변 기록
  const [answers, setAnswers] = useState<
    { questionId: string; userAnswer: string; isCorrect: boolean }[]
  >([]);

  useEffect(() => {
    if (!categoryMeta) {
      navigate("/");
      return;
    }
    const prepared = prepareQuizGame(categoryMeta.questions, 10);
    setQuestions(prepared);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCombo(0);
    setMaxCombo(0);
    setAnswers([]);
  }, [category, categoryMeta, navigate]);

  if (!categoryMeta || questions.length === 0) {
    return (
      <div className="py-16 text-center text-slate-500 font-bold">
        문제를 불러오는 중입니다... 🌱
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCorrect =
    selectedOption !== null && checkAnswer(currentQuestion, selectedOption);

  // 보기 선택 핸들러 (중복 입력 방지)
  const handleSelectOption = (option: string) => {
    if (isAnswered) return; // 이미 선택했으면 중복 클릭 차단

    setSelectedOption(option);
    setIsAnswered(true);

    const correct = checkAnswer(currentQuestion, option);
    const newCombo = correct ? combo + 1 : 0;
    setCombo(newCombo);
    if (newCombo > maxCombo) {
      setMaxCombo(newCombo);
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        userAnswer: option,
        isCorrect: correct,
      },
    ]);
  };

  // 다음 문제로 이동 또는 게임 완료
  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // 10문제 완료 -> 점수 및 보상 계산 후 결과 페이지로 이동
      finishGame();
    }
  };

  const finishGame = () => {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const score = calculateScore(correctCount, questions.length);

    // 보상 계산 (어뷰징 방지 및 콤보 반영)
    const solvedIds =
      stats.categoryStats[category]?.solvedQuestionIds || [];
    const { earnedXp, newlySolvedIds } = calculateGameReward(
      answers,
      solvedIds,
      maxCombo
    );

    const result: QuizResult = {
      categoryId: category,
      totalQuestions: questions.length,
      correctCount,
      score,
      earnedXp,
      maxCombo,
      newCardsUnlocked: newlySolvedIds,
      answers,
      completedAt: new Date().toISOString(),
    };

    const updatedStats = recordQuizCompletion(category, result);
    onStatsUpdate(updatedStats);

    navigate(`/quiz/${category}/result`, { state: { result } });
  };

  return (
    <div className="flex flex-col gap-3.5 pb-36 animate-in fade-in duration-300">
      {/* 상단 퀴즈 헤더 & 진행률 바 */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border-2 border-amber-200 shadow-xs">
        <Link
          to="/"
          className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
          title="홈으로 나가기"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* 진행률 텍스트 & 바 */}
        <div className="flex-1 max-w-[200px]">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 mb-1">
            <span>문제 {currentIndex + 1} / {questions.length}</span>
            {combo >= 2 && (
              <span className="flex items-center gap-1 text-orange-600 animate-bounce">
                <Flame className="w-3.5 h-3.5 fill-orange-500" />
                <span>{combo}연속 정답!</span>
              </span>
            )}
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* 카테고리 아이콘 뱃지 */}
        <span className="text-xl" role="img" aria-label={categoryMeta.name}>
          {categoryMeta.emoji}
        </span>
      </div>

      {/* 비주얼 일러스트 카드 */}
      <QuizIllustration
        category={category}
        emoji={currentQuestion.emoji}
        title={currentQuestion.correctAnswer}
      />

      {/* 문제 질문 박스 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-amber-200 p-3.5 sm:p-4 shadow-card text-center">
        <span className="inline-block bg-orange-100 text-orange-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full mb-1.5">
          Q{currentIndex + 1}. 알맞은 정답을 골라보세요!
        </span>
        <h2 className="text-base sm:text-lg font-black text-slate-800 leading-snug tracking-tight">
          {currentQuestion.question}
        </h2>
      </div>

      {/* 보기 4개 버튼 리스트 (최소 52px 큰 버튼) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isThisCorrect = checkAnswer(currentQuestion, option);

          let btnStyle = "bg-white border-amber-200 text-slate-800 hover:border-orange-400 hover:bg-orange-50/50 shadow-kid";

          if (isAnswered) {
            if (isThisCorrect) {
              btnStyle = "bg-emerald-500 border-emerald-600 text-white shadow-kid ring-4 ring-emerald-200 scale-101";
            } else if (isSelected && !isThisCorrect) {
              btnStyle = "bg-red-400 border-red-500 text-white shadow-kid-active opacity-85";
            } else {
              btnStyle = "bg-slate-100 border-slate-200 text-slate-400 opacity-60";
            }
          }

          return (
            <button
              key={`${currentQuestion.id}-opt-${idx}`}
              onClick={() => handleSelectOption(option)}
              disabled={isAnswered}
              className={`w-full min-h-[52px] sm:min-h-[56px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-3 font-extrabold text-sm sm:text-base flex items-center justify-between text-left transition-all btn-kid-touch cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-black/10 flex items-center justify-center text-xs shrink-0 font-black">
                  {idx + 1}
                </span>
                <span className="leading-snug">{option}</span>
              </div>

              {isAnswered && isThisCorrect && (
                <CheckCircle2 className="w-6 h-6 text-white shrink-0 animate-pop" />
              )}
              {isAnswered && isSelected && !isThisCorrect && (
                <XCircle className="w-6 h-6 text-white shrink-0 animate-pop" />
              )}
            </button>
          );
        })}
      </div>

      {/* 정답/오답 하단 고정 액션 바 (스크롤을 내리지 않고 바로 누를 수 있는 Sticky Bottom Bar) */}
      {isAnswered && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t-3 border-amber-300 shadow-[0_-10px_25px_rgba(0,0,0,0.12)] animate-in slide-in-from-bottom-4 duration-300">
          <div className="max-w-md mx-auto flex flex-col gap-2">
            <div className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-2xl shrink-0 mt-0.5">
                {isCorrect ? "🎉" : "💡"}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                      isCorrect
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {isCorrect ? "정답이에요!" : "정답 확인"}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-800">
                    {currentQuestion.correctAnswer}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-snug line-clamp-2">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              autoFocus
              className="w-full h-12 sm:h-13 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-600 hover:to-amber-600 active:scale-[0.98] text-white font-black text-base sm:text-lg rounded-2xl shadow-kid hover:shadow-kid-hover flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{isLastQuestion ? "결과 보러 가기 🏆" : "다음 문제로"}</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
