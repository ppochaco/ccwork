# 검색 기능 디자인

검색 UI는 `NoteList` 상단에 배치한다.
이 문서는 검색 기능에 속한 배치, 상태, 표시 규칙만 다룬다.
색상, 타이포그래피, 간격, 공통 입력/카드/버튼 패턴은 `docs/design-system/` 문서를 따른다.

## 참조 문서

- `docs/design-system/colors.md`
- `docs/design-system/typography.md`
- `docs/design-system/spacing.md`
- `docs/design-system/components.md`
- `docs/features/search/spec-fixed.md`

## 화면 배치

- 검색 영역은 sidebar 안에서 노트 개수 label과 노트 목록 사이에 둔다.
- 검색 입력과 검색 기록 드롭다운은 같은 wrapper 안에서 관리한다.
- 검색 결과는 기존 노트 목록 영역에 표시한다.
- 별도 검색 결과 화면이나 route는 만들지 않는다.

권장 순서:

```text
Sidebar
노트 개수 label
검색 입력
최근 검색 기록 드롭다운
노트 목록 또는 검색 결과 없음 상태
```

## 검색 입력

검색 입력은 공통 `Input Field` 패턴을 사용하되 sidebar의 compact density에 맞춘다.

| 항목        | 기준                                        |
| ----------- | ------------------------------------------- |
| background  | `--color-surface-card`                      |
| text        | `--color-text-primary`                      |
| placeholder | `--color-text-muted`                        |
| border      | `--color-border-default`                    |
| focus       | `--color-border-focus`, `--effect-focus`    |
| radius      | `--radius-6`                                |
| height      | 최소 `44px`                                 |
| padding     | 좌우 `--space-3` 또는 `--space-4`           |
| font        | `--font-size-label`, `--line-height-normal` |

placeholder는 검색 대상이 제목, 본문, 태그임을 짧게 드러낸다.
예: `노트 검색`

## 검색 기록 드롭다운

- 검색창에 focus가 있고 검색 기록이 있을 때만 표시한다.
- 입력 영역 바로 아래에 붙여 표시한다.
- 배경은 `--color-surface-card`, border는 `--color-border-default`를 사용한다.
- radius는 `--radius-4`를 사용한다.
- shadow는 `--effect-e2`를 사용한다.
- 항목 높이는 최소 44px를 유지한다.
- 항목 hover는 `--color-surface-muted`로 표시한다.
- 개별 삭제 버튼은 destructive text 패턴을 사용한다.

## 결과 표시

- 검색어가 비어 있으면 전체 노트 목록을 표시한다.
- 검색어가 있고 결과가 있으면 필터링된 노트 목록을 표시한다.
- 검색어가 있고 결과가 없으면 노트 목록 위치에 `검색 결과가 없습니다`를 표시한다.
- 결과 없음 메시지는 `--font-size-label`, `--color-text-muted`를 사용한다.
- 검색 결과 개수는 기존 노트 개수 label 위치에 반영한다.

## 상태 규칙

### Focus

- focus는 hover와 다르게 표시한다.
- keyboard focus에서는 `--color-border-focus`와 `--effect-focus`를 함께 사용한다.

### Open

- 검색 기록 드롭다운이 열려 있어도 노트 목록 layout이 갑자기 밀리지 않도록 absolute layer 또는 안정적인 reserved area를 검토한다.
- Escape 또는 외부 클릭으로 닫는다.

### Empty

- 검색 기록이 없으면 드롭다운을 표시하지 않는다.
- 검색어가 없으면 empty state를 따로 만들지 않는다.

### Error

- `localStorage` 오류는 사용자에게 큰 오류 화면으로 노출하지 않는다.
- 검색 기록만 비어 있는 상태로 처리한다.

## 접근성

- 검색 입력에는 명확한 accessible name을 제공한다.
- 검색 기록 목록은 keyboard로 탐색 가능해야 한다.
- 검색 기록 삭제 버튼은 삭제 대상 검색어를 accessible name에 포함한다.
- 결과 개수 변경은 과도하게 알리지 않고, 필요 시 status 영역을 사용한다.

## 구현 체크리스트

- 검색 UI가 `NoteList` 상단에 있다.
- 검색 입력 높이가 최소 44px이다.
- focus 상태가 hover와 구분된다.
- 검색 기록 드롭다운이 검색 입력과 시각적으로 연결된다.
- 검색 결과 없음 상태가 `--color-text-muted`로 표시된다.
- 원시 색상값을 추가하지 않았다.
