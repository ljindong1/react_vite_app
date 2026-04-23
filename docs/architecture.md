# 아키텍처 & 파일 구조

---

## 전체 파일 트리

```
src/
├── App.tsx                      # 라우팅 + 전체 레이아웃 (BrowserRouter)
├── main.tsx                     # 앱 진입점, MSW 초기화
├── App.css                      # App 레벨 스타일
├── index.css                    # 전역 스타일 (Tailwind, 테마 변수)
│
├── components/
│   ├── CardList.tsx             # /users 라우트에서 렌더링되는 카드 목록
│   ├── layout/
│   │   ├── Header.tsx           # 상단 네비게이션 헤더
│   │   └── Footer.tsx           # 하단 푸터
│   └── ui/                      # shadcn CLI로 추가된 UI 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       └── navigation-menu.tsx
│
├── mocks/
│   ├── handlers.ts              # GET /api/users 핸들러 (faker 데이터 반환)
│   └── browser.ts               # MSW 워커 설정
│
├── types/
│   └── user.ts                  # UserProfile 인터페이스
│
└── lib/
    └── utils.ts                 # cn() 클래스 병합 유틸리티
```

---

## 각 폴더의 역할

### `components/`
UI를 구성하는 React 컴포넌트 모음.

- `layout/` — 모든 페이지에서 공통으로 표시되는 Header, Footer
- `ui/` — shadcn CLI로 추가된 재사용 가능한 기본 UI 컴포넌트. **직접 수정하지 않는 것을 권장** (shadcn 업데이트 시 재생성될 수 있음)
- 루트 컴포넌트 (`CardList.tsx`) — 특정 페이지/기능에 해당하는 컴포넌트

### `mocks/`
개발 환경에서만 사용하는 MSW 관련 파일.

- `handlers.ts` — 어떤 URL을 가로채서 어떤 데이터를 반환할지 정의
- `browser.ts` — handlers를 MSW 워커에 등록하는 설정 파일

### `types/`
TypeScript 타입/인터페이스 정의 파일. 컴포넌트와 데이터 계층이 동일한 타입을 공유할 수 있도록 분리.

### `lib/`
프로젝트 전반에서 사용하는 유틸리티 함수.

- `cn()` — `clsx`와 `tailwind-merge`를 조합한 클래스 병합 함수. Tailwind 클래스 충돌 방지

---

## 컴포넌트 계층 구조

```
App (BrowserRouter)
├── Header
│   └── NavigationMenu (Base UI)
│       └── Link × 4 (React Router)
├── main
│   └── Routes
│       ├── Route "/"        → 홈 텍스트
│       ├── Route "/users"   → CardList
│       │   └── Card × 9 (shadcn)
│       ├── Route "/about"   → About 텍스트
│       └── Route "/contact" → Contact 텍스트
└── Footer
```

---

## 레이아웃 구조

Footer를 항상 하단에 고정하기 위해 `min-h-screen flex flex-col` 패턴 사용.

```tsx
// App.tsx
<div className="min-h-screen flex flex-col">   // 전체 높이, 세로 flex
  <Header />                                    // 고정 높이
  <main className="flex-1">                     // 남은 공간 모두 차지
    <Routes>...</Routes>
  </main>
  <Footer />                                    // 고정 높이, 항상 하단
</div>
```

콘텐츠가 짧아도 Footer가 화면 하단에 위치합니다.
