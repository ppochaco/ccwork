#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const UI_FILE_PATTERN = /\.(jsx|tsx|css)$/;
const STATE_PATTERN =
  /\b(?:error|invalid|danger|destructive|success|selected|active|disabled|isSelected|isActive|isDisabled|aria-selected|aria-current|aria-invalid|aria-disabled|disabled)\b/i;
const STATE_VISUAL_PATTERN =
  /\b(?:text|bg|border|outline|ring|opacity)-(?:destructive|danger|red|green|emerald|success|selected|foreground|muted|border|primary|secondary|\d)/i;
const BORDER_PATTERN =
  /\b(?:border(?:-[a-z0-9/[\]().:%#-]+)?|outline|ring)-[^\s'"`}>)]*|\bborder\b/i;
const ACCESSIBILITY_PATTERN = /\b(?:aria-[a-z-]+|role=|disabled=|disabled\b)/i;
const TEXT_PATTERN =
  /(?:>\s*[^<>{}\s][^<>{}]*\s*<|\b(?:label|title|message|description|errorMessage|statusText|aria-label|aria-labelledby|aria-describedby)\b)/i;
const JSX_ELEMENT_PATTERN = /<([A-Z][A-Za-z0-9]*|[a-z][a-z0-9-]*)(?:\s|>)[\s\S]*?(?:\/>|<\/\1>)/g;
const CSS_RULE_PATTERN =
  /[^{}]*(?:error|invalid|danger|destructive|success|selected|active|disabled)[^{]*\{[^{}]*\}/gi;

function getLineNumber(content, index) {
  return content.slice(0, index).split('\n').length;
}

function checkJsxStateRepresentation(filePath, content) {
  const warnings = [];

  for (const match of content.matchAll(JSX_ELEMENT_PATTERN)) {
    const snippet = match[0];

    if (!STATE_PATTERN.test(snippet) || !STATE_VISUAL_PATTERN.test(snippet)) {
      continue;
    }

    const hasBorder = BORDER_PATTERN.test(snippet);
    const hasAccessibility = ACCESSIBILITY_PATTERN.test(snippet);
    const hasText = TEXT_PATTERN.test(snippet);

    if (!hasText || !hasBorder || !hasAccessibility) {
      warnings.push({
        filePath,
        line: getLineNumber(content, match.index),
        message:
          '상태 표현은 색상만으로 구분하지 말고 텍스트, 테두리, 접근성 속성을 함께 사용하세요.',
      });
    }
  }

  return warnings;
}

function checkCssStateRepresentation(filePath, content) {
  const warnings = [];

  for (const match of content.matchAll(CSS_RULE_PATTERN)) {
    const snippet = match[0];

    if (!STATE_VISUAL_PATTERN.test(snippet) || BORDER_PATTERN.test(snippet)) {
      continue;
    }

    warnings.push({
      filePath,
      line: getLineNumber(content, match.index),
      message:
        '상태 스타일에는 색상 외에 border/outline/ring을 함께 정의하고 JSX에서 텍스트와 접근성 속성을 연결하세요.',
    });
  }

  return warnings;
}

function checkFile(filePath) {
  if (!UI_FILE_PATTERN.test(filePath)) {
    return [];
  }

  const absolutePath = path.resolve(repoRoot, filePath);

  if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
    return [];
  }

  const content = fs.readFileSync(absolutePath, 'utf8');

  if (filePath.endsWith('.css')) {
    return checkCssStateRepresentation(filePath, content);
  }

  return checkJsxStateRepresentation(filePath, content);
}

const files = process.argv.slice(2);

if (files.length === 0) {
  process.exit(0);
}

const warnings = files.flatMap((filePath) => checkFile(filePath));

if (warnings.length > 0) {
  process.stderr.write('[design-system-state] 상태 표현 원칙 위반 가능성이 있습니다.\n');

  for (const warning of warnings) {
    process.stderr.write(`- ${warning.filePath}:${warning.line} ${warning.message}\n`);
  }

  process.stderr.write(
    '[design-system-state] 이 스크립트는 경고만 출력하고 exit code 0으로 종료합니다. 상태를 텍스트, 테두리, 접근성 속성으로 함께 보강하세요.\n',
  );
}

process.exit(0);
