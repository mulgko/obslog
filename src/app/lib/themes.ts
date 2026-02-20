// 드롭다운 렌더링
export const THEMES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "glass", label: "Glassmorphism" },
] as const;

// 타입 안전성
export type ThemeID = (typeof THEMES)[number]["id"];

// 쿠키 유효검증에 사용
// ⚠️ export const VALID_THEMES_IDS: ThemeID[] = THEMES.map((t) => t.id as ThemeID);
// =>
// ✅ as ThemeID 캐스트 불필요. THEMES가 as const로 이미 선언되어 있으므로, t.id의 타입은 이미 "light" | "dark" | "glass"로 추론됩니다. 그렇기 때문에 명시적 캐스트 없이도 올바르게 추론될 수 있습니다.
export const VALID_THEMES_IDS: ThemeID[] = THEMES.map((t) => t.id);
