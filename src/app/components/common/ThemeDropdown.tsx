"use client";

import React, { useState, useRef, useEffect } from "react";
import { SunIcon } from "@phosphor-icons/react/dist/ssr";

const themes = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "glass", label: "Glassmorphism" },
] as const;

type ThemeId = (typeof themes)[number]["id"];

const ThemeDropdown = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ThemeId>("light");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 서버에서 이미 data-theme을 설정했으므로 DOM에서 읽어 상태 동기화
    const applied = document.documentElement.getAttribute("data-theme") as ThemeId | null;
    if (applied && themes.some((t) => t.id === applied)) {
      setCurrent(applied);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (id: ThemeId) => {
    setCurrent(id);
    document.documentElement.setAttribute("data-theme", id);
    document.cookie = `theme=${id};path=/;max-age=31536000;SameSite=Lax`;
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Desktop: text */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change theme"
        className="hidden sm:block text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        Theme
      </button>
      {/* Mobile: icon */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change theme"
        className="sm:hidden text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        <SunIcon size={20} weight="bold" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-xl py-1 z-50 dropdown-panel">
          {themes.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                current === id
                  ? "font-medium"
                  : "opacity-60"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;
