"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?page=${page}`);
  };

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  if (totalPages <= 1) return null;

  return (
    <nav
      className="inline-flex items-center gap-1 md:gap-2"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
        className="inline-flex items-center justify-center px-2 py-1  md:px-3 md:py-2 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors cursor-pointer disabled:cursor-not-allowed"
        aria-label="First page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 4L4 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 12L8 8L12 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="inline-flex items-center justify-center px-2 py-1 md:px-3 md:py-2 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors cursor-pointer disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="inline-flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`inline-flex items-center justify-center px-3 py-2 rounded-md transition-colors cursor-pointer hover:bg-gray-100 ${
              currentPage === page ? "bg-[#4d3c65] hover:bg-[#4d3c65]" : ""
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            <span
              className={`text-sm font-medium ${currentPage === page ? "text-white" : "text-gray-700"}`}
            >
              {page}
            </span>
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="inline-flex items-center justify-center px-2 py-1  md:px-3 md:py-2 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors cursor-pointer disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
        className="inline-flex items-center justify-center px-2 py-1 md:px-3 md:py-2 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors cursor-pointer disabled:cursor-not-allowed"
        aria-label="Last page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M4 4L8 8L4 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
