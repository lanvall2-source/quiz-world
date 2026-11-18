import React from "react";

interface Props {
  animalName: string;
  className?: string;
}

export function AnimalIllustration({ animalName, className = "" }: Props) {
  const getAnimalInfo = () => {
    if (animalName.includes("사자")) {
      return {
        emoji: "🦁",
        badge: "풍성한 황금 갈기 & 백수의 왕",
        habitat: "아프리카 사바나 🌾",
        scale: "scale-120",
      };
    }
    if (animalName.includes("기린")) {
      return {
        emoji: "🦒",
        badge: "5m가 넘는 긴 목과 보라색 혀",
        habitat: "따뜻한 아프리카 초원 🦒",
        scale: "scale-125",
      };
    }
    if (animalName.includes("북극곰")) {
      return {
        emoji: "🐻‍❄️",
        badge: "하얀 털과 수영을 잘하는 발",
        habitat: "차가운 북극 빙하 ❄️",
        scale: "scale-115",
      };
    }
    if (animalName.includes("코알라")) {
      return {
        emoji: "🐨",
        badge: "유칼립투스 잎 냠냠 & 잠꾸러기",
        habitat: "호주 유칼립투스 숲 🌿",
        scale: "scale-115",
      };
    }
    if (animalName.includes("치타")) {
      return {
        emoji: "🐆",
        badge: "시속 100km! 지상 최고의 달리기 왕",
        habitat: "넓은 사바나 초원 ⚡",
        scale: "scale-115",
      };
    }
    if (animalName.includes("펭귄")) {
      return {
        emoji: "🐧",
        badge: "턱시도를 입은 남극의 수영 천재",
        habitat: "남극의 얼음 바다 🌊",
        scale: "scale-115",
      };
    }
    if (animalName.includes("판다")) {
      return {
        emoji: "🐼",
        badge: "검은색과 흰색 털 & 대나무 먹방",
        habitat: "대나무 숲 🎋",
        scale: "scale-120",
      };
    }
    if (animalName.includes("하마")) {
      return {
        emoji: "🦛",
        badge: "150도로 쩌억 벌어지는 거대한 입",
        habitat: "강가와 늪지대 💧",
        scale: "scale-120",
      };
    }
    if (animalName.includes("캥거루")) {
      return {
        emoji: "🦘",
        badge: "아기를 품는 배 주머니 & 껑충 점프",
        habitat: "호주 대평원 🦘",
        scale: "scale-115",
      };
    }
    if (animalName.includes("고래상어")) {
      return {
        emoji: "🦈",
        badge: "등에 하얀 점박이 무늬 가득한 온순한 거인",
        habitat: "깊고 푸른 바다 🌊",
        scale: "scale-120",
      };
    }
    if (animalName.includes("코끼리")) {
      return {
        emoji: "🐘",
        badge: "손처럼 자유자재로 움직이는 긴 코",
        habitat: "아프리카 & 아시아 초원 🌾",
        scale: "scale-120",
      };
    }
    if (animalName.includes("호랑이")) {
      return {
        emoji: "🐯",
        badge: "용맹한 줄무늬와 숲속의 왕",
        habitat: "깊은 산림과 정글 🌲",
        scale: "scale-120",
      };
    }
    if (animalName.includes("돌고래")) {
      return {
        emoji: "🐬",
        badge: "초음파로 대화하는 똑똑한 바다 친구",
        habitat: "맑고 따뜻한 바다 🌊",
        scale: "scale-120",
      };
    }
    if (animalName.includes("카멜레온")) {
      return {
        emoji: "🦎",
        badge: "마음대로 변하는 몸 색깔과 360도 눈",
        habitat: "울창한 열대우림 🌴",
        scale: "scale-120",
      };
    }
    if (animalName.includes("수달")) {
      return {
        emoji: "🦦",
        badge: "배 위에 조개를 올려놓고 돌로 톡톡",
        habitat: "맑은 강과 호수 💧",
        scale: "scale-120",
      };
    }
    if (animalName.includes("부엉이") || animalName.includes("올빼미")) {
      return {
        emoji: "🦉",
        badge: "고개가 270도 돌아가는 밤의 사냥꾼",
        habitat: "달밤의 숲속 🌙",
        scale: "scale-120",
      };
    }

    return {
      emoji: "🐾",
      badge: "귀여운 동물 친구",
      habitat: "대자연 🌿",
      scale: "scale-100",
    };
  };

  const info = getAnimalInfo();

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
      <div className="mt-auto bg-white/95 border border-emerald-300/80 px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
        <span className="text-emerald-600 text-xs">🌿</span>
        <span className="text-slate-800 text-xs font-extrabold tracking-tight">
          {info.badge}
        </span>
      </div>
    </div>
  );
}
