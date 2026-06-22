# Issue 2: 테스트 시나리오

## 확정된 테스트 맥락

### 타입

| target | status | 초기 예상 상태 |
| --- | --- | --- |
| `src/types/note.ts`의 `Note` | existing extension | `tags: string[]` 필드가 없어 `Note` 경계에서 태그 데이터를 타입으로 표현하지 못함 |

### API 경계

| target | status | 초기 예상 상태 |
| --- | --- | --- |
| `fetchNotes(): Promise<Note[]>` | existing extension | `/notes` 응답을 그대로 반환하므로 `tags`가 없는 기존 노트가 빈 배열로 정규화되지 않음 |
| API 응답 노트 정규화 규칙 | new | 응답 객체에 `tags`가 없거나 배열이 아니면 테스트에서 `tags: []`로 관찰될 공개 동작이 없음 |

### 컴포넌트

| target | status | 초기 예상 상태 |
| --- | --- | --- |
| `NoteEditor` | existing extension | 선택된 노트의 `tags`를 제목 아래와 본문 위에 칩 형태로 렌더링하지 않음 |
| `NoteEditor` 빈 태그 표시 | existing extension | `tags: []`일 때 태그 칩 없이 제목 입력, 본문 입력, `저장` 버튼이 정상 표시되는지 명시 테스트 필요 |
| `NoteEditor` 기존 노트 방어 | existing extension | `tags` 필드가 없는 노트를 열 때 태그 없는 노트처럼 처리되는 렌더링 보장이 없음 |
| `NoteList` / `NoteItem` | existing | 이슈 제외 범위상 노트 목록에는 태그가 표시되지 않아야 하며, 태그 표시 추가 과정에서 회귀 방지 필요 |

### 데이터 경계

| target | status | 초기 예상 상태 |
| --- | --- | --- |
| `db.json`의 기존 `notes` 항목 | existing extension | 현재 항목들은 이미 `tags: []`를 갖고 있으나, 이슈 완료 조건상 모든 시드 노트가 명시적으로 `tags: []`를 유지해야 함 |

### 에러 케이스

| target | status | 초기 예상 상태 |
| --- | --- | --- |
| `NoteEditor`가 `tags` 누락 노트를 렌더링하는 경로 | existing extension | `selectedNote.tags` 접근이 추가될 경우 누락 필드에서 런타임 오류가 날 수 있으므로, 오류 없이 편집 화면이 유지되어야 함 |

## 테스트 시나리오

### 정상

- [ ] Note 타입 - should tags 문자열 배열 필드를 공개 계약에 포함한다 when 노트 데이터가 타입 경계를 통과한다
- [ ] fetchNotes - should 저장된 tags 배열을 유지한다 when API 응답 노트에 tags가 포함되어 있다
- [ ] NoteEditor - should 저장된 태그 칩을 제목 아래와 본문 위에 표시한다 when 선택된 노트에 `tags: ["업무", "긴급"]`이 있다
- [ ] db.json - should 모든 기존 노트에 빈 tags 배열을 명시한다 when 시드 노트 데이터를 확인한다

### 경계

- [ ] NoteEditor - should 태그 칩 없이 편집 폼을 유지한다 when 선택된 노트의 tags가 빈 배열이다
- [ ] NoteList - should 태그 텍스트를 목록 항목에 표시하지 않는다 when 노트가 tags 배열을 가진다

### 예외

- [ ] fetchNotes - should tags를 빈 배열로 정규화한다 when API 응답 노트에 tags 필드가 없다
- [ ] fetchNotes - should tags를 빈 배열로 정규화한다 when API 응답 노트의 tags가 배열이 아니다
- [ ] NoteEditor - should 화면 오류 없이 제목, 본문, 저장 버튼을 표시한다 when 선택된 기존 노트에 tags 필드가 없다

### 회귀

- [ ] NoteEditor - should 기존 제목과 본문 동기화를 유지한다 when 태그가 있는 노트를 선택한다
- [ ] NoteEditor - should 태그가 없는 노트를 위한 큰 empty state를 표시하지 않는다 when 선택된 노트의 tags가 비어 있다

## AC 커버리지

- AC1: 정상 - NoteEditor - should 저장된 태그 칩을 제목 아래와 본문 위에 표시한다 when 선택된 노트에 `tags: ["업무", "긴급"]`이 있다
- AC2: 경계 - NoteEditor - should 태그 칩 없이 편집 폼을 유지한다 when 선택된 노트의 tags가 빈 배열이다
- AC2: 회귀 - NoteEditor - should 태그가 없는 노트를 위한 큰 empty state를 표시하지 않는다 when 선택된 노트의 tags가 비어 있다
- AC3: 예외 - fetchNotes - should tags를 빈 배열로 정규화한다 when API 응답 노트에 tags 필드가 없다
- AC3: 예외 - NoteEditor - should 화면 오류 없이 제목, 본문, 저장 버튼을 표시한다 when 선택된 기존 노트에 tags 필드가 없다
