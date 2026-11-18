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

  // 기본 국기
  return (
    <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="200" fill="#3B82F6" rx="12" />
      <circle cx="150" cy="100" r="50" fill="#FBBF24" />
    </svg>
  );
}
