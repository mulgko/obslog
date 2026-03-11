---
title: "TTFB"
subject: "[[Rendering]]"
reference: ""
date: "2026-02-12 16:09"
description: "사용자가 요청을 보낸 후 서버로부터 첫 번째 바이트를 받기까지 걸리는 시간인 TTFB(Time To First Byte)를 설명합니다. SSR 방식에서 서버가 HTML을 조립하는 동안 발생하는 대기 시간이며, 미리 생성해두는 SSG보다 이 지표가 느린 이유를 다룹니다."
tags:
  - frontend
  - 개념
series: ""
seriesOrder:
published: false
thumbnail: "/images/Gemini_Generated_Image_d2bit1d2bit1d2bi 1.jpg"
---

사용자는 서버가 요리를 끝내고 보여줄 때까지 빈 화면을 기다려야 합니다. 이를 TTFB라고 합니다.(Time To First Byte) / SSG보다 이 지표가 느릴 수 밖에 없습니다. 