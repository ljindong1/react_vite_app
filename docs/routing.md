# 라우팅 구조

---

## React Router v7 기본 개념

SPA(Single Page Application)에서 URL이 바뀌어도 실제 서버 요청 없이 컴포넌트만 교체합니다.

```
일반 웹:  링크 클릭 → 서버 요청 → HTML 새로 받아서 전체 페이지 교체
SPA:      링크 클릭 → URL만 변경 → 해당 컴포넌트만 교체 (빠름, 깜빡임 없음)
```

---

## 현재 라우트 구성

`src/App.tsx`에 정의된 4개의 라우트:

| URL | 컴포넌트 |
|-----|---------|
| `/` | 홈 (텍스트) |
| `/users` | CardList — 사용자 카드 목록 |
| `/about` | About (텍스트) |
| `/contact` | Contact (텍스트) |

```tsx
// App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<p>홈 페이지입니다.</p>} />
    <Route path="/users" element={<CardList />} />
    <Route path="/about" element={<p>About 페이지입니다.</p>} />
    <Route path="/contact" element={<p>Contact 페이지입니다.</p>} />
  </Routes>
</BrowserRouter>
```

---

## 핵심 컴포넌트 역할

### `BrowserRouter`
라우팅 기능을 앱 전체에 제공하는 최상위 컨테이너. 앱에서 딱 한 번 사용합니다.

### `Routes`
여러 `Route` 중 현재 URL과 일치하는 것 **하나만** 렌더링합니다.

### `Route`
`path`(URL 패턴)와 `element`(렌더링할 컴포넌트)를 연결합니다.

---

## `Link` vs `<a>` 태그

Header에서 일반 `<a>` 대신 React Router의 `Link`를 사용합니다.

```tsx
// 잘못된 방법 — 페이지 전체가 새로고침됨
<a href="/users">사용자 목록</a>

// 올바른 방법 — 컴포넌트만 교체, 새로고침 없음
<Link to="/users">사용자 목록</Link>
```

`Link`는 클릭 시 브라우저의 기본 동작(서버 요청)을 막고, URL만 변경한 뒤 React Router가 해당 `Route`의 컴포넌트를 렌더링합니다.

---

## Header에서의 Link 사용

`NavigationMenuLink`의 `render` prop을 통해 Base UI 컴포넌트와 React Router의 `Link`를 결합합니다.

```tsx
// Header.tsx
import { Link } from "react-router-dom"

<NavigationMenuLink render={<Link to="/users" />}>
  사용자 목록
</NavigationMenuLink>
```

`render` prop은 Base UI가 제공하는 패턴으로, 내부 DOM 요소를 다른 컴포넌트로 교체합니다. 결과적으로 Base UI의 접근성 기능 + React Router의 클라이언트 사이드 네비게이션을 함께 사용할 수 있습니다.
