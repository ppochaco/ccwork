# 타이포그래피 시스템

한글 UI와 본문은 Pretendard 계열을 기본으로 사용한다.
브랜드성 타이틀처럼 장식성이 필요한 경우에만 display font를 제한적으로 사용한다.

## Font Family

| Token                   | Value                                                      | 용도                 |
| ----------------------- | ---------------------------------------------------------- | -------------------- |
| `--font-family-sans`    | `"Pretendard Variable", Pretendard, system-ui, sans-serif` | 한글 본문, UI 텍스트 |
| `--font-family-display` | `"Boogaloo", "Pretendard Variable", sans-serif`            | 앱 브랜드 타이틀     |

## Font Size Scale

| Token                 | Value  | Tailwind 기준 | 용도                        |
| --------------------- | ------ | ------------- | --------------------------- |
| `--font-size-display` | `32px` | `text-3xl`    | 큰 브랜드 타이틀            |
| `--font-size-h1`      | `24px` | `text-2xl`    | header title                |
| `--font-size-h2`      | `20px` | `text-xl`     | editor title input          |
| `--font-size-body`    | `16px` | `text-base`   | editor body textarea        |
| `--font-size-label`   | `14px` | `text-sm`     | button, card title          |
| `--font-size-caption` | `12px` | `text-xs`     | section label, card preview |
| `--font-size-micro`   | `10px` | `text-[10px]` | 날짜 metadata               |

## Weight

| Token                    | Value | Tailwind 기준   | 용도                              |
| ------------------------ | ----- | --------------- | --------------------------------- |
| `--font-weight-regular`  | `400` | `font-normal`   | 본문                              |
| `--font-weight-semibold` | `600` | `font-semibold` | button, section label, card title |
| `--font-weight-bold`     | `700` | `font-bold`     | header title, editor title        |

## Line Height

| Token                   | Value   | Tailwind 기준     | 용도                              |
| ----------------------- | ------- | ----------------- | --------------------------------- |
| `--line-height-tight`   | `1.25`  | `leading-tight`   | 제목                              |
| `--line-height-normal`  | `1.5`   | `leading-normal`  | UI text                           |
| `--line-height-relaxed` | `1.625` | `leading-relaxed` | note content preview, editor body |

## Letter Spacing

| Token                    | Value    | Tailwind 기준     | 용도                    |
| ------------------------ | -------- | ----------------- | ----------------------- |
| `--letter-spacing-label` | `0.08em` | `tracking-widest` | uppercase section label |

## 적용 기준

### Header

- 브랜드 타이틀은 `--font-family-display`, `--font-size-h1`, `--font-weight-bold`를 사용한다.
- header action label은 `--font-size-label`, `--font-weight-semibold`를 사용한다.

### Note Card

- 카드 제목은 `--font-size-label`, `--font-weight-semibold`, `--line-height-tight`를 사용한다.
- 카드 미리보기는 `--font-size-caption`, `--line-height-relaxed`를 사용한다.
- 날짜 metadata는 `--font-size-micro`, `--line-height-normal`을 사용한다.

### Editor

- section label은 `--font-size-caption`, `--font-weight-semibold`, `--letter-spacing-label`을 사용한다.
- 제목 입력은 `--font-size-h2`, `--font-weight-bold`, `--line-height-tight`를 사용한다.
- 본문 입력은 `--font-size-body`, `--font-weight-regular`, `--line-height-relaxed`를 사용한다.

## 사용 규칙

- Inter 단독 한글 폰트는 사용하지 않는다.
- 본문과 입력 필드는 display font를 사용하지 않는다.
- 버튼, label, metadata에는 hero-scale type을 사용하지 않는다.
- 작은 텍스트는 색상 대비를 함께 확인한다.

## CSS 변수 예시

```css
:root {
  --font-family-sans: 'Pretendard Variable', Pretendard, system-ui, sans-serif;
  --font-family-display: 'Boogaloo', 'Pretendard Variable', sans-serif;
  --font-size-display: 32px;
  --font-size-h1: 24px;
  --font-size-h2: 20px;
  --font-size-body: 16px;
  --font-size-label: 14px;
  --font-size-caption: 12px;
  --font-size-micro: 10px;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --letter-spacing-label: 0.08em;
}
```
