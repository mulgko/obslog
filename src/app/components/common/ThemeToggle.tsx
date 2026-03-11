"use client";

import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@phosphor-icons/react/dist/ssr";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const applied = document.documentElement.getAttribute("data-theme");
    setIsDark(applied === "dark");
  }, []);

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", next);
    const secure = location.protocol === "https:" ? ";Secure" : "";
    document.cookie = `theme=${next};path=/;max-age=31536000;SameSite=Lax${secure}`;
  };

  return (
    <button
      onClick={toggle}
      aria-label="테마 변경"
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${isDark ? "bg-[#4d3c65]" : "bg-neutral-300"}`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 flex items-center justify-center ${isDark ? "translate-x-5" : "translate-x-0"}`}
      >
        {isDark
          ? <MoonIcon size={10} weight="fill" className="text-[#7c5cbf]" />
          : <SunIcon size={10} weight="fill" className="text-orange-400" />
        }
      </span>
    </button>
  );
};

export default ThemeToggle;
