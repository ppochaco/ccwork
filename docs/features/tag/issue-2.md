# Issue 2: 태그 조회 테스트 시나리오

## 확정된 테스트 맥락

### 타입

| 대상                | 상태      | 초기 예상 상태        |
| ------------------- | --------- | --------------------- |
| `src/types/note.ts` | 기존 확장 | missing data contract |

```ts
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}
```

### API 경계

| 대상                              | 상태      | 초기 예상 상태   |
| --------------------------------- | --------- | ---------------- |
| `src/api/notes.ts` `fetchNotes()` | 기존 확장 | missing behavior |

```ts
export async function fetchNotes(): Promise<Note[]>;
```

### 컴포넌트

| 대상                            | 상태      | 초기 예상 상태            |
| ------------------------------- | --------- | ------------------------- |
| `src/components/NoteEditor.tsx` | 기존 확장 | missing DOM output        |
| `src/components/NoteEditor.tsx` | 기존 확장 | missing behavior          |
| `src/components/NoteItem.tsx`   | 기존      | already satisfies context |

### 데이터 경계

| 대상      | 상태 | 초기 예상 상태            |
| --------- | ---- | ------------------------- |
| `db.json` | 기존 | already satisfies context |

### 에러 케이스

GitHub Issue #2의 완료조건에는 별도 오류 응답 동작이 없다.

## 테스트 시나리오

- [정상] Note 타입 - should tags 배열을 필수 필드로 가진다 when 노트 모델을 정의한다
- [정상] fetchNotes - should tags 배열을 포함한 Note 목록을 반환한다 when API가 tags를 포함한 노트 목록을 반환한다
- [경계] fetchNotes - should tags 빈 배열을 가진 Note 목록을 반환한다 when API가 tags 필드 없는 기존 노트를 반환한다
- [정상] NoteEditor - should 저장된 태그 칩을 제목 아래와 본문 위에 표시한다 when 선택된 노트에 tags가 있다
- [경계] NoteEditor - should 태그 칩을 표시하지 않고 편집 화면을 유지한다 when 선택된 노트의 tags가 빈 배열이다
- [정상] NoteItem - should 태그를 표시하지 않는다 when 노트에 tags가 있다
- [정상] db.json - should 모든 기존 노트에 tags 빈 배열을 명시한다 when seed 노트 데이터를 확인한다

## AC 커버리지

- AC 1. 저장된 태그 표시
  - [정상] NoteEditor - should 저장된 태그 칩을 제목 아래와 본문 위에 표시한다 when 선택된 노트에 tags가 있다
- AC 2. 태그가 없는 노트 표시
  - [경계] NoteEditor - should 태그 칩을 표시하지 않고 편집 화면을 유지한다 when 선택된 노트의 tags가 빈 배열이다
- AC 3. 기존 노트 정규화
  - [정상] Note 타입 - should tags 배열을 필수 필드로 가진다 when 노트 모델을 정의한다
  - [경계] fetchNotes - should tags 빈 배열을 가진 Note 목록을 반환한다 when API가 tags 필드 없는 기존 노트를 반환한다
- AC 4. 표시 위치 제한
  - [정상] NoteEditor - should 저장된 태그 칩을 제목 아래와 본문 위에 표시한다 when 선택된 노트에 tags가 있다
  - [정상] NoteItem - should 태그를 표시하지 않는다 when 노트에 tags가 있다
- 구현 범위. 기존 `db.json` 노트 데이터에 `tags: []` 명시
  - [정상] db.json - should 모든 기존 노트에 tags 빈 배열을 명시한다 when seed 노트 데이터를 확인한다

## Red 참고

- `NoteItem`의 노트 목록 미표시 맥락과 `db.json`의 seed 데이터 맥락은 현재 코드 기준 이미 충족된 상태일 수 있다.
