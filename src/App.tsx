import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { HomePage } from "@/pages/HomePage";
import { QuizPage } from "@/pages/QuizPage";
import { ResultPage } from "@/pages/ResultPage";
import { CollectionPage } from "@/pages/CollectionPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { loadStorage } from "@/lib/storage";
import type { UserSettings, UserStats } from "@/types";

export function App() {
  const [data, setData] = useState(() => loadStorage());

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
    <BrowserRouter>
      <div className="min-h-screen bg-[#FFFDF5] text-slate-800 flex flex-col">
        {/* 상단 글로벌 헤더 */}
        <Header stats={data.stats} />

        {/* 메인 콘텐츠 영역 (모바일 최적화 max-w-md) */}
        <main className="flex-1 max-w-md w-full mx-auto px-4 pt-4 pb-20">
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
            <Route
              path="/quiz/:categoryId/result"
              element={<ResultPage />}
            />
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

        {/* 하단 탭 네비게이션 */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
