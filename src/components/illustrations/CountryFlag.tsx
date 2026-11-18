import React from "react";

interface Props {
  countryName: string;
  className?: string;
}

export function CountryFlag({ countryName, className = "" }: Props) {
  // 대한민국
  if (countryName.includes("대한민국") || countryName.includes("한국")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#FFFFFF" rx="12" />
        {/* 태극 문양 */}
        <g transform="translate(150, 100) rotate(-33.69)">
          <circle cx="0" cy="0" r="48" fill="#C60C30" />
          <path d="M -48,0 A 48,48 0 0,0 48,0 A 24,24 0 0,1 0,0 A 24,24 0 0,0 -48,0" fill="#003478" />
        </g>
        {/* 4괘 건곤감리 간이 정밀 렌더 */}
        <g fill="#000000">
          {/* 건 (좌상) */}
          <g transform="translate(65, 45) rotate(-33.69)">
            <rect x="-18" y="-12" width="36" height="5" rx="1" />
            <rect x="-18" y="-4" width="36" height="5" rx="1" />
            <rect x="-18" y="4" width="36" height="5" rx="1" />
          </g>
          {/* 곤 (우하) */}
          <g transform="translate(235, 155) rotate(-33.69)">
            <rect x="-18" y="-12" width="16" height="5" rx="1" /><rect x="2" y="-12" width="16" height="5" rx="1" />
            <rect x="-18" y="-4" width="16" height="5" rx="1" /><rect x="2" y="-4" width="16" height="5" rx="1" />
            <rect x="-18" y="4" width="16" height="5" rx="1" /><rect x="2" y="4" width="16" height="5" rx="1" />
          </g>
          {/* 감 (우상) */}
          <g transform="translate(235, 45) rotate(33.69)">
            <rect x="-18" y="-12" width="16" height="5" rx="1" /><rect x="2" y="-12" width="16" height="5" rx="1" />
            <rect x="-18" y="-4" width="36" height="5" rx="1" />
            <rect x="-18" y="4" width="16" height="5" rx="1" /><rect x="2" y="4" width="16" height="5" rx="1" />
          </g>
          {/* 리 (좌하) */}
          <g transform="translate(65, 155) rotate(33.69)">
            <rect x="-18" y="-12" width="36" height="5" rx="1" />
            <rect x="-18" y="-4" width="16" height="5" rx="1" /><rect x="2" y="-4" width="16" height="5" rx="1" />
            <rect x="-18" y="4" width="36" height="5" rx="1" />
          </g>
        </g>
      </svg>
    );
  }

  // 프랑스
  if (countryName.includes("프랑스")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="200" fill="#002654" rx="12" />
        <rect x="100" width="100" height="200" fill="#FFFFFF" />
        <rect x="200" width="100" height="200" fill="#ED2939" rx="12" />
      </svg>
    );
  }

  // 이집트
  if (countryName.includes("이집트")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="67" fill="#CE1126" rx="12" />
        <rect y="67" width="300" height="66" fill="#FFFFFF" />
        <rect y="133" width="300" height="67" fill="#000000" rx="12" />
        {/* 살라딘의 황금 독수리 */}
        <g transform="translate(150, 100) scale(0.6)" fill="#C09300">
          <path d="M -15,-20 Q 0,-30 15,-20 L 20,10 Q 0,25 -20,10 Z" />
          <path d="M -25,-10 L -35,5 L -15,5 Z" />
          <path d="M 25,-10 L 35,5 L 15,5 Z" />
        </g>
      </svg>
    );
  }

  // 미국
  if (countryName.includes("미국")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#FFFFFF" rx="12" />
        {/* 13 줄무늬 */}
        {[...Array(7)].map((_, i) => (
          <rect key={i} y={i * (200 / 6.5)} width="300" height={200 / 13} fill="#B22234" />
        ))}
        {/* 파란 캔톤 */}
        <rect width="130" height="108" fill="#3C3B6E" rx="12" />
        {/* 성조기 별 패턴 (간이 표현) */}
        <g fill="#FFFFFF" opacity="0.9">
          {[...Array(5)].map((_, r) =>
            [...Array(6)].map((_, c) => (
              <circle key={`${r}-${c}`} cx={16 + c * 20} cy={16 + r * 19} r="3" />
            ))
          )}
        </g>
      </svg>
    );
  }

  // 브라질
  if (countryName.includes("브라질")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#009739" rx="12" />
        {/* 노란 마름모 */}
        <polygon points="150,20 280,100 150,180 20,100" fill="#FEDD00" />
        {/* 파란 지구원 */}
        <circle cx="150" cy="100" r="46" fill="#012169" />
        {/* 흰색 띠 */}
        <path d="M 106,105 Q 150,85 194,102 Q 150,94 106,105" fill="#FFFFFF" />
        {/* 별들 */}
        <circle cx="140" cy="115" r="2.5" fill="#FFFFFF" />
        <circle cx="155" cy="120" r="2" fill="#FFFFFF" />
        <circle cx="160" cy="110" r="2.5" fill="#FFFFFF" />
        <circle cx="148" cy="128" r="2" fill="#FFFFFF" />
      </svg>
    );
  }

  // 이탈리아
  if (countryName.includes("이탈리아")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="200" fill="#008C45" rx="12" />
        <rect x="100" width="100" height="200" fill="#F4F5F0" />
        <rect x="200" width="100" height="200" fill="#CD212A" rx="12" />
      </svg>
    );
  }

  // 호주
  if (countryName.includes("호주") || countryName.includes("오스트레일리아")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#012169" rx="12" />
        {/* 좌상단 유니언잭 축소 */}
        <g transform="scale(0.5)">
          <rect width="300" height="200" fill="#012169" />
          <path d="M 0,0 L 300,200 M 300,0 L 0,200" stroke="#FFFFFF" strokeWidth="30" />
          <path d="M 0,0 L 300,200 M 300,0 L 0,200" stroke="#C8102E" strokeWidth="16" />
          <path d="M 150,0 V 200 M 0,100 H 300" stroke="#FFFFFF" strokeWidth="50" />
          <path d="M 150,0 V 200 M 0,100 H 300" stroke="#C8102E" strokeWidth="30" />
        </g>
        {/* 커먼웰스 스타 (큰 7각별) */}
        <circle cx="75" cy="150" r="16" fill="#FFFFFF" />
        {/* 남십자성 5개 별 */}
        <circle cx="240" cy="40" r="7" fill="#FFFFFF" />
        <circle cx="210" cy="90" r="7" fill="#FFFFFF" />
        <circle cx="270" cy="90" r="7" fill="#FFFFFF" />
        <circle cx="240" cy="150" r="9" fill="#FFFFFF" />
        <circle cx="255" cy="115" r="4.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // 영국
  if (countryName.includes("영국")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#012169" rx="12" />
        {/* 대각선 흰색 십자가 */}
        <path d="M 0,0 L 300,200 M 300,0 L 0,200" stroke="#FFFFFF" strokeWidth="36" />
        {/* 대각선 빨간색 십자가 */}
        <path d="M 0,0 L 300,200 M 300,0 L 0,200" stroke="#C8102E" strokeWidth="20" />
        {/* 직선 흰색 십자가 */}
        <path d="M 150,0 V 200 M 0,100 H 300" stroke="#FFFFFF" strokeWidth="60" />
        {/* 직선 빨간색 십자가 */}
        <path d="M 150,0 V 200 M 0,100 H 300" stroke="#C8102E" strokeWidth="36" />
      </svg>
    );
  }

  // 캐나다
  if (countryName.includes("캐나다")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="75" height="200" fill="#FF0000" rx="12" />
        <rect x="75" width="150" height="200" fill="#FFFFFF" />
        <rect x="225" width="75" height="200" fill="#FF0000" rx="12" />
        {/* 단풍잎 (Maple Leaf) 벡터 */}
        <g transform="translate(150, 100) scale(1.1)" fill="#FF0000">
          <path d="M 0,-45 L 8,-25 L 25,-32 L 20,-12 L 38,-8 L 30,12 L 15,10 L 12,25 L 3,25 L 1,40 L -1,40 L -3,25 L -12,25 L -15,10 L -30,12 L -38,-8 L -20,-12 L -25,-32 L -8,-25 Z" />
        </g>
      </svg>
    );
  }

  // 일본
  if (countryName.includes("일본")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#FFFFFF" rx="12" />
        <circle cx="150" cy="100" r="58" fill="#BC002D" />
      </svg>
    );
  }

  // 독일 (검정-빨강-노랑 가로 삼색)
  if (countryName.includes("독일")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="66.6" fill="#000000" rx="12" />
        <rect y="66.6" width="300" height="66.6" fill="#DD0000" />
        <rect y="133.2" width="300" height="66.8" fill="#FFCE00" rx="12" />
      </svg>
    );
  }

  // 스페인 (빨강-노랑-빨강 가로 삼색)
  if (countryName.includes("스페인")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="50" fill="#AA151B" rx="12" />
        <rect y="50" width="300" height="100" fill="#F1BF00" />
        <rect y="150" width="300" height="50" fill="#AA151B" rx="12" />
        {/* 스페인 왕실 문장 약식 */}
        <g transform="translate(85, 100) scale(0.7)">
          <rect x="-20" y="-30" width="40" height="60" rx="8" fill="#AA151B" stroke="#F1BF00" strokeWidth="4" />
          <circle cx="0" cy="-5" r="12" fill="#F1BF00" />
        </g>
      </svg>
    );
  }

  // 멕시코 (초록-하양-빨강 세로 삼색)
  if (countryName.includes("멕시코")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="200" fill="#006847" rx="12" />
        <rect x="100" width="100" height="200" fill="#FFFFFF" />
        <rect x="200" width="100" height="200" fill="#CE1126" rx="12" />
        {/* 선인장 위 독수리 문장 */}
        <g transform="translate(150, 100) scale(0.8)">
          <circle cx="0" cy="0" r="28" fill="#92673B" />
          <path d="M -15,10 Q 0,25 15,10 L 0,-15 Z" fill="#006847" />
          <path d="M -10,-8 L 0,-20 L 10,-8 Z" fill="#C59B27" />
        </g>
      </svg>
    );
  }

  // 베트남 (빨간 바탕 중앙 황금별)
  if (countryName.includes("베트남")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#DA251D" rx="12" />
        {/* 황금빛 오각별 */}
        <g transform="translate(150, 100) scale(1.3)" fill="#FFFF00">
          <polygon points="0,-40 12,-12 40,-12 18,6 26,34 0,18 -26,34 -18,6 -40,-12 -12,-12" />
        </g>
      </svg>
    );
  }

  // 아르헨티나 (하늘색-하양-하늘색 + 5월의 태양)
  if (countryName.includes("아르헨티나")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="66.6" fill="#74ACDF" rx="12" />
        <rect y="66.6" width="300" height="66.6" fill="#FFFFFF" />
        <rect y="133.2" width="300" height="66.8" fill="#74ACDF" rx="12" />
        {/* 5월의 태양 */}
        <g transform="translate(150, 100)">
          <circle cx="0" cy="0" r="18" fill="#F6B40E" stroke="#85340A" strokeWidth="1" />
          {/* 태양 광선 16개 */}
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="-20"
              x2="0"
              y2="-27"
              stroke="#F6B40E"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      </svg>
    );
  }

  // 인도 (주황-하양-초록 + 아소카 차크라)
  if (countryName.includes("인도")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="66.6" fill="#FF9933" rx="12" />
        <rect y="66.6" width="300" height="66.6" fill="#FFFFFF" />
        <rect y="133.2" width="300" height="66.8" fill="#138808" rx="12" />
        {/* 아소카 차크라 (남색 수레바퀴) */}
        <g transform="translate(150, 100)">
          <circle cx="0" cy="0" r="20" fill="none" stroke="#000080" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="4" fill="#000080" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2="0"
              y2="-19"
              stroke="#000080"
              strokeWidth="1.5"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      </svg>
    );
  }

  // 스위스 (빨간 바탕 중앙 백십자)
  if (countryName.includes("스위스")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#D52B1E" rx="12" />
        {/* 하얀 십자가 */}
        <g fill="#FFFFFF">
          <rect x="132" y="45" width="36" height="110" rx="4" />
          <rect x="95" y="82" width="110" height="36" rx="4" />
        </g>
      </svg>
    );
  }

  // 그리스 (파랑 하양 9줄무늬 + 십자가)
  if (countryName.includes("그리스")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* 9개 가로 줄무늬 */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect
            key={i}
            y={i * 22.22}
            width="300"
            height="22.23"
            fill={i % 2 === 0 ? "#0D5EAF" : "#FFFFFF"}
          />
        ))}
        {/* 좌상단 캔톤 & 십자가 */}
        <rect width="111" height="111" fill="#0D5EAF" rx="8" />
        <rect x="42" y="0" width="27" height="111" fill="#FFFFFF" />
        <rect x="0" y="42" width="111" height="27" fill="#FFFFFF" />
      </svg>
    );
  }

  // 스웨덴 (파란 바탕 노란 십자가)
  if (countryName.includes("스웨덴")) {
    return (
      <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#006AA7" rx="12" />
        {/* 노르딕 십자가 */}
        <rect x="90" width="36" height="200" fill="#FECC00" />
        <rect y="82" width="300" height="36" fill="#FECC00" />
      </svg>
    );
  }

  // 기본 국기
  return (
    <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="200" fill="#3B82F6" rx="12" />
      <circle cx="150" cy="100" r="50" fill="#FBBF24" />
    </svg>
  );
}
