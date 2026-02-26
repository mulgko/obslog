"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

const Pagiantion = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  return (
    <div>
      <button disabled={currentPage === 1}>Previous</button>
      <button disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default Pagiantion;
