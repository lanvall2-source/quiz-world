/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kids: {
          yellow: "#FFD028",
          orange: "#FF7B25",
          red: "#FF4D4D",
          pink: "#FF6584",
          purple: "#8B5CF6",
          blue: "#38BDF8",
          indigo: "#4F46E5",
          green: "#22C55E",
          mint: "#10B981",
          cream: "#FFFBEB",
        },
      },
      fontFamily: {
        kids: [
          "'Pretendard Variable'",
          "'NanumSquareRound'",
          "'Comic Sans MS'",
          "sans-serif",
        ],
      },
      boxShadow: {
        kid: "0 6px 0 0 rgba(0,0,0,0.12)",
        "kid-active": "0 2px 0 0 rgba(0,0,0,0.12)",
        "kid-hover": "0 8px 0 0 rgba(0,0,0,0.12)",
        card: "0 8px 24px -4px rgba(0,0,0,0.08)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pop: {
          "0%": { transform: "scale(0.9)" },
          "70%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.8s ease-in-out infinite",
        bounceSlow: "bounceSlow 2s ease-in-out infinite",
        pop: "pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};
