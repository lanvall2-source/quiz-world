import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Settings } from "lucide-react";

export function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      to: "/",
      label: "홈",
      icon: Home,
      isActive: currentPath === "/" || currentPath.startsWith("/quiz"),
    },
    {
      to: "/collection",
      label: "도감",
      icon: BookOpen,
      isActive: currentPath === "/collection",
    },
    {
      to: "/settings",
      label: "설정",
      icon: Settings,
      isActive: currentPath === "/settings",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-amber-200 shadow-lg">
      <div className="max-w-md mx-auto px-6 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[52px] rounded-2xl transition-all duration-200 ${
                item.isActive
                  ? "text-orange-600 scale-105 font-extrabold"
                  : "text-slate-400 hover:text-slate-600 font-medium"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-colors ${
                  item.isActive ? "bg-orange-100" : ""
                }`}
              >
                <Icon className={`w-5 h-5 ${item.isActive ? "stroke-[2.5]" : "stroke-2"}`} />
              </div>
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
