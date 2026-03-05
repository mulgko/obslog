---
title: FlatMap
subject: "[[Frontend]]"
reference: "[[Phase 3 (마크다운 포스트)]]"
date: 2026-02-23 14:04
description: "JavaScript의 flatMap()으로 중첩 배열을 한 번에 변환·평탄화하고, Set으로 중복 값을 제거하는 방법을 다룹니다. 두 기능을 조합해 여러 포스트에 흩어진 태그를 중복 없이 추출하는 실전 패턴도 함께 소개합니다."
tags:
  - frontend
  - flatMap
  - 개념
  - 2차원배열
  - 1차원배열
  - map
  - set
series: ""
seriesOrder:
published: false
thumbnail: "/images/Gemini_Generated_Image_53c7g753c7g753c7 (1) 1.jpg"
---

# JavaScript Utility: flatMap & Set

  

## 1. flatMap

`flatMap`은 `map()`과 `flat(1)`을 합친 메서드입니다. 각 요소를 변환한 뒤, 결과 배열을 한 단계 평탄화(flatten)합니다.

  

### 🔍 예시

```javascript
const posts = [
  { tags: ["javascript", "react"] },
  { tags: ["next.js"] },
  { tags: ["javascript", "typescript"] },
];

// map → 각 요소를 변환만 함 (중첩 배열 발생)
const mapped = posts.map((post) => post.tags);
// [
//   ["javascript", "react"],
//   ["next.js"],
//   ["javascript", "typescript"],
// ]

// flatMap → 변환 후 1단계 펼침 (1차원 배열)
const flatMapped = posts.flatMap((post) => post.tags);
// ["javascript", "react", "next.js", "javascript", "typescript"]
```

  

### 💡 핵심

  

`flat()`은 중첩 배열을 펼치는 메서드입니다.

`[["a", "b"], ["c"]].flat()` → `["a", "b", "c"]`

  

즉, **`flatMap = map().flat()`** 과 동일합니다.

`posts.map(...).flat() === posts.flatMap(...)`

  

---

  

## 2. Set으로 중복 제거

`Set`은 값이 유일해야 하는 자료구조입니다. 중복된 값을 허용하지 않으므로 배열의 중복 제거에 자주 쓰입니다.

### 🔍 예시

  

```javascript
// 배열 → 중복 있음
const arr = ["javascript", "react", "javascript", "typescript", "react"];

// Set에 넣으면 자동으로 중복 제거
const set = new Set(arr);
// Set {"javascript", "react", "typescript"}
// (처음 등장한 것만 남고 이후 중복은 무시됨)

// Set을 다시 배열로 변환 (Spread 연산자 활용)
const result = [...set];
// ["javascript", "react", "typescript"]
```

  

### 💡 팁

`Array.from(set)`을 사용해도 결과는 동일합니다.

- `[...new Set(arr)]`: 스프레드 방식 (추천)

- `Array.from(new Set(arr))`: Array.from 방식

  

---

  

## 3. 실전 활용: 모든 태그 추출하기

  

두 기능을 합치면 여러 객체에 흩어져 있는 태그들을 중복 없이 추출할 수 있습니다.


```javascript
// 1. flatMap으로 모든 태그를 하나의 배열로 수집
const allTags = posts.flatMap((post) => post.tags);
// ["javascript", "react", "next.js", "javascript", "typescript"]

// 2. Set으로 중복 제거 후 배열로 변환
const uniqueTags = [...new Set(allTags)];
// ["javascript", "react", "next.js", "typescript"]

// 한 줄 요약:
const uniqueTagsSummary = [...new Set(posts.flatMap((p) => p.tags))];
```