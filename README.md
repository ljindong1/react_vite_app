# React Vite App

React 19 + Vite 기반의 연습 프로젝트입니다. shadcn UI 컴포넌트, MSW를 이용한 API 목킹, React Router를 활용한 클라이언트 사이드 라우팅을 학습하기 위해 만들어졌습니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19, Vite 8 |
| 언어 | TypeScript 6 |
| 스타일링 | Tailwind CSS v4, shadcn, Base UI |
| 라우팅 | React Router DOM v7 |
| API 목킹 | MSW (Mock Service Worker) |
| 데이터 생성 | @faker-js/faker |

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 후 헤더의 **사용자 목록** 메뉴를 클릭하면 카드 뷰를 확인할 수 있습니다.

## 폴더 구조

```
src/
├── App.tsx                  # 라우팅 및 레이아웃
├── main.tsx                 # 진입점, MSW 초기화
├── components/
│   ├── CardList.tsx         # 사용자 카드 목록
│   ├── layout/
│   │   ├── Header.tsx       # 헤더 & 네비게이션
│   │   └── Footer.tsx       # 푸터
│   └── ui/                  # shadcn UI 컴포넌트
├── mocks/
│   ├── handlers.ts          # MSW API 핸들러
│   └── browser.ts           # MSW 워커 설정
├── types/
│   └── user.ts              # UserProfile 타입
└── lib/
    └── utils.ts             # cn() 유틸리티
```

## 문서

- [기술 스택](docs/tech-stack.md) — 각 라이브러리의 역할과 선택 이유
- [아키텍처](docs/architecture.md) — 파일 구조와 컴포넌트 계층
- [데이터 흐름](docs/data-flow.md) — MSW를 이용한 API 목킹 흐름
- [라우팅](docs/routing.md) — React Router v7 라우팅 구조
