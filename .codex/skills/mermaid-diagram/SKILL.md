---
name: mermaid-diagram
description: Create Mermaid-based architecture diagrams for source code and save them as project documentation. Use when the user asks to visualize project structure, component dependencies, state flow, API flow, module relationships, or generate Mermaid diagrams inside HTML or Markdown files.
---

# Mermaid Diagram

## Workflow

1. Inspect the requested source files before drawing diagrams.
2. Identify direct imports, render composition, slot composition, state owners, state consumers, and API boundaries.
3. Use `flowchart TD` for component/module dependency diagrams.
4. Use `flowchart LR` or `sequenceDiagram` for state, event, and API flows.
5. Distinguish direct imports from values passed as props or slots.
6. Keep node labels short enough to read in a browser.
7. Save output to the user-requested path.

## HTML Output

When the user requests a browser-viewable result:

1. Create a standalone HTML file.
2. Load Mermaid from CDN:

```html
<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
  mermaid.initialize({ startOnLoad: true, theme: "neutral" });
</script>
```

3. Put each diagram in `<pre class="mermaid">...</pre>`.
4. Add enough surrounding text to explain what each diagram shows.
5. Prefer simple CSS over framework dependencies.

## React Project Diagram Rules

- Start from the app entry point (`main.tsx`, `App.tsx`, or equivalent).
- Show provider boundaries separately from UI components.
- Show Context hooks as consumers of provider state.
- Show API modules as a boundary between UI state and external services.
- Show type-only dependencies only when they clarify data shape.
- Mark slot/render composition explicitly when a layout receives children, `ReactNode`, or named slots.

## Quality Checks

- Verify that every diagram edge matches the inspected code.
- Run a basic file existence check after writing the output.
- If possible, open the generated HTML with the platform command requested by the user.
