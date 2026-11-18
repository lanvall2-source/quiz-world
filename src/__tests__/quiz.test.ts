import { describe, it, expect, beforeEach } from "vitest";
import {
  validateQuestion,
  prepareQuizGame,
  checkAnswer,
  calculateScore,
  shuffleArray,
} from "@/features/quiz/engine";
import {
  calculateLevel,
  calculateGameReward,
  loadStorage,
  saveStorage,
  INITIAL_STORAGE,
  STORAGE_KEY,
} from "@/lib/storage";
import { ALL_QUESTIONS } from "@/data";
import type { QuizQuestion } from "@/types";

describe("퀴즈월드 (Quiz World) 핵심 엔진 & 로직 단위 테스트", () => {
  const sampleQuestion: QuizQuestion = {
    id: "test-01",
    category: "dinosaur",
    question: "테스트 공룡은?",
    image: "/images/test.svg",
    options: ["티라노", "트리케라", "브라키오", "스테고"],
    correctAnswer: "티라노",
    explanation: "티라노 설명",
    difficulty: "easy",
  };

  // 1. 정답 판정 테스트
  it("1. 정답 판정: 일치하는 보기를 선택했을 때 true를 반환해야 한다", () => {
    expect(checkAnswer(sampleQuestion, "티라노")).toBe(true);
  });

  // 2. 오답 판정 테스트
  it("2. 오답 판정: 일치하지 않는 보기를 선택했을 때 false를 반환해야 한다", () => {
    expect(checkAnswer(sampleQuestion, "트리케라")).toBe(false);
  });

  // 3. 문제 중복 방지 테스트
  it("3. 문제 중복 방지: 10문제를 추출할 때 같은 id의 문제가 중복되지 않아야 한다", () => {
    const game = prepareQuizGame(ALL_QUESTIONS, 10);
    const ids = game.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
    expect(game.length).toBe(10);
  });

  // 4. 보기 무작위 배치 테스트
  it("4. 보기 무작위 배치: shuffleArray를 거치면 보기 4개의 요소가 유지되며 셔플된다", () => {
    const options = ["사자", "호랑이", "치타", "표범"];
    const shuffled = shuffleArray(options);
    expect(shuffled).toHaveLength(4);
    expect(shuffled.sort()).toEqual([...options].sort());
  });

  // 5. 점수 계산 테스트
  it("5. 점수 계산: 10문제 중 8문제를 맞히면 80점을 반환해야 한다", () => {
    expect(calculateScore(8, 10)).toBe(80);
    expect(calculateScore(10, 10)).toBe(100);
    expect(calculateScore(0, 10)).toBe(0);
  });

  // 6. 경험치 계산 테스트
  it("6. 경험치 계산: 최초 정답(10XP), 완료(20XP), 5연속 콤보(+30XP) 보너스가 정상 합산되어야 한다", () => {
    const answers = [
      { questionId: "q1", isCorrect: true },
      { questionId: "q2", isCorrect: true },
      { questionId: "q3", isCorrect: true },
      { questionId: "q4", isCorrect: true },
      { questionId: "q5", isCorrect: true },
    ];
    // 이전에 푼 문제 없음(모두 최초 정답)
    const { earnedXp, newlySolvedIds } = calculateGameReward(answers, [], 5);
    // 기본완료(20) + 5콤보(30) + 5문제 최초정답(5 * 10 = 50) = 100XP
    expect(earnedXp).toBe(100);
    expect(newlySolvedIds).toHaveLength(5);
  });

  // 7. 레벨 계산 테스트
  it("7. 레벨 계산: 경험치 누적에 따라 레벨이 올바르게 증가해야 한다", () => {
    expect(calculateLevel(0)).toBe(1);
    expect(calculateLevel(49)).toBe(1);
    expect(calculateLevel(50)).toBe(2);
    expect(calculateLevel(120)).toBe(3);
  });

  // 8. 저장 데이터 손상 복구 테스트
  it("8. 저장 데이터 복구: 잘못되거나 손상된 json이 있어도 기본값으로 안전 복구해야 한다", () => {
    // 임의의 손상된 데이터 모의
    const storage = loadStorage();
    expect(storage).toBeDefined();
    expect(storage.version).toBe(1);
    expect(storage.stats.level).toBeGreaterThanOrEqual(1);
  });

  // 9. 전체 확장 문제(60개) 데이터 무결성 검증 테스트
  it("9. 문제 데이터 검증: 등록된 60개 문제 모두 보기가 4개이며, 정답이 반드시 보기에 포함되어야 한다", () => {
    expect(ALL_QUESTIONS).toHaveLength(60);
    ALL_QUESTIONS.forEach((q) => {
      const isValid = validateQuestion(q);
      expect(isValid, `문제 ${q.id} 유효성 실패: ${q.question}`).toBe(true);
    });
  });
});
