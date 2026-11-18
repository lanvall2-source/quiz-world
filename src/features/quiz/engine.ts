import type { QuizQuestion } from "@/types";

/**
 * 배열 무작위 셔플 (Fisher-Yates 알고리즘)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 개별 문제 유효성 검사
 * - 보기가 4개인지
 * - 보기에 중복이 없는지
 * - 정답이 보기에 포함되어 있는지
 */
export function validateQuestion(q: QuizQuestion): boolean {
  if (!q.id || !q.question || !q.correctAnswer) return false;
  if (!Array.isArray(q.options) || q.options.length !== 4) return false;

  const uniqueOptions = new Set(q.options);
  if (uniqueOptions.size !== 4) return false;

  if (!q.options.includes(q.correctAnswer)) return false;

  return true;
}

/**
 * 퀴즈 게임 준비:
 * - 유효한 문제만 필터링
 * - 무작위로 섞은 후 최대 count개(기본 10개) 추출 (중복 없음)
 * - 각 문제의 보기(options) 4개를 무작위 셔플
 * - 문제 수가 count 미만이어도 오류 없이 가능한 만큼 반환
 */
export function prepareQuizGame(
  allQuestions: QuizQuestion[],
  count = 10
): QuizQuestion[] {
  const validQuestions = allQuestions.filter(validateQuestion);
  if (validQuestions.length === 0) return [];

  // 문제 중복 없이 무작위 추출
  const shuffledQuestions = shuffleArray(validQuestions);
  const selectedQuestions = shuffledQuestions.slice(0, Math.min(count, shuffledQuestions.length));

  // 각 문제의 보기 4개 위치를 무작위 셔플
  return selectedQuestions.map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));
}

/**
 * 정답 판정
 */
export function checkAnswer(
  question: QuizQuestion,
  selectedOption: string
): boolean {
  return question.correctAnswer.trim() === selectedOption.trim();
}

/**
 * 점수 계산 (0 ~ 100점)
 */
export function calculateScore(correctCount: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}
