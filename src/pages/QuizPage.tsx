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
    <div className="flex flex-col gap-4 pb-12 animate-in fade-in duration-300">
      {/* 상단 퀴즈 헤더 & 진행률 바 */}
      <div className="flex items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border-2 border-amber-200 shadow-xs">
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
      <div className="bg-white rounded-3xl border-3 border-amber-200 p-4 sm:p-5 shadow-card text-center">
        <span className="inline-block bg-orange-100 text-orange-800 text-[11px] font-extrabold px-3 py-1 rounded-full mb-2">
          Q{currentIndex + 1}. 알맞은 정답을 골라보세요!
        </span>
        <h2 className="text-base sm:text-lg font-black text-slate-800 leading-snug tracking-tight">
          {currentQuestion.question}
        </h2>
      </div>

      {/* 보기 4개 버튼 리스트 (최소 54px 큰 버튼) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isThisCorrect = checkAnswer(currentQuestion, option);

          let btnStyle = "bg-white border-amber-200 text-slate-800 hover:border-orange-400 hover:bg-orange-50/50 shadow-kid";

          if (isAnswered) {
            if (isThisCorrect) {
              btnStyle = "bg-emerald-500 border-emerald-600 text-white shadow-kid ring-4 ring-emerald-200 scale-102";
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
              className={`w-full min-h-[56px] px-4 py-3 rounded-2xl border-3 font-extrabold text-sm sm:text-base flex items-center justify-between text-left transition-all btn-kid-touch cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-black/10 flex items-center justify-center text-xs shrink-0">
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

      {/* 정답/오답 해설 및 다음 버튼 (선택 후 노출) */}
      {isAnswered && (
        <div
          className={`rounded-3xl border-3 p-4 sm:p-5 shadow-card animate-in slide-in-from-bottom-3 duration-300 ${
            isCorrect
              ? "bg-emerald-50 border-emerald-300 text-emerald-950"
              : "bg-orange-50 border-orange-300 text-orange-950"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl shrink-0 mt-0.5">
              {isCorrect ? "🎉" : "💡"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 font-black text-sm sm:text-base">
                <span>{isCorrect ? "정답이에요! 참 잘했어요!" : "아쉬워요! 정답을 확인해 볼까요?"}</span>
              </div>
              <p className="text-xs sm:text-sm mt-1 leading-relaxed text-slate-700">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>

          {/* 다음 문제 버튼 */}
          <button
            onClick={handleNext}
            className="w-full btn-kid-touch bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base rounded-2xl shadow-kid hover:shadow-kid-hover active:shadow-kid-active active:translate-y-1 flex items-center justify-center gap-2 transition-all mt-4"
          >
            <span>{isLastQuestion ? "결과 보러 가기" : "다음 문제로"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
