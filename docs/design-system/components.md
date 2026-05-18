# 컴포넌트 패턴

컴포넌트는 semantic token을 우선 사용한다.
새 패턴을 만들 때는 버튼, 카드, 입력 필드, 모달의 기본 상태와 접근성 규칙을 먼저 맞춘다.

## 공통 상태 규칙

- interactive element는 최소 44px 클릭 영역을 확보한다.
- hover와 focus는 같은 상태로 처리하지 않는다.
- focus는 `--color-border-focus`, `--stroke-2`, `--effect-focus`로 명확하게 표시한다.
- disabled는 opacity `0.4`를 기본으로 하되, 텍스트 대비와 cursor 처리를 함께 확인한다.
- 오류, 성공, selected, disabled 상태는 색상만으로 구분하지 않고 텍스트, border, ARIA 상태를 함께 사용한다.

## Button

### Primary Button

주요 액션에만 사용한다.
기능별 문서에서 primary action으로 지정한 버튼만 이 패턴을 사용한다.

| 속성             | 기준                                          |
| ---------------- | --------------------------------------------- |
| background       | `--color-action-primary-bg`                   |
| hover background | `--color-action-primary-bg-hover`             |
| text             | `--color-text-inverse`                        |
| radius           | `--radius-6`                                  |
| height           | 최소 `44px`                                   |
| padding          | `0 var(--space-5)`                            |
| font             | `--font-size-label`, `--font-weight-semibold` |

```css
.button-primary {
  min-height: 44px;
  padding: 0 var(--space-5);
  border-radius: var(--radius-6);
  background: var(--color-action-primary-bg);
  color: var(--color-text-inverse);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-semibold);
}
```

### Secondary Button

취소, 닫기, 보조 작업에 사용한다.

| 속성             | 기준                                |
| ---------------- | ----------------------------------- |
| background       | `--color-action-secondary-bg`       |
| hover background | `--color-action-secondary-bg-hover` |
| text             | `--color-text-muted`                |
| radius           | `--radius-6`                        |
| height           | 최소 `44px`                         |
| padding          | `0 var(--space-5)`                  |

### Destructive Button

삭제, 제거처럼 되돌리기 어려운 액션에 사용한다.
텍스트 버튼으로 사용할 때도 hover에 `--color-action-danger`를 적용한다.

| 속성            | 기준                       |
| --------------- | -------------------------- |
| text            | `--color-action-danger`    |
| soft background | `--color-action-danger-bg` |
| label           | 삭제 대상이 명확한 문구    |

## Card

### List Card

목록의 반복 항목에 사용하는 카드이다.
선택 상태와 hover 상태가 명확해야 한다.

| 속성         | 기본                     | selected                  |
| ------------ | ------------------------ | ------------------------- |
| background   | `--color-surface-card`   | `--color-surface-card`    |
| border       | `--color-border-default` | `--color-border-selected` |
| radius       | `--radius-7`             | `--radius-7`              |
| shadow       | `--effect-e0`            | `--effect-e3`             |
| hover shadow | `--effect-e2`            | `--effect-e3`             |
| padding      | `--space-4`              | `--space-4`               |

```css
.list-card {
  background: var(--color-surface-card);
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: var(--radius-7);
  box-shadow: var(--effect-e0);
  padding: var(--space-4);
}

.list-card:hover {
  box-shadow: var(--effect-e2);
}

.list-card[aria-selected='true'] {
  border-color: var(--color-border-selected);
  box-shadow: var(--effect-e3);
}
```

### Panel Card

편집 화면처럼 하나의 작업 영역을 담는 카드이다.

| 속성       | 기준                                                 |
| ---------- | ---------------------------------------------------- |
| background | `--color-surface-card`                               |
| border     | `--color-border-default`                             |
| radius     | `--radius-8`                                         |
| shadow     | `--effect-panel`                                     |
| padding    | 세로 `--space-8`, 가로 `--space-8` 또는 `--space-12` |
| max width  | `42rem` 수준                                         |

## Input Field

입력 필드는 투명 배경을 사용할 수 있지만 focus 상태는 반드시 보여야 한다.
placeholder는 보조 설명이며 label을 대체하지 않는다.

### Text Input

| 속성        | 기준                                                                    |
| ----------- | ----------------------------------------------------------------------- |
| text        | `--color-text-primary`                                                  |
| placeholder | `--color-text-muted`                                                    |
| font        | `--font-size-h2`, `--font-weight-bold` 또는 사용 맥락에 맞는 label/body |
| background  | `transparent` 또는 `--color-surface-card`                               |
| border      | 필요 시 `--color-border-default`                                        |
| focus       | `--color-border-focus`, `--effect-focus`                                |

### Textarea

| 속성        | 기준                                        |
| ----------- | ------------------------------------------- |
| text        | `--color-text-secondary`                    |
| placeholder | `--color-text-muted`                        |
| font        | `--font-size-body`, `--line-height-relaxed` |
| resize      | 긴 입력 흐름에서는 `none`을 기본으로 검토   |

### Validation

- 오류 텍스트는 `--color-text-danger`를 사용한다.
- 오류 상태는 색상만으로 표시하지 않고 메시지, border, `aria-invalid="true"`를 함께 제공한다.
- 오류가 있는 control에는 `aria-invalid="true"`를 적용한다.

## Modal

모달이 필요한 기능은 다음 공통 패턴을 사용한다.

| 영역              | 기준                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| Overlay           | `--color-overlay-scrim`                                              |
| Dialog background | `--color-surface-card`                                               |
| Dialog radius     | `--radius-8`                                                         |
| Dialog shadow     | `--effect-panel`보다 한 단계 강한 shadow가 필요하면 별도 token 추가  |
| Dialog padding    | `--space-6` 또는 `--space-8`                                         |
| Title             | `--font-size-h2`, `--font-weight-bold`, `--color-text-primary`       |
| Body              | `--font-size-body`, `--line-height-normal`, `--color-text-secondary` |
| Actions           | 오른쪽 정렬, primary action은 마지막에 배치                          |

### Modal 접근성

- dialog에는 `role="dialog"`와 `aria-modal="true"`를 적용한다.
- 제목을 `aria-labelledby`로 연결한다.
- Escape로 닫을 수 있어야 한다.
- 열릴 때 focus를 dialog 내부 첫 interactive element로 이동한다.
- 닫힐 때 focus를 modal을 연 trigger로 돌려준다.

## 구현 체크리스트

- 원시 색상값을 컴포넌트에 추가하지 않았다.
- primary, secondary, destructive action이 역할에 맞게 구분된다.
- hover와 focus 상태가 분리되어 있다.
- 오류, 성공, selected, disabled 상태가 텍스트, border, ARIA 상태를 함께 사용한다.
- 버튼과 클릭 가능한 카드는 최소 44px 터치 영역을 갖는다.
- 한글 UI 텍스트는 sans font stack을 사용한다.
