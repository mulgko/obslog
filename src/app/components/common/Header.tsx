import React from "react";
import Link from "next/link";
import {
  SquaresFourIcon,
  MagnifyingGlassIcon,
  SunIcon,
} from "@phosphor-icons/react/dist/ssr";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">
          Obslog
        </Link>

        <nav className="flex items-center gap-6">
          {/* 데스크탑: 텍스트 */}
          <Link
            href="/series"
            className="hidden sm:block text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Series
          </Link>
          <button
            aria-label="검색"
            className="hidden sm:block text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Search
          </button>
          <button
            aria-label="테마 변경"
            className="hidden sm:block text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Theme
          </button>

          {/* 모바일: 아이콘 */}
          <Link
            href="/series"
            aria-label="시리즈"
            className="sm:hidden text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <SquaresFourIcon size={20} weight="light" />
          </Link>
          <button
            aria-label="검색"
            className="sm:hidden text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <MagnifyingGlassIcon size={20} weight="light" />
          </button>
          <button
            aria-label="테마 변경"
            className="sm:hidden text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <SunIcon size={20} weight="light" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
