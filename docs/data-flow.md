# 데이터 흐름 (MSW + API)

---

## MSW란?

**Mock Service Worker**의 약자. 브라우저의 Service Worker를 이용해 네트워크 요청을 가로채는 도구입니다.

```
일반 요청:  컴포넌트 → fetch('/api/users') → 실제 서버 → 응답
MSW 사용:   컴포넌트 → fetch('/api/users') → MSW 가로채기 → faker 데이터 반환
```

컴포넌트 입장에서는 실제 서버와 통신하는 것과 동일하게 동작합니다.

---

## 개발 환경 초기화 흐름

```
브라우저 → main.tsx 실행
            │
            ├── import.meta.env.DEV === true (개발 환경 확인)
            │
            ├── MSW worker.start() 실행
            │   └── public/mockServiceWorker.js 등록
            │       (Service Worker가 네트워크 요청 감시 시작)
            │
            └── React 앱 렌더링 시작
```

`main.tsx`에서 MSW가 준비된 후 앱을 렌더링하기 때문에, 앱이 시작하자마자 `/api/users`를 요청해도 MSW가 반드시 먼저 준비되어 있습니다.

---

## `/users` 페이지 데이터 흐름

```
1. 사용자가 헤더의 "사용자 목록" 클릭
   └── React Router: URL을 /users로 변경 (페이지 새로고침 없음)

2. CardList 컴포넌트 마운트
   └── useState: users=[], loading=true

3. useEffect 실행
   └── fetch('/api/users') 호출

4. MSW Service Worker가 요청 가로채기
   └── handlers.ts의 http.get('/api/users') 핸들러 실행
       └── faker로 생성된 9개의 UserProfile 반환 (JSON)

5. CardList에서 응답 수신
   └── setUsers(data)  → users 배열 업데이트
   └── setLoading(false) → 로딩 해제

6. 컴포넌트 리렌더링
   └── 3열 그리드로 카드 9개 표시
```

---

## 관련 파일

### `src/mocks/handlers.ts`
```ts
// 어떤 요청을 가로채서 무엇을 반환할지 정의
export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(users)  // faker로 생성된 데이터 반환
  }),
]
```

### `src/mocks/browser.ts`
```ts
// handlers를 MSW 워커에 등록
export const worker = setupWorker(...handlers)
```

### `src/main.tsx`
```ts
// 개발 환경에서만 MSW 활성화
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
  // onUnhandledRequest: 'bypass' → 핸들러에 없는 요청은 실제 서버로 통과
}
```

### `src/components/CardList.tsx`
```ts
// 일반 fetch 사용 (MSW의 존재를 모름)
fetch('/api/users')
  .then(res => res.json())
  .then(data => setUsers(data))
```

---

## 실제 API로 교체하는 방법

배포 시 실제 백엔드 API가 생기면 `mocks/handlers.ts`만 수정하거나, MSW 전체를 제거하면 됩니다. `CardList.tsx`는 변경할 필요가 없습니다.

```ts
// 방법 1: handlers.ts에서 실제 API로 프록시 (개발 중 병행 사용)
http.get('/api/users', async () => {
  const res = await fetch('https://real-api.com/users')
  return HttpResponse.json(await res.json())
})

// 방법 2: main.tsx에서 MSW 초기화 제거 (완전 전환)
// DEV 조건 블록 삭제 → 모든 요청이 실제 서버로 전달됨
```
