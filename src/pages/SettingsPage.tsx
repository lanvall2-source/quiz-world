import React from "react";
import {
  Volume2,
  VolumeX,
  Eye,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { updateSettings, resetAllData } from "@/lib/storage";
import type { UserSettings, UserStats } from "@/types";

interface Props {
  settings: UserSettings;
  onSettingsUpdate: (newSettings: UserSettings) => void;
  onResetData: () => void;
}

export function SettingsPage({ settings, onSettingsUpdate, onResetData }: Props) {
  const toggleSound = () => {
    const updated = updateSettings({ soundEnabled: !settings.soundEnabled });
    onSettingsUpdate(updated);
  };

  const toggleReducedMotion = () => {
    const updated = updateSettings({ reducedMotion: !settings.reducedMotion });
    onSettingsUpdate(updated);
  };

  const handleReset = () => {
    if (
      window.confirm(
        "정말로 모든 도감과 경험치를 초기화하시겠습니까? (처음 상태로 되돌아갑니다)"
      )
    ) {
      resetAllData();
      onResetData();
      alert("게임 기록이 초기화되었습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-16 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl border-3 border-amber-200 p-5 shadow-card">
        <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
          <span>⚙️ 환경 설정</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          효과음과 화면 표시 방식을 조절할 수 있어요.
        </p>

        <div className="mt-5 flex flex-col divide-y divide-slate-100">
          {/* 효과음 토글 */}
          <div className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                {settings.soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </div>
              <div>
                <span className="font-bold text-sm text-slate-800 block">
                  효과음
                </span>
                <span className="text-xs text-slate-400">
                  {settings.soundEnabled ? "켜짐" : "꺼짐"}
                </span>
              </div>
            </div>

            <button
              onClick={toggleSound}
              className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${
                settings.soundEnabled ? "bg-orange-500" : "bg-slate-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-xs transform transition-transform ${
                  settings.soundEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* 움직임 감소 토글 */}
          <div className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-slate-800 block">
                  움직임 감소
                </span>
                <span className="text-xs text-slate-400">
                  화면 애니메이션 줄이기
                </span>
              </div>
            </div>

            <button
              onClick={toggleReducedMotion}
              className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${
                settings.reducedMotion ? "bg-purple-600" : "bg-slate-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-xs transform transition-transform ${
                  settings.reducedMotion ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 데이터 관리 및 초기화 카드 */}
      <div className="bg-white rounded-3xl border-3 border-amber-200 p-5 shadow-card">
        <h2 className="text-base font-black text-slate-800">기록 관리</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          모든 퀴즈 기록은 이 기기의 안전한 공간(LocalStorage)에 저장됩니다.
        </p>

        <button
          onClick={handleReset}
          className="mt-4 w-full py-3 px-4 rounded-2xl border-2 border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>도감 및 경험치 초기화하기</span>
        </button>
      </div>

      {/* 서비스 정보 */}
      <div className="text-center text-xs text-slate-400 space-y-1 pt-2">
        <p className="font-bold text-slate-500">
          🎮 퀴즈월드 (Quiz World) v1.0.0
        </p>
        <p>5~12세 어린이를 위한 무설치 무료 교육 퀴즈 웹게임</p>
        <p className="flex items-center justify-center gap-1 text-[11px] text-amber-600 mt-2 font-medium">
          <Heart className="w-3.5 h-3.5 fill-amber-500" />
          <span>온 가족이 함께 즐겨요</span>
        </p>
      </div>
    </div>
  );
}
