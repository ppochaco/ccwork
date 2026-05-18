# 태그 기능 디자인

태그 UI는 `NoteEditor` 제목 아래, 본문 입력 위에 배치한다.
이 문서는 태그 기능에 속한 배치, 칩, 입력, 오류 상태만 다룬다.
색상, 타이포그래피, 간격, 공통 입력/버튼 패턴은 `docs/design-system/` 문서를 따른다.

## 참조 문서

- `docs/design-system/colors.md`
- `docs/design-system/typography.md`
- `docs/design-system/spacing.md`
- `docs/design-system/components.md`
- `docs/features/tag/spec-fixed.md`

## 화면 배치

- 태그 영역은 제목 입력 아래, 본문 입력 위에 둔다.
- 제목과 본문 사이의 보조 정보 영역으로 취급한다.
- 태그가 없어도 큰 empty state를 표시하지 않는다.
- 노트 목록에는 태그를 표시하지 않는다.

권장 순서:

```text
Editor Panel
section label
제목 입력
태그 영역
divider
본문 입력
저장/취소 버튼
```

## 태그 영역

| 항목              | 기준                                            |
| ----------------- | ----------------------------------------------- |
| gap               | `--space-2`                                     |
| margin bottom     | `--space-4`                                     |
| label font        | `--font-size-caption`, `--font-weight-semibold` |
| helper/error font | `--font-size-caption`, `--line-height-normal`   |

태그 영역 label은 필요할 때만 표시한다.
태그가 제목 바로 아래에 있어도 의미가 불명확하면 `태그` label을 짧게 둔다.

## 태그 칩

태그 칩은 compact control 패턴을 사용한다.

| 항목       | 기준                                              |
| ---------- | ------------------------------------------------- |
| background | `--color-primary-10` 또는 `--color-surface-muted` |
| text       | `--color-text-secondary`                          |
| border     | `--color-border-default`                          |
| radius     | `--radius-3`                                      |
| padding    | 좌우 `--space-2`, 상하 `--space-1`                |
| font       | `--font-size-caption`, `--font-weight-semibold`   |
| gap        | `--space-1`                                       |

삭제 버튼은 칩 안에 배치한다.
hover 시 `--color-action-danger`로 색상을 바꾸되, 삭제 가능 상태가 색상만으로 전달되지 않도록 accessible name을 제공한다.

## 태그 입력

태그 입력은 제목/본문 입력보다 낮은 시각적 위계로 둔다.

| 항목        | 기준                                     |
| ----------- | ---------------------------------------- |
| text        | `--color-text-primary`                   |
| placeholder | `--color-text-muted`                     |
| border      | `--color-border-default`                 |
| focus       | `--color-border-focus`, `--effect-focus` |
| radius      | `--radius-4`                             |
| height      | 최소 `44px`                              |
| padding     | 좌우 `--space-3`                         |
| font        | `--font-size-label`                      |

Enter는 태그 추가에 사용한다.
Enter로 노트 저장이 실행되지 않도록 한다.

## 오류 상태

- 오류 메시지는 태그 입력 아래에 inline으로 표시한다.
- 오류 텍스트는 `--color-text-danger`를 사용한다.
- 오류가 있는 입력에는 `aria-invalid="true"`를 적용한다.
- 오류 상태는 색상만으로 전달하지 않고 메시지를 함께 제공한다.

오류 메시지 예:

```text
이미 추가된 태그입니다
태그는 15자 이하로 입력하세요
태그는 최대 10개까지 추가할 수 있습니다
```

## 상태 규칙

### Empty

- 태그가 없으면 칩 목록을 표시하지 않는다.
- 빈 상태 문구는 기본적으로 표시하지 않는다.

### Hover

- 칩 삭제 버튼은 hover 시 더 명확해질 수 있다.
- 삭제 버튼이 hover 때만 보이더라도 keyboard focus에서는 반드시 보여야 한다.

### Focus

- 태그 입력 focus는 `--color-border-focus`와 `--effect-focus`를 사용한다.
- 칩 삭제 버튼도 별도의 focus-visible 상태를 가진다.

### Disabled / Saving

- 저장 중에는 태그 입력과 삭제 버튼을 비활성화할 수 있다.
- disabled 상태는 opacity `0.4`를 사용하되, 현재 값은 읽을 수 있어야 한다.

## 접근성

- 태그 입력에는 명확한 accessible name을 제공한다.
- 태그 칩 삭제 버튼은 삭제 대상 태그 이름을 accessible name에 포함한다.
- 태그 추가 오류는 입력과 연결된 inline message로 제공한다.
- keyboard만으로 태그 추가와 삭제가 가능해야 한다.

## 구현 체크리스트

- 태그 UI가 제목 입력 아래, 본문 입력 위에 있다.
- 태그 칩이 compact control 위계로 보인다.
- 태그 입력 높이가 최소 44px이다.
- 오류 메시지가 inline으로 표시된다.
- hover와 focus 상태가 구분된다.
- 원시 색상값을 추가하지 않았다.
