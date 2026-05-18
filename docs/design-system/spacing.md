# Spacing 시스템

간격은 Tailwind의 4px 기반 scale을 따른다.
컴포넌트 내부 여백, 컴포넌트 간 gap, 화면 grid는 같은 scale에서 선택한다.

## Spacing Scale

| Token        | Value  | Tailwind 기준 | 용도                                         |
| ------------ | ------ | ------------- | -------------------------------------------- |
| `--space-0`  | `0`    | `0`           | reset                                        |
| `--space-1`  | `4px`  | `1`           | 미세 간격, focus offset                      |
| `--space-2`  | `8px`  | `2`           | compact gap                                  |
| `--space-3`  | `12px` | `3`           | sidebar padding, button gap                  |
| `--space-4`  | `16px` | `4`           | card padding, divider margin                 |
| `--space-5`  | `20px` | `5`           | button horizontal padding                    |
| `--space-6`  | `24px` | `6`           | header padding, section gap                  |
| `--space-8`  | `32px` | `8`           | main content padding, panel vertical padding |
| `--space-12` | `48px` | `12`          | large panel horizontal padding               |
| `--space-18` | `72px` | `18`          | desktop sidebar width 기준 단위              |

## Layout Grid

Notes App은 복잡한 column grid보다 고정 sidebar와 fluid main 영역을 우선한다.

| 영역             | 기준                                   |
| ---------------- | -------------------------------------- |
| App shell        | `min-height: 100vh`                    |
| Header           | 좌우 `--space-6`, 상하 `--space-4`     |
| Body             | header 제외 높이를 채우는 flex layout  |
| Sidebar          | `18rem` 또는 `--space-18 * 4`, 고정 폭 |
| Main             | 남은 영역을 채우는 fluid column        |
| Main padding     | `--space-8`                            |
| Editor max width | `42rem` 수준                           |

## Component Spacing

### Header

- header 좌우 padding은 `--space-6`을 사용한다.
- header 상하 padding은 `--space-4`를 사용한다.
- title과 action은 `justify-between`으로 분리한다.

### Sidebar

- sidebar padding은 `--space-3`을 사용한다.
- 노트 카드 사이 gap은 `--space-2`를 사용한다.
- 노트 개수 label 아래 여백은 `--space-1` 수준으로 유지한다.

### Note Card

- 카드 padding은 `--space-4`를 사용한다.
- 제목과 본문 preview 간격은 `--space-1`에서 `--space-2` 사이로 둔다.
- 본문 preview와 날짜 metadata 간격은 `--space-2`를 사용한다.

### Editor Panel

- panel 세로 padding은 `--space-8`을 사용한다.
- panel 가로 padding은 기본 `--space-8`, 넓은 화면에서 `--space-12`를 사용한다.
- section label과 제목 입력 사이 간격은 `--space-6`을 사용한다.
- 제목 입력과 divider 간격은 `--space-4`를 사용한다.
- 버튼 영역은 위쪽 border와 `--space-4` 이상의 간격을 둔다.

### Form Controls

- 버튼 horizontal padding은 `--space-5`를 사용한다.
- 버튼 간 gap은 `--space-3`을 사용한다.
- 입력 필드와 inline error 간격은 `--space-1` 또는 `--space-2`를 사용한다.

## Responsive 기준

- 작은 화면에서는 panel 가로 padding을 `--space-8` 이하로 줄인다.
- sidebar와 main을 동시에 유지하기 어려운 폭에서는 sidebar를 상단 목록 또는 drawer 패턴으로 전환한다.
- 고정 format UI는 `min-width`, `max-width`, `aspect-ratio` 같은 안정적인 제약을 둔다.
- 텍스트가 버튼이나 카드 내부에서 넘치면 font를 viewport 단위로 줄이지 말고 줄바꿈, truncation, layout 제약을 먼저 조정한다.

## CSS 변수 예시

```css
:root {
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-18: 72px;
}
```
