import React from "react";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { VALID_THEMES_IDS, ThemeID } from "./lib/themes";

import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;

  // undefined일 수 있는데 ThemeID라고 우김
  //  ❌ const theme: ThemeID = VALID_THEMES_IDS.includes(cookieTheme as ThemeID)
  // =>
  // ✅ string[]으로 바꿔서 string으로도 받게 만들고, undefined면 ""으로 대체 (원본은 타입 불일치는 as를 통해 억지로 우겨넣었음, 배열 타입을 넓혀 이를 자연스럽게 해결하고 undefined까지 명시적으로 처리 가능)

  (VALID_THEMES_IDS as string[]).includes(cookieTheme ?? "");
  const theme: ThemeID = VALID_THEMES_IDS.includes(cookieTheme as ThemeID)
    ? (cookieTheme as ThemeID)
    : "light";

  return (
    <html lang="ko" className={pretendard.variable} data-theme={theme}>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
