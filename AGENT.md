# AGENT.md

## 목적
- 이 저장소는 `React 19 + TypeScript + Vite + json-server` 기반 학습용 노트 앱이다.
- 핵심 흐름은 `목록 선택 -> 편집/생성 -> 저장 -> 상태 반영`이다.

## 구조
- 단일 앱 저장소.
- 주요 파일:
  - `src/App.tsx`: 화면 상태(`selectedNoteId`, `isCreating`) 조립
  - `src/context/NotesContext.tsx`: 전역 노트 상태와 CRUD 액션
  - `src/api/notes.ts`: fetch 기반 API 계층
  - `src/components/*`: UI 컴포넌트
  - `src/types/note.ts`: 도메인 타입

## 구현 패턴
- 화면 상태와 데이터 상태를 분리한다.
  - 화면 상태: `App`
  - 데이터 상태: `NotesProvider`
- 컴포넌트는 역할 단위로 분리한다.
  - `Layout`: 레이아웃 셸
  - `NoteList`: 목록/분기 렌더링
  - `NoteItem`: 개별 항목 UI
  - `NoteEditor`: 편집 폼
- 상위에서 상태를 들고 하위로 `props`를 전달한다.
- 컴포넌트는 API를 직접 호출하지 않고 Context 액션을 통해 데이터 변경한다.

## 상태관리 규칙
- 패턴: `Context + useState + useEffect`.
- `NotesProvider`가 `notes`, `loading`, `error`를 소유한다.
- 생성/수정/삭제는 Context 액션으로 수행 후 로컬 상태를 갱신한다.
- `NoteEditor`는 선택된 노트/생성 모드에 맞춰 폼 상태를 동기화한다.

## API 호출 규칙
- API 호출은 `src/api/notes.ts`에만 둔다.
- 함수 단위 책임을 유지한다.
  - `fetchNotes`
  - `createNote`
  - `updateNote`
  - `deleteNote`
- 실패 시 `res.ok` 검사 후 `Error`를 던진다.
- `alert`는 사용하지 않고 `console.error`를 사용한다.
- CRUD 동사 네이밍은 `create/update/delete`로 통일한다.
  - Context: `createNote`, `updateNote`, `deleteNote`
  - API: `createNote`, `updateNote`, `deleteNote`

## 네이밍 규칙
- 컴포넌트/파일: `PascalCase`.
- Props 타입: `ComponentNameProps`.
- Context 타입: `DomainContextType` (`NotesContextType`).
- 커스텀 훅: `useX` (`useNotes`).
- 이벤트 prop: `onX`.
- 내부 핸들러: `handleX`.

## 스타일링/실행
- Tailwind v4와 `src/index.css`의 `@theme` 토큰을 우선 사용한다.
- 실행:
  - `npm run dev`
  - 앱 `http://localhost:5173`
  - API `http://localhost:3001/notes`

## 현재 불일치(정리 대상)
- export 방식 불일치:
  - `App`은 default export
  - 나머지 컴포넌트는 named export
- 에러 처리 경로 불일치:
  - 초기 로드는 Context `error` 상태로 UI 표시
  - 저장 실패는 `console.error`만 기록
- 훅 의존성 불일치:
  - `NoteEditor`의 `useEffect`에 lint 예외 사용
- 스타일 적용 불일치:
  - 전역 `--font-display`가 있으나 헤더 폰트는 inline style 사용

## 작업 기준
- 단순함, 읽기 쉬움, 데이터 흐름의 명확성을 우선한다.
- 새 추상화는 실제 필요가 생길 때만 추가한다.
