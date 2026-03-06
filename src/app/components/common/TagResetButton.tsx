"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const TagResetButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasTags = searchParams.get("tag");

  // if (!hasTags) return null;

  return (
    <button
      aria-label="초기화"
      onClick={() => router.push("/")}
      className="text-xs text-ne cursor-pointer transition-colors"
      style={{ color: "var(--color-text-muted)" }}
    >
      <Image src="/refresh.svg" alt="refresh" width={16} height={16} />
    </button>
  );
};

export default TagResetButton;
