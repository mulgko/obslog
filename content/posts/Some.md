---
title: Some
subject: ""
reference: ""
date: 2026-02-25 16:04
description: "배열 요소 중 하나라도 조건을 만족하면 true를 반환하는 .some()과, 모든 요소가 조건을 만족해야 true를 반환하는 .every() 메서드를 코드 예시로 비교합니다."
tags:
  - frontend
  - some
  - every
series: ""
seriesOrder:
published: false
thumbnail: "/images/Gemini_Generated_Image_z2npcaz2npcaz2np 1.jpg"
---

# Some

.som() 메서드는 하나라도 만족하면 true 값을 반환한다.

```typescript
["react", "next"].some((tag) => tag === "react") // → true

["react", "next"].some((tag) => tag === "vue") // → false
```


.every() 메서드와 비교하면 차이가 더욱 명확합니다.

```typescript
["react", "next"].every((tag) => tag === "react") // → false

["react", "next"].every((tag) => tag === "vue") // → false
```
