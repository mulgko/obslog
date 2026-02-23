---
title: "TypeScript 실용 팁 모음"
date: "2026-02-03"
description: "실무에서 자주 쓰이는 TypeScript 패턴과 팁들"
tags: ["TypeScript", "JavaScript", "개발팁"]
---

# TypeScript 실용 팁 모음

TypeScript를 쓰다 보면 타입 에러와 씨름하는 시간이 많아집니다. 여기서는 실무에서 자주 마주치는 상황과 해결 패턴을 정리했습니다.

## 1. 유틸리티 타입 활용하기

TypeScript에는 유용한 빌트인 유틸리티 타입이 많습니다.

```typescript
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

// 비밀번호 제외한 공개 정보만
type PublicUser = Omit<User, "password">;

// 모든 필드를 선택적으로
type PartialUser = Partial<User>;

// 특정 필드만 선택
type UserPreview = Pick<User, "id" | "name">;
```

## 2. 타입 가드 사용하기

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    // 여기서 value는 string으로 추론됨
    console.log(value.toUpperCase());
  }
}
```

## 3. satisfies 연산자

TypeScript 4.9부터 추가된 `satisfies`는 타입 검사는 하되 추론은 더 좁게 유지합니다.

```typescript
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Record<string, string | number[]>;

// palette.red는 number[]로, palette.green은 string으로 추론됨
```

## 4. 조건부 타입

```typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<number>; // false
```

## 마치며

TypeScript의 타입 시스템은 깊이 파고들수록 강력합니다. 공식 핸드북과 타입 챌린지를 통해 꾸준히 연습해보세요.
