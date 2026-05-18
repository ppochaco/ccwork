# Notes App 디자인 시스템

## 디자인 원칙

Notes App의 스타일 작업은 Figma에서 정의한 디자인 시스템을 우선 기준으로 삼는다.
컴포넌트에는 원시 색상값이나 임의 수치를 직접 넣지 않고, primitive token, semantic token, component usage 순서로 적용한다.

- 노트 작성 흐름을 방해하지 않도록 배경과 보조 UI는 neutral 계열을 사용한다.
- 주요 행동은 primary CTA로 명확하게 구분한다.
- 선택, focus, 오류, 비활성 상태는 색상 외에도 border, outline, opacity, label 등으로 함께 전달한다.
- 클릭 가능한 요소는 최소 44px 터치 영역을 확보한다.
- 한글 본문은 Pretendard 계열을 기본으로 사용하고, 브랜드성 타이틀에만 display font를 제한적으로 사용한다.

## 문서 배치 기준

공통 디자인과 기능별 디자인은 문서 위치를 분리한다.

- 공통 디자인은 `docs/design-system/`에 둔다.
- 색상, 타이포그래피, 간격, radius, stroke, effect, 공통 컴포넌트 패턴은 디자인 시스템 문서에서 관리한다.
- 특정 기능의 배치, 상태, 마이크로카피, 기능 전용 컴포넌트 조합은 `docs/features/{feature}/design.md`에 둔다.
- 기능별 디자인 문서는 공통 token을 재정의하지 않고 `docs/design-system/`의 semantic token을 참조한다.

현재 기능별 디자인 문서:

- `docs/features/search/design.md`
- `docs/features/tag/design.md`

## 토큰 네이밍 규칙

토큰은 역할 단계에 따라 이름을 분리한다.

- Primitive token: 원시 값이다. `primary`, `neutral`, `red`, `space`, `radius`, `stroke`, `effect`, `font`처럼 값의 성격을 이름에 둔다.
- Semantic token: 화면에서의 의미이다. `bg-canvas`, `text-primary`, `border-selected`, `action-primary-bg`처럼 사용 목적을 이름에 둔다.
- Component usage: 컴포넌트의 적용 지점이다. 예: 노트 카드 배경은 `--color-surface-card`, 선택 카드 테두리는 `--color-border-selected`를 사용한다.

예시:

```text
--color-primary-100 -> --color-action-primary-bg -> 새 노트/저장 버튼 배경
--color-neutral-0 -> --color-surface-card -> 노트 카드/편집 패널 배경
--effect-e3 -> 선택된 노트 카드 그림자
```

## Color Tokens

### Primitive

| Token                    | Value               | 용도                             |
| ------------------------ | ------------------- | -------------------------------- |
| `--color-primary-100`    | `hsl(220 35% 14%)`  | 주요 CTA, 선택 강조, 핵심 텍스트 |
| `--color-primary-80`     | `hsl(220 24% 27%)`  | primary hover, 강조 텍스트 보조  |
| `--color-primary-10`     | `hsl(220 20% 94%)`  | primary soft background          |
| `--color-neutral-0`      | `hsl(0 0% 100%)`    | 카드, 편집 패널, header surface  |
| `--color-neutral-50`     | `hsl(0 0% 96%)`     | sidebar surface                  |
| `--color-neutral-100`    | `hsl(0 0% 94%)`     | 앱 canvas background             |
| `--color-neutral-200`    | `hsl(0 0% 90%)`     | secondary button background      |
| `--color-neutral-300`    | `hsl(0 0% 88%)`     | border, divider                  |
| `--color-neutral-600`    | `hsl(0 0% 42%)`     | muted text                       |
| `--color-neutral-700`    | `hsl(220 10% 28%)`  | secondary text                   |
| `--color-neutral-900`    | `hsl(220 35% 14%)`  | primary text                     |
| `--color-red-100`        | `hsl(0 84% 60%)`    | destructive action, error text   |
| `--color-red-10`         | `hsl(0 86% 96%)`    | destructive soft background      |
| `--color-focus-ring`     | `hsl(220 90% 56%)`  | keyboard focus outline           |
| `--color-black-alpha-32` | `rgb(0 0 0 / 0.32)` | modal overlay                    |

