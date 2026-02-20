// 드롭다운 렌더링
export const THEMES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "glass", label: "Glassmorphism" },
] as const;

// 타입 안전성
export type ThemeID = (typeof THEMES)[number]["id"];

// 쿠키 유효검증에 사용
export const VALID_THEMES_IDS: ThemeID[] = THEMES.map((t) => t.id);
