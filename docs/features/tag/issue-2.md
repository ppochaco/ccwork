# Issue 2: 태그 조회 테스트 시나리오

## 확정된 테스트 맥락

### 컴포넌트

| 대상                            | 상태      | 초기 예상 상태     |
| ------------------------------- | --------- | ------------------ |
| `src/components/NoteEditor.tsx` | 기존 확장 | missing DOM output |
| `src/components/NoteEditor.tsx` | 기존 확장 | missing behavior   |

### 에러 케이스

GitHub Issue #2의 완료조건에는 별도 오류 응답 동작이 없다.

## 테스트 시나리오

- [정상] NoteEditor - should 저장된 태그 칩을 제목 아래와 본문 위에 표시한다 when 선택된 노트에 tags가 있다
- [경계] NoteEditor - should 태그 칩을 표시하지 않고 편집 화면을 유지한다 when 선택된 노트의 tags가 빈 배열이다

## AC 커버리지

- AC 1. 저장된 태그 표시
  - [정상] NoteEditor - should 저장된 태그 칩을 제목 아래와 본문 위에 표시한다 when 선택된 노트에 tags가 있다
- AC 2. 태그가 없는 노트 표시
  - [경계] NoteEditor - should 태그 칩을 표시하지 않고 편집 화면을 유지한다 when 선택된 노트의 tags가 빈 배열이다
