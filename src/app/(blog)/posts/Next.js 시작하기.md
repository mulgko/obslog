---
title: "Next.js 시작하기"
date: "2026-01-15"
description: "Next.js를 처음 시작하는 분들을 위한 기초 가이드"
tags: ["Next.js", "React", "웹개발"]
---

# Next.js 시작하기

Next.js는 React 기반의 풀스택 웹 프레임워크입니다. 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), API 라우트 등 다양한 기능을 기본으로 제공합니다.

## 왜 Next.js인가?

- **파일 기반 라우팅**: 폴더 구조만으로 라우트가 자동으로 생성됩니다
- **최적화된 성능**: 이미지 최적화, 코드 스플리팅이 기본 내장되어 있습니다
- **App Router**: 서버 컴포넌트와 클라이언트 컴포넌트를 유연하게 사용할 수 있습니다

## 프로젝트 시작하기

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

설치 과정에서 TypeScript, ESLint, Tailwind CSS 등의 사용 여부를 선택할 수 있습니다.

## App Router 구조

```
app/
├── layout.tsx    # 공통 레이아웃
├── page.tsx      # 루트 페이지
└── about/
    └── page.tsx  # /about 페이지
```

## 마치며

Next.js는 빠르게 발전하고 있는 프레임워크입니다. 공식 문서를 꾸준히 확인하면서 새로운 기능들을 익혀보세요.
