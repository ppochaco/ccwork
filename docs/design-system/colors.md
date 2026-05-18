# 색상 시스템

색상은 primitive palette와 semantic token을 분리해서 사용한다.
컴포넌트에는 원시 `hsl`, `rgb`, `rgba`, `hex` 값을 직접 넣지 않고 semantic token을 우선 적용한다.

## Palette

### Primary

| Token                 | Value              | 용도                             |
| --------------------- | ------------------ | -------------------------------- |
| `--color-primary-100` | `hsl(220 35% 14%)` | 주요 CTA, 선택 강조, 핵심 텍스트 |
| `--color-primary-80`  | `hsl(220 24% 27%)` | primary hover, 강조 텍스트 보조  |
| `--color-primary-10`  | `hsl(220 20% 94%)` | primary soft background          |

### Secondary / Neutral

| Token                 | Value              | 용도                         |
| --------------------- | ------------------ | ---------------------------- |
| `--color-neutral-0`   | `hsl(0 0% 100%)`   | 카드, header, editor surface |
| `--color-neutral-50`  | `hsl(0 0% 96%)`    | sidebar surface              |
| `--color-neutral-100` | `hsl(0 0% 94%)`    | 앱 canvas background         |
| `--color-neutral-200` | `hsl(0 0% 90%)`    | secondary button background  |
| `--color-neutral-300` | `hsl(0 0% 88%)`    | border, divider              |
| `--color-neutral-600` | `hsl(0 0% 42%)`    | muted text                   |
| `--color-neutral-700` | `hsl(220 10% 28%)` | secondary text               |
| `--color-neutral-900` | `hsl(220 35% 14%)` | primary text                 |

### State

| Token                    | Value               | 용도                           |
| ------------------------ | ------------------- | ------------------------------ |
| `--color-red-100`        | `hsl(0 84% 60%)`    | destructive action, error text |
| `--color-red-10`         | `hsl(0 86% 96%)`    | destructive soft background    |
| `--color-focus-ring`     | `hsl(220 90% 56%)`  | keyboard focus outline         |
| `--color-black-alpha-32` | `rgb(0 0 0 / 0.32)` | modal overlay                  |

## Semantic Mapping

### Surface

| Semantic token          | Primitive 참조        | 사용처                          |
| ----------------------- | --------------------- | ------------------------------- |
| `--color-bg-canvas`     | `--color-neutral-100` | 앱 전체 배경                    |
| `--color-bg-sidebar`    | `--color-neutral-50`  | 노트 목록 사이드바              |
| `--color-surface-card`  | `--color-neutral-0`   | 노트 카드, editor panel, header |
| `--color-surface-muted` | `--color-neutral-200` | secondary button, muted surface |

### Text

| Semantic token           | Primitive 참조        | 사용처                            |
| ------------------------ | --------------------- | --------------------------------- |
| `--color-text-primary`   | `--color-neutral-900` | 제목, 주요 본문                   |
| `--color-text-secondary` | `--color-neutral-700` | 보조 본문                         |
| `--color-text-muted`     | `--color-neutral-600` | metadata, placeholder, empty text |
| `--color-text-inverse`   | `--color-neutral-0`   | primary CTA 위 텍스트             |
| `--color-text-danger`    | `--color-red-100`     | 오류, 삭제 hover                  |

### Border

| Semantic token            | Primitive 참조        | 사용처                  |
| ------------------------- | --------------------- | ----------------------- |
| `--color-border-default`  | `--color-neutral-300` | 일반 border, divider    |
| `--color-border-selected` | `--color-primary-100` | 선택된 노트 카드 border |
| `--color-border-focus`    | `--color-focus-ring`  | keyboard focus outline  |

### Action / State

| Semantic token                      | Primitive 참조           | 사용처                    |
| ----------------------------------- | ------------------------ | ------------------------- |
| `--color-action-primary-bg`         | `--color-primary-100`    | 새 노트, 저장 버튼 배경   |
| `--color-action-primary-bg-hover`   | `--color-primary-80`     | primary button hover      |
| `--color-action-secondary-bg`       | `--color-neutral-200`    | 취소, 보조 버튼 배경      |
| `--color-action-secondary-bg-hover` | `--color-neutral-300`    | secondary button hover    |
| `--color-action-danger`             | `--color-red-100`        | 삭제 액션                 |
| `--color-action-danger-bg`          | `--color-red-10`         | 삭제 확인, 오류 강조 배경 |
| `--color-overlay-scrim`             | `--color-black-alpha-32` | modal overlay             |

## 사용 규칙

- 화면 배경은 `--color-bg-canvas`를 사용한다.
- 사이드바는 `--color-bg-sidebar`를 사용하고, 카드와 구분되도록 `--color-border-default`를 함께 적용한다.
- 카드, header, editor panel은 `--color-surface-card`를 사용한다.
- primary CTA는 `--color-action-primary-bg`와 `--color-text-inverse`를 함께 사용한다.
- destructive action은 `--color-action-danger`를 사용하고, 강조 영역에는 `--color-action-danger-bg`를 추가한다.
- focus 상태는 hover와 별도로 `--color-border-focus`를 사용한다.

## Tailwind 연결 예시

```css
@theme {
  --color-background: var(--color-bg-canvas);
  --color-card: var(--color-surface-card);
  --color-foreground: var(--color-text-primary);
  --color-muted: var(--color-surface-muted);
  --color-muted-foreground: var(--color-text-muted);
  --color-border: var(--color-border-default);
  --color-destructive: var(--color-action-danger);
}
```
