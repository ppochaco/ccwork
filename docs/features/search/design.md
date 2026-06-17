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
- 검색 결과는 기존 노트 목록 영역에 표시한다.
- 별도 검색 결과 화면이나 route는 만들지 않는다.

권장 순서:

```text
Sidebar
노트 개수 label
검색 입력
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

placeholder는 노트를 검색하는 입력임을 짧게 드러낸다.
예: `노트 검색`

## 결과 표시

- 검색어가 비어 있으면 전체 노트 목록을 표시한다.
- 검색어가 있고 결과가 있으면 필터링된 노트 목록을 표시한다.
- 검색어가 있고 결과가 없으면 노트 목록 위치에 `검색 결과가 없습니다`를 표시한다.
- 검색어가 없고 노트도 없으면 기존 `노트가 없습니다` 상태를 유지한다.
- 결과 없음 메시지는 `--font-size-label`, `--color-text-muted`를 사용한다.
- 검색 결과 개수는 기존 노트 개수 label 위치에 반영한다.

## 상태 규칙

### Focus

- focus는 hover와 다르게 표시한다.
- keyboard focus에서는 `--color-border-focus`와 `--effect-focus`를 함께 사용한다.

### Empty

- 검색어가 없으면 empty state를 따로 만들지 않는다.
- 검색어가 없고 노트도 없으면 기존 빈 목록 상태를 표시한다.
- 검색어가 있고 결과가 없을 때만 검색 결과 없음 상태를 표시한다.

### Error

- 검색 결과가 없는 상태는 오류로 표시하지 않는다.

## 접근성

- 검색 입력에는 명확한 accessible name을 제공한다.
- 결과 개수 변경은 과도하게 알리지 않고, 필요 시 status 영역을 사용한다.
- 결과 없음 메시지는 시각적으로 노트 목록 영역 안에 표시되며 보조 기술에서도 읽을 수 있어야 한다.

## 구현 체크리스트

- 검색 UI가 `NoteList` 상단에 있다.
- 검색 입력 높이가 최소 44px이다.
- focus 상태가 hover와 구분된다.
- 검색 결과 개수가 기존 노트 개수 label 위치에 반영된다.
- 검색 결과 없음 상태가 `--color-text-muted`로 표시된다.
- 원시 색상값을 추가하지 않았다.