### Semantic

| Token                               | Primitive 참조           | 용도                              |
| ----------------------------------- | ------------------------ | --------------------------------- |
| `--color-bg-canvas`                 | `--color-neutral-100`    | 앱 전체 배경                      |
| `--color-bg-sidebar`                | `--color-neutral-50`     | 노트 목록 사이드바                |
| `--color-surface-card`              | `--color-neutral-0`      | 노트 카드, editor panel, header   |
| `--color-surface-muted`             | `--color-neutral-200`    | secondary button, muted surface   |
| `--color-text-primary`              | `--color-neutral-900`    | 제목, 주요 본문                   |
| `--color-text-secondary`            | `--color-neutral-700`    | 보조 본문                         |
| `--color-text-muted`                | `--color-neutral-600`    | metadata, placeholder, empty text |
| `--color-text-inverse`              | `--color-neutral-0`      | primary CTA 위 텍스트             |
| `--color-text-danger`               | `--color-red-100`        | 오류, 삭제 hover                  |
| `--color-border-default`            | `--color-neutral-300`    | 일반 border와 divider             |
| `--color-border-selected`           | `--color-primary-100`    | 선택된 노트 카드 border           |
| `--color-border-focus`              | `--color-focus-ring`     | keyboard focus outline            |
| `--color-action-primary-bg`         | `--color-primary-100`    | 새 노트, 저장 버튼 배경           |
| `--color-action-primary-bg-hover`   | `--color-primary-80`     | primary button hover              |
| `--color-action-secondary-bg`       | `--color-neutral-200`    | 취소, 보조 버튼 배경              |
| `--color-action-secondary-bg-hover` | `--color-neutral-300`    | secondary button hover            |
| `--color-action-danger`             | `--color-red-100`        | 삭제 액션                         |
| `--color-action-danger-bg`          | `--color-red-10`         | 삭제 확인, 오류 강조 배경         |
| `--color-overlay-scrim`             | `--color-black-alpha-32` | modal overlay                     |

## Typography Tokens

| Token                    | Value                                                      | 용도                                  |
| ------------------------ | ---------------------------------------------------------- | ------------------------------------- |
| `--font-family-sans`     | `"Pretendard Variable", Pretendard, system-ui, sans-serif` | 한글 본문, UI 텍스트                  |
| `--font-family-display`  | `"Boogaloo", "Pretendard Variable", sans-serif`            | 앱 브랜드 타이틀                      |
| `--font-size-display`    | `32px`                                                     | 브랜드 타이틀이 큰 화면에서 필요할 때 |
| `--font-size-h1`         | `24px`                                                     | header title                          |
| `--font-size-h2`         | `20px`                                                     | editor title input                    |
| `--font-size-body`       | `16px`                                                     | editor body textarea                  |
| `--font-size-label`      | `14px`                                                     | button, card title                    |
| `--font-size-caption`    | `12px`                                                     | section label, card preview           |
| `--font-size-micro`      | `10px`                                                     | 날짜 metadata                         |
| `--font-weight-regular`  | `400`                                                      | 본문                                  |
| `--font-weight-semibold` | `600`                                                      | button, section label                 |
| `--font-weight-bold`     | `700`                                                      | header title, note title              |
| `--line-height-tight`    | `1.25`                                                     | title                                 |
| `--line-height-normal`   | `1.5`                                                      | UI text                               |
| `--line-height-relaxed`  | `1.625`                                                    | note content preview, editor body     |
| `--letter-spacing-label` | `0.08em`                                                   | uppercase section label               |

## Spacing Tokens

간격은 4px 배수를 기본으로 사용한다.

