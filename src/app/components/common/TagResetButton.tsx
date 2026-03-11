"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const TagResetButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasTags = searchParams.get("tag");

  if (!hasTags) return null;

  return (
    <button
      type="button"
      aria-label="초기화"
      onClick={() => router.push("/")}
      className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
    >
      <Image src="/refresh.svg" alt="refresh" width={16} height={16} />
    </button>
  );
};

export default TagResetButton;
