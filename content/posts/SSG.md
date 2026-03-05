---
title: "SSG"
subject: "[[Rendering]]"
reference: ""
date: "2026-02-12 16:06"
description: "빌드 시점에 서버가 데이터를 가져와 HTML 파일을 미리 생성해두는 SSG(Static Site Generation) 방식을 설명합니다. 요청 시 완성된 HTML을 즉시 전달하고 CDN에 배포할 수 있어, 내용이 자주 바뀌지 않는 블로그 페이지에 최적입니다."
tags:
  - next
  - rendering
  - ssg
  - 개념
  - isr
series: ""
seriesOrder:
published: false
thumbnail: "/images/Gemini_Generated_Image_53c7g753c7g753c7 (1) 1.jpg"
---

- 동작원리: npm run build 할 때 서버가 데이터를 가져와서 미리 HTML을 생성, 서버에 물리적으로 파일 생성
- 장점: - 사용자가 접속하면 이미 만들어진 HTML을 그냥 던져주기만 하면 끝. CDN(Content Delivery Network)**에 파일을 복사해둘 수 있어 전 세계 어디서든 가깝게 접속 가능합니다.