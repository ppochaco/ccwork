---
name: design-system
description: Use automatically when writing or modifying UI code in this repo, including React .tsx/.jsx components, CSS files, Tailwind classes, visual states, layout spacing, typography, colors, buttons, cards, inputs, modals, or design-system documentation.
---

# Design System

Use this skill for UI implementation and UI refactoring in the Notes App.

## Required References

Before editing UI code, read the shared design-system documents:

1. `docs/design-system/index.md`
2. `docs/design-system/colors.md`
3. `docs/design-system/typography.md`
4. `docs/design-system/spacing.md`
5. `docs/design-system/components.md`

If the work is feature-specific, also read the feature design document when it exists:

- Search UI: `docs/features/search/design.md`
- Tag UI: `docs/features/tag/design.md`

## Workflow

1. Identify whether the change is shared UI, feature-specific UI, or both.
2. Read the relevant design documents before editing.
3. Reuse patterns from `docs/design-system/components.md` before creating a new component style.
4. Prefer semantic tokens over primitive tokens in component usage.
5. Keep feature-specific layout, state, and microcopy decisions in `docs/features/{feature}/design.md`.
6. Keep shared tokens and reusable patterns in `docs/design-system/`.

## Implementation Rules

- Do not add raw `hex`, `hsl`, `rgb`, or `rgba` values inside components.
- Do not introduce one-off Tailwind values when an existing token or documented pattern fits.
- Use semantic color tokens for surfaces, text, borders, actions, and states.
- Use the spacing scale from `docs/design-system/spacing.md`.
- Use the typography scale from `docs/design-system/typography.md`.
- Use button, card, input, and modal patterns from `docs/design-system/components.md`.
- Keep hover and focus states visually distinct.
- Do not represent error, success, selected, or disabled states with color alone. Use text, border, and accessibility attributes together.
- Preserve at least 44px click targets for interactive controls when practical.
- Use the configured Korean-friendly sans font stack for UI text.

## Validation

Before finishing UI code changes:

1. Check that new component styles do not contain raw color values.
2. Check that UI changes reference the documented shared or feature design rules.
3. Check PostToolUse design-system hook warnings after UI file edits.
4. Treat any design-system warning output as feedback to fix immediately, even though the hook exits with code 0.
5. Run the smallest relevant verification command:
   - UI code changes: `npm run lint`
   - Broader behavior changes: `npm test`
   - Build-sensitive changes: `npm run build`

If validation cannot be run, explain why in the final response.
