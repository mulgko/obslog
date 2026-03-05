"use client";
import React from "react";

import { useSearchParams, useRouter } from "next/navigation";

const TagFilter = ({ tag }: { tag: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tags = searchParams.get("tag")?.split(",").filter(Boolean) || [];

  const checked = tags.includes(tag);

  const onChange = () => {
    if (checked) {
      tags.splice(tags.indexOf(tag), 1);
    } else {
      tags.push(tag);
    }
    const query = tags.length > 0 ? `?tag=${tags.join(",")}` : "";

    router.push(`/${query}`);
  };

  return (
    <li className="flex items-center self-stretch w-full">
      <label className="flex items-center gap-2 cursor-pointer w-full rounded-md px-1 transition-colors tag-filter-label">
        <input
          type="checkbox"
          value={tag}
          checked={checked}
          onChange={onChange}
          className="sr-only"
          aria-label={tag}
        />
        <span
          className="h-7 flex items-center justify-center"
          aria-hidden="true"
        >
          {checked ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect width="18" height="18" rx="2" fill="#4d3c65" />
              <path
                d="M4 9L7.5 12.5L14 6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect
                x="0.5"
                y="0.5"
                width="17"
                height="17"
                rx="1.5"
                stroke="#5e5e5e"
              />
            </svg>
          )}
        </span>
        <span
          className="text-sm font-bold capitalize"
          style={{
            color: checked ? "var(--color-text)" : "var(--color-text-muted)",
          }}
        >
          {tag}
        </span>
      </label>
    </li>
  );
};

export default TagFilter;
