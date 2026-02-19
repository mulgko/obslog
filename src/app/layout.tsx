import React from "react";
import localFont from "next/font/local";
import { cookies } from "next/headers";
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
  const theme = cookieStore.get("theme")?.value ?? "light";

  return (
    <html lang="ko" className={pretendard.variable} data-theme={theme}>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
