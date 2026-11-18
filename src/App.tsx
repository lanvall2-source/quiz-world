import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { HomePage } from "@/pages/HomePage";
import { QuizPage } from "@/pages/QuizPage";
import { ResultPage } from "@/pages/ResultPage";
import { CollectionPage } from "@/pages/CollectionPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { loadStorage } from "@/lib/storage";
import type { UserSettings, UserStats } from "@/types";

function AppContent() {
  const [data, setData] = useState(() => loadStorage());
  const location = useLocation();

  // 퀴즈 진행 중일 때(결과 화면 제외) 상단 헤더와 하단 탭을 숨겨 모바일 한 화면 노스크롤 뷰 구현
  const isQuizActive =
    location.pathname.startsWith("/quiz/") && !location.pathname.endsWith("/result");

  const handleStatsUpdate = (newStats: UserStats) => {
    setData((prev) => ({ ...prev, stats: newStats }));
  };

  const handleSettingsUpdate = (newSettings: UserSettings) => {
    setData((prev) => ({ ...prev, settings: newSettings }));
  };

  const handleResetData = () => {
    setData(loadStorage());
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-slate-800 flex flex-col">
      {/* 퀴즈 푸는 동안에는 상단 헤더를 숨겨 소중한 세로 화면 공간 확보 */}
      {!isQuizActive && <Header stats={data.stats} />}

      {/* 메인 콘텐츠 영역: 퀴즈 푸는 동안에는 타이트한 패딩(p-2)으로 한 화면 뷰포트 최적화 */}
      <main
        className={`flex-1 max-w-md w-full mx-auto ${
          isQuizActive
            ? "px-3 py-2 flex flex-col justify-start overflow-hidden"
            : "px-4 pt-4 pb-20"
        }`}
      >
        <Routes>
          <Route path="/" element={<HomePage stats={data.stats} />} />
          <Route
            path="/quiz/:categoryId"
            element={
              <QuizPage
                stats={data.stats}
                settings={data.settings}
                onStatsUpdate={handleStatsUpdate}
              />
            }
          />
          <Route path="/quiz/:categoryId/result" element={<ResultPage />} />
          <Route
            path="/collection"
            element={<CollectionPage stats={data.stats} />}
          />
          <Route
            path="/settings"
            element={
              <SettingsPage
                settings={data.settings}
                onSettingsUpdate={handleSettingsUpdate}
                onResetData={handleResetData}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 퀴즈 푸는 동안에는 하단 전역 탭 네비게이션을 숨김 */}
      {!isQuizActive && <BottomNav />}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