| Token        | Value  | 용도                                         |
| ------------ | ------ | -------------------------------------------- |
| `--space-0`  | `0`    | reset                                        |
| `--space-1`  | `4px`  | 미세 간격                                    |
| `--space-2`  | `8px`  | compact gap                                  |
| `--space-3`  | `12px` | sidebar padding, button gap                  |
| `--space-4`  | `16px` | card padding, divider margin                 |
| `--space-5`  | `20px` | button horizontal padding                    |
| `--space-6`  | `24px` | header padding, section gap                  |
| `--space-8`  | `32px` | main content padding, panel vertical padding |
| `--space-12` | `48px` | large panel horizontal padding               |
| `--space-18` | `72px` | desktop sidebar width 기준 단위              |

## Radius Tokens

| Token        | Value  | 용도                       |
| ------------ | ------ | -------------------------- |
| `--radius-0` | `0`    | divider, reset             |
| `--radius-3` | `6px`  | tag chip, compact control  |
| `--radius-4` | `8px`  | popover, input, small card |
| `--radius-6` | `12px` | button, standard control   |
| `--radius-7` | `16px` | note card                  |
| `--radius-8` | `24px` | editor panel               |

## Stroke Tokens

| Token        | Value | 용도                             |
| ------------ | ----- | -------------------------------- |
| `--stroke-0` | `0`   | border 없음                      |
| `--stroke-1` | `1px` | 기본 border, divider             |
| `--stroke-2` | `2px` | focus outline, selected emphasis |

## Effect Tokens

그림자는 정보 구조를 돕는 수준으로만 사용한다.

| Token            | Value                             | 용도               |
| ---------------- | --------------------------------- | ------------------ |
| `--effect-e0`    | `none`                            | 평면 요소          |
| `--effect-e1`    | `0 1px 4px rgb(0 0 0 / 0.06)`     | header             |
| `--effect-e2`    | `0 2px 8px rgb(0 0 0 / 0.07)`     | note card hover    |
| `--effect-e3`    | `0 2px 12px rgb(0 0 0 / 0.12)`    | selected note card |
| `--effect-panel` | `0 2px 12px rgb(0 0 0 / 0.07)`    | editor panel       |
| `--effect-focus` | `0 0 0 3px rgb(37 99 235 / 0.24)` | focus ring 보조    |

## Semantic Token 사용 기준

- 화면 배경에는 `--color-bg-canvas`를 사용한다.
- 사이드바에는 `--color-bg-sidebar`를 사용하고, 카드와 구분되도록 `--color-border-default`를 오른쪽 border에 적용한다.
- 카드, header, editor panel에는 `--color-surface-card`를 사용한다.
- 본문 주요 텍스트는 `--color-text-primary`, 보조 설명과 metadata는 `--color-text-muted`를 사용한다.
- primary button은 `--color-action-primary-bg`와 `--color-text-inverse`를 함께 사용한다.
- secondary button은 `--color-action-secondary-bg`와 `--color-text-muted`를 함께 사용한다.
- 선택된 노트 카드에는 `--color-border-selected`와 `--effect-e3`를 함께 사용한다.
- 오류와 삭제 액션은 `--color-action-danger`를 사용하되, destructive 상태가 명확해야 할 때 `--color-action-danger-bg`를 함께 사용한다.
- focus 상태는 hover와 별도로 `--color-border-focus`, `--stroke-2`, `--effect-focus`를 사용한다.

## Notes 화면 컴포넌트 적용 명세

### App Shell

- 전체 배경: `--color-bg-canvas`
- 기본 글꼴: `--font-family-sans`
- header 배경: `--color-surface-card`
- header border: `--stroke-1 solid var(--color-border-default)`
- header shadow: `--effect-e1`

### Header

