"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TagResetButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasTags = searchParams.get("tag");

  if (!hasTags) return null;

  return (
    <button
      onClick={() => router.push("/")}
      className="text-xs cursor-pointer transition-colors"
      style={{ color: "var(--color-text-muted)" }}
    >
      초기화
    </button>
  );
};

export default TagResetButton;
