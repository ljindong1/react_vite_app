# 기술 스택

이 프로젝트에서 사용한 라이브러리와 선택 이유를 정리합니다.

---

## 핵심 프레임워크

### React 19
- **역할**: UI를 컴포넌트 단위로 구성하는 JavaScript 라이브러리
- **선택 이유**: 가장 널리 쓰이는 프론트엔드 라이브러리. 컴포넌트 재사용성과 상태 관리가 편리함
- **공식 문서**: https://react.dev

### Vite 8
- **역할**: 개발 서버 및 빌드 도구
- **선택 이유**: webpack 대비 훨씬 빠른 HMR(Hot Module Replacement)과 빌드 속도 제공
- **공식 문서**: https://vite.dev

### TypeScript 6
- **역할**: JavaScript에 정적 타입을 추가한 언어
- **선택 이유**: 타입 오류를 컴파일 타임에 잡아줌. 특히 API 응답 데이터 구조를 명확히 표현할 때 유용 (`UserProfile` 인터페이스)
- **공식 문서**: https://www.typescriptlang.org

---

## 스타일링

### Tailwind CSS v4
- **역할**: 유틸리티 클래스 기반 CSS 프레임워크
- **선택 이유**: 별도 CSS 파일 없이 클래스만으로 스타일링 가능. `grid-cols-3`, `flex`, `gap-4` 같은 클래스를 조합해서 빠르게 레이아웃 구성
- **공식 문서**: https://tailwindcss.com

### shadcn
- **역할**: 복사-붙여넣기 방식의 컴포넌트 라이브러리 (CLI로 컴포넌트 파일을 프로젝트에 직접 추가)
- **선택 이유**: npm 패키지가 아닌 소스 코드 방식이라 커스터마이징이 자유로움. `npx shadcn add card`로 Card 컴포넌트를 `src/components/ui/card.tsx`에 직접 추가
- **공식 문서**: https://ui.shadcn.com

### Base UI (`@base-ui/react`)
- **역할**: 스타일이 없는 헤드리스 UI 컴포넌트 라이브러리
- **선택 이유**: shadcn이 내부적으로 사용하는 라이브러리. `NavigationMenu`, `Button` 등 접근성이 보장된 UI 동작을 제공하고, 스타일은 Tailwind로 직접 적용
- **공식 문서**: https://base-ui.com

---

## 라우팅

### React Router DOM v7
- **역할**: 클라이언트 사이드 라우팅 (페이지 새로고침 없이 URL 변경)
- **선택 이유**: React 생태계의 표준 라우팅 라이브러리. `BrowserRouter` + `Routes` + `Route`로 SPA 라우팅 구성
- **공식 문서**: https://reactrouter.com

---

## API 목킹

### MSW (Mock Service Worker) v2
- **역할**: Service Worker를 이용해 브라우저의 네트워크 요청을 가로채서 가짜 응답 반환
- **선택 이유**: 실제 백엔드 서버 없이 프론트엔드 개발 가능. `fetch('/api/users')` 호출 시 실제 서버 대신 MSW 핸들러가 응답. 개발 환경에서만 활성화되므로 프로덕션 코드에 영향 없음
- **공식 문서**: https://mswjs.io

### @faker-js/faker
- **역할**: 가짜 데이터(이름, 이메일, 회사명 등) 자동 생성
- **선택 이유**: MSW 핸들러에서 현실감 있는 목 데이터를 손쉽게 생성. 하드코딩된 더미 데이터보다 다양한 케이스 테스트 가능
- **공식 문서**: https://fakerjs.dev
