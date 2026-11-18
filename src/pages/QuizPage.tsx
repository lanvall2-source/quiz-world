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
    <div className="flex flex-col gap-2 sm:gap-2.5 w-full animate-in fade-in duration-300">
      {/* 상단 퀴즈 헤더 & 진행률 바 (세로 40px 컴팩트 디자인) */}
      <div className="flex items-center justify-between gap-2.5 bg-white p-2 rounded-2xl border-2 border-amber-200 shadow-xs">
        <Link
          to="/"
          className="p-1 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
          title="홈으로 나가기"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* 진행률 텍스트 & 바 */}
        <div className="flex-1 max-w-[220px]">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-700 mb-0.5">
            <span>문제 {currentIndex + 1} / {questions.length}</span>
            {combo >= 2 && (
              <span className="flex items-center gap-0.5 text-orange-600 animate-bounce text-[11px]">
                <Flame className="w-3 h-3 fill-orange-500" />
                <span>{combo}연속 정답!</span>
              </span>
            )}
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* 카테고리 아이콘 뱃지 */}
        <span className="text-lg" role="img" aria-label={categoryMeta.name}>
          {categoryMeta.emoji}
        </span>
      </div>

      {/* 비주얼 일러스트 카드 (컴팩트 h-32/h-40) */}
      <QuizIllustration
        category={category}
        emoji={currentQuestion.emoji}
        title={currentQuestion.correctAnswer}
      />

      {/* 문제 질문 박스 (슬림 패딩 & 큰 폰트 & break-keep-all) */}
      <div className="bg-white rounded-2xl border-2 border-amber-200 px-3 py-2 sm:py-2.5 shadow-card text-center">
        <span className="inline-block bg-orange-100 text-orange-800 text-[10px] font-black px-2 py-0.5 rounded-full mb-1">
          Q{currentIndex + 1}. 정답을 골라보세요!
        </span>
        <h2 className="text-sm sm:text-base font-black text-slate-800 leading-snug tracking-tight break-keep-all">
          {currentQuestion.question}
        </h2>
      </div>

      {/* 보기 4개 버튼 리스트: 글자 잘림 없는 2x2 그리드 */}
      <div className="grid grid-cols-2 gap-2">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isThisCorrect = checkAnswer(currentQuestion, option);

          let btnStyle = "bg-white border-amber-200 text-slate-800 hover:border-orange-400 hover:bg-orange-50/50 shadow-kid";

          if (isAnswered) {
            if (isThisCorrect) {
              btnStyle = "bg-emerald-500 border-emerald-600 text-white shadow-kid ring-3 ring-emerald-200 scale-101";
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
              className={`w-full min-h-[50px] sm:min-h-[54px] px-2 py-1.5 rounded-xl sm:rounded-2xl border-2 sm:border-3 font-extrabold flex items-center justify-between text-left transition-all btn-kid-touch cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-1.5 flex-1 min-w-0 pr-1">
                <span className="w-5 h-5 rounded-lg bg-black/10 flex items-center justify-center text-[10px] font-black shrink-0">
                  {idx + 1}
                </span>
                <span className="text-[11px] sm:text-xs font-black leading-tight break-keep-all flex-1 text-slate-800 [button[disabled]_&]:text-inherit">
                  {option}
                </span>
              </div>

              {isAnswered && isThisCorrect && (
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 animate-pop" />
              )}
              {isAnswered && isSelected && !isThisCorrect && (
                <XCircle className="w-4 h-4 text-white shrink-0 animate-pop" />
              )}
            </button>
          );
        })}
      </div>

      {/* 정답/오답 피드백 & 다음 버튼 (글자 잘림 없이 전체 해설 노출) */}
      {isAnswered && (
        <div className="flex flex-col gap-1.5 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start gap-2 bg-white/95 p-2.5 rounded-xl border-2 border-amber-200 shadow-xs">
            <span className="text-xl shrink-0 mt-0.5">
              {isCorrect ? "🎉" : "💡"}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                    isCorrect
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {isCorrect ? "정답이에요!" : "정답"}
                </span>
                <span className="text-xs font-black text-slate-800 break-keep-all">
                  {currentQuestion.correctAnswer}
                </span>
              </div>
              <p className="text-[11px] text-slate-700 mt-1 leading-snug break-keep-all">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            autoFocus
            className="w-full h-11 sm:h-12 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-600 hover:to-amber-600 active:scale-[0.98] text-white font-black text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-kid hover:shadow-kid-hover flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{isLastQuestion ? "결과 보러 가기 🏆" : "다음 문제로"}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}
    </div>
  );
}
