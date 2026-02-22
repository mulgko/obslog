"use client";

import React, { useState, useRef, useEffect } from "react";
import { SunIcon } from "@phosphor-icons/react/dist/ssr";

import { THEMES, ThemeID } from "../../lib/themes";

// 트리거 버튼과 메뉴를 aria-controls로 연결하기 위한 고정 ID
const MENU_ID = "theme-menu";

const ThemeDropdown = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ThemeID>("light");
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // 메뉴가 열릴 때 현재 선택된 항목(없으면 첫 번째)으로 포커스 이동
  useEffect(() => {
    if (open && menuRef.current) {
      const items =
        menuRef.current.querySelectorAll<HTMLButtonElement>(
          '[role="menuitem"]',
        );
      const currentIndex = THEMES.findIndex((t) => t.id === current);
      const target = items[currentIndex] ?? items[0];
      target?.focus();
    }
  }, [open, current]);

  const handleSelect = (id: ThemeID) => {
    setCurrent(id);
    document.documentElement.setAttribute("data-theme", id);
    const secure = location.protocol === "https:" ? ";Secure" : "";
    document.cookie = `theme=${id};path=/;max-age=31536000;SameSite=Lax${secure}`;
    setOpen(false);
  };

  // WAI-ARIA menu 패턴: 메뉴 내부 탐색은 화살표 키로, Tab은 메뉴를 닫고 다음 요소로 이동
  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!menuRef.current) return;
    const items = Array.from(
      menuRef.current.querySelectorAll<HTMLButtonElement>('[role="menuitem"]'),
    );
    const index = items.indexOf(document.activeElement as HTMLButtonElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* 데스크탑: 텍스트 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="테마 변경"
        // 드롭다운이 열려 있는지 닫혀 있는지 스크린 리더에 알린다.
        // 스크린 리더는 "테마 변경, 펼침/접힘" 형태로 읽어 현재 상태를 안내한다.
        aria-expanded={open}
        // 이 버튼을 누르면 menu 역할의 팝업이 열린다는 것을 스크린 리더에 미리 알린다.
        // 덕분에 사용자가 버튼에 포커스를 두는 순간 "메뉴 팝업" 이라는 힌트를 받을 수 있다.
        // listbox가 아닌 menu인 이유: listbox는 값 선택(select), menu는 액션 실행 용도.
        // 테마 변경은 side effect(쿠키 저장, DOM 조작)를 수반하므로 menu가 의미적으로 정확하다.
        aria-haspopup="menu"
        // aria-controls: 이 버튼이 제어하는 메뉴 요소를 ID로 명시적으로 연결한다.
        // 보조 기술(AT)이 버튼과 메뉴의 관계를 프로그래밍적으로 파악할 수 있다.
        aria-controls={MENU_ID}
        className="hidden sm:block text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        Theme
      </button>
      {/* 모바일: 아이콘 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="테마 변경"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={MENU_ID}
        className="sm:hidden text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
      >
        <SunIcon size={20} weight="bold" />
      </button>

      {open && (
        // WAI-ARIA: role="menu" + role="menuitem" 조합
        // role="listbox"는 반드시 role="option" 자식을 가져야 하며, <button>을 자식으로 두면 명세 위반이다.
        // role="menu"는 <button>(menuitem)을 자식으로 허용하고, 스크린 리더가 올바르게 탐색할 수 있다.
        <div
          ref={menuRef}
          id={MENU_ID}
          role="menu"
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 top-full mt-2 w-44 rounded-xl py-1 z-50 dropdown-panel"
        >
          {THEMES.map(({ id, label }) => (
            // role="menuitem": 이 버튼이 메뉴 안의 하나의 항목임을 스크린 리더에 전달한다.
            // tabIndex={-1}: Tab 순환에서는 제외하고 화살표 키로만 포커스를 받는다.
            //   메뉴가 열릴 때 useEffect에서 프로그래밍적으로 focus()를 호출하므로 접근 가능하다.
            <button
              key={id}
              role="menuitem"
              tabIndex={-1}
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
