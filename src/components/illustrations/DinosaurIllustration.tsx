import React from "react";

interface Props {
  dinoName: string;
  className?: string;
}

export function DinosaurIllustration({ dinoName, className = "" }: Props) {
  // 10종 공룡 전용 정밀 SVG 렌더러
  const renderDinoSvg = () => {
    // 1. 티라노사우루스 (T-Rex)
    if (dinoName.includes("티라노")) {
      return (
        <svg viewBox="0 0 200 160" className="w-40 h-32 sm:w-48 sm:h-36 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          {/* 꼬리와 몸통 */}
          <path d="M 30,130 Q 70,80 120,70 L 140,40 Q 170,30 185,50 L 190,75 L 165,85 L 155,75 Q 140,110 110,135 Q 70,145 30,130 Z" fill="#E05638" />
          {/* 아래턱 & 입안 날카로운 이빨 */}
          <path d="M 165,85 L 188,78 L 175,95 Z" fill="#992612" />
          <path d="M 166,73 L 170,78 L 174,73 L 178,78 L 182,73 L 186,78" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          {/* 눈 */}
          <circle cx="160" cy="50" r="4" fill="#FFE600" />
          <circle cx="161" cy="50" r="2" fill="#000000" />
          {/* 사나운 눈썹 */}
          <path d="M 154,45 L 168,48" stroke="#7A1806" strokeWidth="2.5" strokeLinecap="round" />
          {/* 짧고 귀여운 앞다리 */}
          <path d="M 135,85 L 142,92 L 146,89" stroke="#B8391F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* 튼튼한 뒷다리와 발톱 */}
          <path d="M 115,100 Q 130,120 120,145 L 132,148 L 115,148" fill="#B8391F" />
          <path d="M 90,110 Q 105,125 98,148 L 110,150 L 92,150" fill="#E05638" />
          {/* 등 줄무늬 */}
          <path d="M 95,75 L 100,88 L 105,75 M 115,72 L 120,85 L 125,72" stroke="#B8391F" strokeWidth="3" fill="none" />
        </svg>
      );
    }

    // 2. 트리케라톱스
    if (dinoName.includes("트리케라")) {
      return (
        <svg viewBox="0 0 200 160" className="w-40 h-32 sm:w-48 sm:h-36 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          {/* 몸통 & 꼬리 */}
          <ellipse cx="90" cy="100" rx="60" ry="35" fill="#588157" />
          <path d="M 35,100 Q 15,110 5,125 Q 25,115 45,112 Z" fill="#588157" />
          {/* 다리 4개 */}
          <rect x="50" y="115" width="16" height="32" rx="6" fill="#3A5A40" />
          <rect x="75" y="118" width="16" height="30" rx="6" fill="#588157" />
          <rect x="110" y="115" width="16" height="32" rx="6" fill="#3A5A40" />
          <rect x="130" y="118" width="16" height="30" rx="6" fill="#588157" />
          {/* 커다란 목 방패(프릴) */}
          <path d="M 125,50 Q 150,25 175,55 Q 185,85 160,95 Z" fill="#3A5A40" stroke="#344E41" strokeWidth="2" />
          {/* 머리 */}
          <path d="M 135,70 Q 175,75 190,100 L 160,110 Z" fill="#588157" />
          {/* 눈 */}
          <circle cx="155" cy="80" r="3.5" fill="#FFFFFF" />
          <circle cx="156" cy="80" r="2" fill="#000000" />
          {/* 3개의 뿔 (코뿔 1 + 눈 위 뿔 2) */}
          <polygon points="185,95 200,90 185,102" fill="#DAD7CD" stroke="#A3B18A" strokeWidth="1" />
          <polygon points="152,72 178,42 160,75" fill="#DAD7CD" stroke="#A3B18A" strokeWidth="1" />
          <polygon points="144,70 168,38 152,72" fill="#ECEFE6" stroke="#A3B18A" strokeWidth="1" />
        </svg>
      );
    }

    // 3. 브라키오사우루스
    if (dinoName.includes("브라키오")) {
      return (
        <svg viewBox="0 0 200 160" className="w-40 h-32 sm:w-48 sm:h-36 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          {/* 기나긴 목 & 머리 */}
          <path d="M 100,110 Q 130,70 145,25 Q 155,10 165,20 Q 170,30 155,40 Q 140,85 125,115 Z" fill="#40916C" />
          {/* 눈 */}
          <circle cx="158" cy="22" r="2.5" fill="#000000" />
          {/* 둥근 몸통 & 긴 꼬리 */}
          <ellipse cx="85" cy="115" rx="45" ry="25" fill="#52B788" />
          <path d="M 45,115 Q 20,120 5,105 Q 15,130 40,125 Z" fill="#52B788" />
          {/* 다리 4개 (앞다리가 뒷다리보다 긺) */}
          <rect x="52" y="125" width="14" height="26" rx="5" fill="#2D6A4F" />
          <rect x="70" y="128" width="14" height="24" rx="5" fill="#52B788" />
          <rect x="95" y="122" width="15" height="30" rx="5" fill="#2D6A4F" />
          <rect x="115" y="125" width="15" height="28" rx="5" fill="#52B788" />
          {/* 등 무늬 */}
          <circle cx="75" cy="105" r="4" fill="#74C69D" />
          <circle cx="90" cy="108" r="5" fill="#74C69D" />
          <circle cx="105" cy="107" r="4" fill="#74C69D" />
        </svg>
      );
    }

    // 4. 스테고사우루스
    if (dinoName.includes("스테고")) {
      return (
        <svg viewBox="0 0 200 160" className="w-40 h-32 sm:w-48 sm:h-36 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          {/* 등 위의 오각형 골판들 */}
          <polygon points="60,85 70,55 80,85" fill="#D97706" />
          <polygon points="80,80 95,45 110,80" fill="#F59E0B" />
          <polygon points="110,80 125,48 140,82" fill="#D97706" />
          <polygon points="135,85 145,60 155,90" fill="#F59E0B" />
          {/* 몸통 */}
          <ellipse cx="105" cy="105" rx="50" ry="26" fill="#15803D" />
          {/* 작은 머리 */}
          <path d="M 150,105 Q 180,115 185,122 L 160,125 Z" fill="#15803D" />
          <circle cx="175" cy="116" r="2" fill="#000000" />
          {/* 꼬리와 4개의 뾰족한 가시 */}
          <path d="M 60,105 Q 30,110 15,100 L 40,118 Z" fill="#15803D" />
          <line x1="22" y1="102" x2="10" y2="90" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="106" x2="8" y2="100" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="25" y1="102" x2="16" y2="88" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          {/* 다리 4개 */}
          <rect x="75" y="118" width="14" height="26" rx="5" fill="#166534" />
          <rect x="92" y="120" width="14" height="24" rx="5" fill="#15803D" />
          <rect x="120" y="118" width="14" height="26" rx="5" fill="#166534" />
          <rect x="136" y="120" width="14" height="24" rx="5" fill="#15803D" />
        </svg>
      );
    }

    // 5. 프테라노돈 (익룡)
    if (dinoName.includes("프테라")) {
      return (
        <svg viewBox="0 0 200 160" className="w-44 h-32 sm:w-52 sm:h-36 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          {/* 거대한 양 날개 */}
          <path d="M 100,80 Q 50,30 10,40 Q 40,90 90,95 Z" fill="#0284C7" />
          <path d="M 100,80 Q 150,30 190,40 Q 160,90 110,95 Z" fill="#38BDF8" />
          {/* 몸통 */}
          <ellipse cx="100" cy="90" rx="12" ry="22" fill="#0369A1" />
          {/* 긴 볏 & 부리 머리 */}
          <polygon points="100,75 80,45 105,65" fill="#EA580C" />
          <polygon points="100,70 145,85 102,80" fill="#F97316" />
          <circle cx="102" cy="72" r="2.5" fill="#000000" />
        </svg>
      );
    }

    // 6. 안킬로사우루스 (갑옷 & 꼬리곤봉)
    if (dinoName.includes("안킬로")) {
      return (
        <svg viewBox="0 0 200 160" className="w-40 h-32 sm:w-48 sm:h-36 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          {/* 단단한 갑옷 등껍질 */}
          <path d="M 60,110 Q 105,65 150,110 Z" fill="#78716C" stroke="#44403C" strokeWidth="2" />
          {/* 등갑 뿔 돌기들 */}
          <polygon points="75,95 80,82 85,95" fill="#E7E5E4" />
          <polygon points="95,85 102,70 109,85" fill="#E7E5E4" />
          <polygon points="120,88 127,74 134,88" fill="#E7E5E4" />
          {/* 머리 */}
          <path d="M 145,105 Q 175,108 178,118 L 148,122 Z" fill="#57534E" />
          <circle cx="165" cy="112" r="2" fill="#000000" />
          {/* 다리 */}
          <rect x="75" y="118" width="15" height="20" rx="4" fill="#44403C" />
          <rect x="130" y="118" width="15" height="20" rx="4" fill="#44403C" />
          {/* 꼬리와 무거운 뼈 곤봉 */}
          <path d="M 65,112 L 25,120" stroke="#57534E" strokeWidth="8" strokeLinecap="round" />
          <circle cx="20" cy="122" r="14" fill="#292524" />
          <circle cx="18" cy="120" r="10" fill="#44403C" />
        </svg>
      );
    }

    // 7. 벨로키랍토르
    if (dinoName.includes("벨로키")) {
      return (
        <svg viewBox="0 0 200 160" className="w-40 h-32 sm:w-48 sm:h-36 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          {/* 긴 꼬리 & 날렵한 몸통 */}
          <path d="M 20,70 Q 60,105 105,95 L 145,65 L 175,60 L 165,75 L 140,80 Q 110,120 70,110 Z" fill="#D97706" />
          <circle cx="155" cy="67" r="3" fill="#000000" />
          {/* 날카로운 앞발 */}
          <path d="M 130,85 L 142,95 L 138,98" stroke="#B45309" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* 뒷다리 & 낫 모양 커다란 갈고리 발톱 */}
          <path d="M 95,98 Q 115,120 105,145 L 125,145" stroke="#B45309" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* 치명적인 갈고리 발톱 강조 */}
          <path d="M 115,138 Q 128,130 120,146" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      );
    }

    // 8. 파키케팔로사우루스 (박치기)
    if (dinoName.includes("파키케")) {
      return (
        <svg viewBox="0 0 200 160" className="w-40 h-32 sm:w-48 sm:h-36 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          {/* 몸통 & 꼬리 */}
          <ellipse cx="90" cy="110" rx="45" ry="25" fill="#A16207" />
          <path d="M 50,110 L 15,125" stroke="#A16207" strokeWidth="10" strokeLinecap="round" />
          <rect x="75" y="125" width="14" height="24" rx="4" fill="#713F12" />
          <rect x="105" y="125" width="14" height="24" rx="4" fill="#713F12" />
          {/* 목과 머리 */}
          <path d="M 115,105 L 140,75 L 165,95 L 135,115 Z" fill="#CA8A04" />
          {/* 볼록하고 단단한 돔형 박치기 머리뼈 */}
          <path d="M 130,70 Q 150,38 168,68 Z" fill="#FEF08A" stroke="#EAB308" strokeWidth="2.5" />
          {/* 머리 주변 뼈 돌기 */}
          <circle cx="168" cy="72" r="3" fill="#FEF08A" />
          <circle cx="172" cy="78" r="3" fill="#FEF08A" />
          <circle cx="145" cy="80" r="2.5" fill="#000000" />
        </svg>
      );
    }

    // 9. 스피노사우루스 (등 돛 & 악어 주둥이)
    if (dinoName.includes("스피노")) {
      return (
        <svg viewBox="0 0 200 160" className="w-42 h-32 sm:w-50 sm:h-36 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          {/* 등 위의 거대한 부채 모양 돛 */}
          <path d="M 60,95 Q 100,30 145,95 Z" fill="#0D9488" stroke="#115E59" strokeWidth="2" />
          <path d="M 75,90 L 80,48 M 95,85 L 100,38 M 115,85 L 120,44 M 130,90 L 135,58" stroke="#14B8A6" strokeWidth="2" />
          {/* 긴 몸통 & 악어형 긴 주둥이 머리 */}
          <ellipse cx="95" cy="110" rx="50" ry="24" fill="#0F766E" />
          <path d="M 50,110 L 15,105" stroke="#0F766E" strokeWidth="10" strokeLinecap="round" />
          {/* 악어 주둥이 머리 */}
          <path d="M 135,100 L 185,102 L 180,115 L 138,118 Z" fill="#115E59" />
          <path d="M 148,107 L 180,107" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="2,3" />
          <circle cx="150" cy="98" r="2.5" fill="#FDE047" />
          {/* 다리 */}
          <rect x="75" y="120" width="14" height="25" rx="4" fill="#134E4A" />
          <rect x="110" y="120" width="14" height="25" rx="4" fill="#134E4A" />
        </svg>
      );
    }

    // 10. 파라사우롤로푸스 (소리 볏)
    if (dinoName.includes("파라사우")) {
      return (
        <svg viewBox="0 0 200 160" className="w-40 h-32 sm:w-48 sm:h-36 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
          {/* 몸통 */}
          <ellipse cx="95" cy="115" rx="45" ry="25" fill="#7C3AED" />
          <path d="M 55,115 L 20,110" stroke="#7C3AED" strokeWidth="10" strokeLinecap="round" />
          <rect x="75" y="125" width="14" height="24" rx="4" fill="#5B21B6" />
          <rect x="110" y="125" width="14" height="24" rx="4" fill="#5B21B6" />
          {/* 머리와 뒤로 길게 뻗은 나팔 볏 */}
          <path d="M 125,105 L 155,80 L 175,95 L 140,115 Z" fill="#8B5CF6" />
          {/* 뒤로 솟구친 긴 관(Crest) */}
          <path d="M 148,78 Q 120,45 95,50 Q 120,62 142,85 Z" fill="#F43F5E" stroke="#E11D48" strokeWidth="1.5" />
          <circle cx="152" cy="85" r="2.5" fill="#000000" />
        </svg>
      );
    }

    // 기본 공룡 실루엣
    return (
      <svg viewBox="0 0 200 160" className="w-40 h-32 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="90" rx="40" ry="25" fill="#F59E0B" />
      </svg>
    );
  };

  const getDinoHabitat = () => {
    if (dinoName.includes("티라노")) return "화산과 원시림 🌋";
    if (dinoName.includes("트리케라")) return "백악기 대초원 🌾";
    if (dinoName.includes("브라키오")) return "거대한 침엽수림 🌲";
    if (dinoName.includes("스테고")) return "쥐라기 숲속 🌿";
    if (dinoName.includes("프테라")) return "바닷가 높은 절벽 ☁️";
    if (dinoName.includes("안킬로")) return "단단한 바위 언덕 🪨";
    if (dinoName.includes("벨로키")) return "사막과 덤불숲 🌵";
    if (dinoName.includes("파키케")) return "산악 바위 지대 ⛰️";
    if (dinoName.includes("스피노")) return "거대한 고대 늪지대 🌊";
    if (dinoName.includes("파라사우")) return "호숫가 갈대밭 🌾";
    return "원시 자연 🌿";
  };

  const getDinoFeature = () => {
    if (dinoName.includes("티라노")) return "날카로운 이빨 & 강력한 턱";
    if (dinoName.includes("트리케라")) return "3개의 뿔 & 거대한 목 방패";
    if (dinoName.includes("브라키오")) return "구름에 닿는 기나긴 목";
    if (dinoName.includes("스테고")) return "등의 오각형 골판 & 꼬리 가시";
    if (dinoName.includes("프테라")) return "하늘을 나는 거대한 날개";
    if (dinoName.includes("안킬로")) return "단단한 뼈 갑옷 & 꼬리 곤봉";
    if (dinoName.includes("벨로키")) return "낫 모양 날카로운 갈고리 발톱";
    if (dinoName.includes("파키케")) return "두껍고 단단한 박치기 머리뼈";
    if (dinoName.includes("스피노")) return "등 위의 커다란 부채 모양 돛";
    if (dinoName.includes("파라사우")) return "머리 뒤로 뻗은 나팔 소리 볏";
    return "신비한 공룡의 특징";
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-between p-2 select-none ${className}`}>
      {/* 우상단 서식지 뱃지 */}
      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-xs text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs z-10">
        <span>{getDinoHabitat()}</span>
      </div>

      {/* 중앙 정통 공룡 벡터 일러스트 SVG */}
      <div className="flex items-center justify-center my-auto transform hover:scale-105 transition-transform duration-300">
        {renderDinoSvg()}
      </div>

      {/* 하단 핵심 특징 리본 */}
      <div className="bg-white/95 border border-amber-300/80 px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 z-10">
        <span className="text-amber-600 text-xs">✨</span>
        <span className="text-slate-800 text-xs font-extrabold tracking-tight">
          {getDinoFeature()}
        </span>
      </div>
    </div>
  );
}
