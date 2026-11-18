import React from "react";

interface Props {
  dinoName: string;
  className?: string;
}

export function DinosaurIllustration({ dinoName, className = "" }: Props) {
  // 공룡별 고유 비주얼 테마 및 특징 뱃지
  const getDinoInfo = () => {
    if (dinoName.includes("티라노")) {
      return {
        emoji: "🦖",
        color: "from-red-500 via-orange-500 to-amber-600",
        badge: "날카로운 이빨 & 짧은 앞다리",
        habitat: "화산과 원시림 🌋",
        scale: "scale-120",
      };
    }
    if (dinoName.includes("트리케라")) {
      return {
        emoji: "🦏",
        color: "from-amber-600 via-yellow-600 to-orange-700",
        badge: "3개의 뿔 & 거대한 목 방패",
        habitat: "백악기 초원 🌾",
        scale: "scale-115",
      };
    }
    if (dinoName.includes("브라키오")) {
      return {
        emoji: "🦕",
        color: "from-emerald-500 via-teal-600 to-cyan-700",
        badge: "높은 구름에 닿는 기나긴 목",
        habitat: "거대한 침엽수림 🌲",
        scale: "scale-125",
      };
    }
    if (dinoName.includes("스테고")) {
      return {
        emoji: "🐊",
        color: "from-lime-600 via-green-600 to-emerald-700",
        badge: "등의 오각형 골판 & 꼬리 가시",
        habitat: "쥐라기 숲속 🌿",
        scale: "scale-115",
      };
    }
    if (dinoName.includes("프테라")) {
      return {
        emoji: "🦅",
        color: "from-sky-500 via-blue-600 to-indigo-700",
        badge: "하늘을 가르는 7m 거대한 날개",
        habitat: "바닷가 높은 절벽 ☁️",
        scale: "scale-120",
      };
    }
    if (dinoName.includes("안킬로")) {
      return {
        emoji: "🐢",
        color: "from-stone-600 via-neutral-700 to-zinc-800",
        badge: "단단한 뼈 갑옷 & 강력한 꼬리 곤봉",
        habitat: "바위투성이 언덕 🪨",
        scale: "scale-115",
      };
    }
    if (dinoName.includes("벨로키")) {
      return {
        emoji: "🐆",
        color: "from-amber-500 via-orange-600 to-red-600",
        badge: "낫 모양의 날카로운 갈고리 발톱",
        habitat: "사막과 덤불 덤불숲 🌵",
        scale: "scale-110",
      };
    }
    if (dinoName.includes("파키케")) {
      return {
        emoji: "🐏",
        color: "from-yellow-600 via-amber-700 to-orange-800",
        badge: "20cm 두께의 단단한 박치기 헬멧",
        habitat: "산악 바위 지대 ⛰️",
        scale: "scale-115",
      };
    }
    if (dinoName.includes("스피노")) {
      return {
        emoji: "🐊",
        color: "from-cyan-600 via-teal-700 to-blue-800",
        badge: "등의 커다란 돛 & 수영하는 악어 주둥이",
        habitat: "거대한 고대 늪지대 🌊",
        scale: "scale-120",
      };
    }
    if (dinoName.includes("파라사우")) {
      return {
        emoji: "🎺",
        color: "from-violet-500 via-purple-600 to-indigo-700",
        badge: "머리 뒤로 뻗은 나팔 소리 볏",
        habitat: "호숫가 갈대밭 🌾",
        scale: "scale-115",
      };
    }

    return {
      emoji: "🦖",
      color: "from-amber-500 to-orange-600",
      badge: "신비한 공룡",
      habitat: "원시림 🌿",
      scale: "scale-100",
    };
  };

  const info = getDinoInfo();

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center p-3 select-none ${className}`}>
      {/* 서식지 뱃지 */}
      <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-xs text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
        <span>{info.habitat}</span>
      </div>

      {/* 중앙 초대형 비주얼 그래픽 */}
      <div className="flex items-center justify-center my-auto transform hover:scale-110 transition-transform duration-300">
        <span className={`text-7xl sm:text-8xl drop-shadow-lg ${info.scale}`}>
          {info.emoji}
        </span>
      </div>

      {/* 하단 특징 힌트 리본 */}
      <div className="mt-auto bg-white/95 border border-amber-300/80 px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
        <span className="text-amber-600 text-xs">✨</span>
        <span className="text-slate-800 text-xs font-extrabold tracking-tight">
          {info.badge}
        </span>
      </div>
    </div>
  );
}