- 브랜드 타이틀: `--font-family-display`, `--font-size-h1`, `--font-weight-bold`, `--color-text-primary`
- 새 노트 버튼: primary button 토큰을 사용한다.
- header 높이는 콘텐츠와 padding으로 결정하되, 버튼 터치 영역은 44px 이상을 유지한다.

### Sidebar

- 배경: `--color-bg-sidebar`
- 오른쪽 border: `--color-border-default`
- 내부 padding: `--space-3`
- 노트 개수 label: `--font-size-caption`, `--font-weight-semibold`, `--letter-spacing-label`, `--color-text-muted`

### Note Card

- 기본 배경: `--color-surface-card`
- border: `--stroke-1 solid var(--color-border-default)`
- radius: `--radius-7`
- padding: `--space-4`
- hover shadow: `--effect-e2`
- selected border: `--color-border-selected`
- selected shadow: `--effect-e3`
- 제목: `--font-size-label`, `--font-weight-semibold`, `--color-text-primary`
- 미리보기: `--font-size-caption`, `--line-height-relaxed`, `--color-text-muted`
- 날짜: `--font-size-micro`, `--color-text-muted`
- 삭제 버튼 hover: `--color-action-danger`

### Editor Panel

- 배경: `--color-surface-card`
- border: `--stroke-1 solid var(--color-border-default)`
- radius: `--radius-8`
- shadow: `--effect-panel`
- padding: `--space-8` 세로, `--space-12` 가로
- section label: `--font-size-caption`, `--font-weight-semibold`, `--letter-spacing-label`, `--color-text-muted`
- 제목 입력: `--font-size-h2`, `--font-weight-bold`, `--color-text-primary`
- 본문 입력: `--font-size-body`, `--line-height-relaxed`, `--color-text-secondary`
- divider: `--stroke-1 solid var(--color-border-default)`

### Buttons

- 높이: 최소 `44px`
- radius: `--radius-6`
- label: `--font-size-label`, `--font-weight-semibold`
- primary background: `--color-action-primary-bg`
- primary hover: `--color-action-primary-bg-hover`
- secondary background: `--color-action-secondary-bg`
- secondary hover: `--color-action-secondary-bg-hover`
- disabled: opacity `0.4`, pointer event 제한, focus 가능 여부는 컴포넌트 목적에 맞춘다.

## Accessibility / 상태 규칙

- 모든 interactive element는 keyboard focus가 보여야 한다.
- focus는 hover와 같은 색상 변화만으로 처리하지 않는다.
- 선택 상태는 border, shadow, `aria-current` 또는 `aria-selected` 등으로 함께 전달한다.
- 오류 메시지는 색상만으로 전달하지 않고 텍스트를 함께 표시한다.
- 삭제처럼 되돌리기 어려운 액션은 destructive 색상을 사용하고, 필요하면 확인 흐름을 둔다.
- placeholder는 설명 보조용이며 label을 대체하지 않는다.
- 본문 텍스트 대비는 최소 WCAG AA 기준을 목표로 한다.
- 아이콘만 있는 버튼은 접근 가능한 이름을 제공한다.

## Do / Don’t

### Do

- semantic token을 우선 사용한다.
- 앱 배경과 보조 영역은 neutral 기반 배경을 사용한다.
- 새 노트, 저장 같은 핵심 액션은 primary CTA로 표현한다.
- 선택 상태에는 secondary 시각 단서인 border, shadow, ARIA 상태를 함께 적용한다.
- focus 상태는 명확한 outline이나 ring으로 hover와 구분한다.
- 버튼과 클릭 가능한 카드에는 최소 44px 클릭 영역을 확보한다.

### Don’t

- 컴포넌트에 `#111827`, `hsl(...)`, `rgba(...)` 같은 원시 색상값을 직접 넣지 않는다.
- 선택 상태를 색상만으로 전달하지 않는다.
- hard shadow를 과하게 사용하지 않는다.
- Inter 단독 한글 폰트를 사용하지 않는다.
- hover와 focus를 동일한 상태로 처리하지 않는다.
