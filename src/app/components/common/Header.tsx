import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FoldersIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/dist/ssr";
// import ThemeDropdown from "./ThemeDropdown";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight"
        >
          <Image src="/obsidian-icon.svg" alt="Obslog" width={16} height={16} />
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
          {/* <ThemeDropdown /> */}
          <ThemeToggle />

          <button
            aria-label="검색"
            className="hidden sm:block text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <Image src="/Search.svg" alt="검색" width={16} height={16} />
          </button>
          <button
            aria-label="그래프 뷰"
            className="hidden sm:block text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <Image
              src="/Git branch.svg"
              alt="Git branch"
              width={16}
              height={16}
            />
          </button>

          {/* 모바일: 아이콘 */}
          <Link
            href="/series"
            aria-label="시리즈"
            className="sm:hidden text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <FoldersIcon size={20} weight="bold" />
          </Link>
          <button
            aria-label="검색"
            className="sm:hidden text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <MagnifyingGlassIcon size={20} weight="bold" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
