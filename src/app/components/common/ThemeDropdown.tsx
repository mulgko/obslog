"use client";

import React, { useState, useRef, useEffect } from "react";
import { SunIcon } from "@phosphor-icons/react/dist/ssr";

import { THEMES, ThemeID } from "../../lib/themes";

const ThemeDropdown = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ThemeID>("light");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applied = document.documentElement.getAttribute(
      "data-theme",
    ) as ThemeID | null;
    if (applied && THEMES.some((t) => t.id === applied)) {
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

  const handleSelect = (id: ThemeID) => {
    setCurrent(id);
    document.documentElement.setAttribute("data-theme", id);
    const secure = location.protocol === "https:" ? ";Secure" : "";
    document.cookie = `theme=${id};path=/;max-age=31536000;SameSite=Lax${secure}`;
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* 데스크탑: 텍스트 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="테마 변경"
        aria-expanded={open}
        className="hidden sm:block text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        Theme
      </button>
      {/* 모바일: 아이콘 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="테마 변경"
        aria-expanded={open}
        className="sm:hidden text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        <SunIcon size={20} weight="bold" />
      </button>

      {open && (
        <div role="listbox" className="absolute right-0 top-full mt-2 w-44 rounded-xl py-1 z-50 dropdown-panel">
          {THEMES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              className={`w-full text-left px-4 py-2 text-xs transition-colors hover:bg-neutral-50 cursor-pointer ${
                current === id
                  ? "text-neutral-900 font-medium"
                  : "text-neutral-600"
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
