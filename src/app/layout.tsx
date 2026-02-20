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
  const theme: ThemeID = VALID_THEMES_IDS.includes(cookieTheme as ThemeID)
    ? (cookieTheme as ThemeID)
    : "light";

  return (
    <html lang="ko" className={pretendard.variable} data-theme={theme}>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
