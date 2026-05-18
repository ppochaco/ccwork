#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const spacingDocPath = path.join(repoRoot, 'docs/design-system/spacing.md');

const COLOR_PATTERNS = [
  { label: 'hex color', pattern: /#[0-9a-fA-F]{3,8}\b/g },
  { label: 'rgb color', pattern: /\brgba?\([^)]*\)/g },
  { label: 'hsl color', pattern: /\bhsla?\([^)]*\)/g },
];

const SPACING_CLASS_PREFIX =
  '(?:m|mx|my|mt|mr|mb|ml|p|px|py|pt|pr|pb|pl|gap|gap-x|gap-y|space-x|space-y|inset|inset-x|inset-y|top|right|bottom|left)';
const SPACING_CLASS_PATTERN = new RegExp(
  String.raw`(?:^|\s)(?:[a-z0-9_-]+:)*!?-?(${SPACING_CLASS_PREFIX})-(-?(?:\d+(?:\.\d+)?|\[[^\]]+\]))(?=\s|$)`,
  'g',
);

const SPACING_CSS_PATTERN =
  /\b(?:margin|margin-inline|margin-block|margin-top|margin-right|margin-bottom|margin-left|padding|padding-inline|padding-block|padding-top|padding-right|padding-bottom|padding-left|gap|row-gap|column-gap|inset|top|right|bottom|left)\s*:\s*([^;]+)/g;

function readAllowedSpacingValues() {
  try {
    const doc = fs.readFileSync(spacingDocPath, 'utf8');
    const allowed = new Set();

    for (const match of doc.matchAll(/\|\s*`--space-[^`]+`\s*\|\s*`([^`]+)`\s*\|\s*`([^`]+)`/g)) {
      allowed.add(match[1]);
      allowed.add(match[2]);
    }

    for (const match of doc.matchAll(/--space-[^:]+:\s*([^;]+);/g)) {
      allowed.add(match[1].trim());
    }

    return allowed;
  } catch (error) {
    process.stderr.write(
      `[design-system] spacing 문서를 읽을 수 없습니다: ${spacingDocPath}\n${error.message}\n`,
    );
    return new Set();
  }
}

function getLineNumber(content, index) {
  return content.slice(0, index).split('\n').length;
}

function normalizeSpacingValue(value) {
  return value.trim().replace(/^['"]|['"]$/g, '');
}

function isAllowedTailwindSpacing(value, allowedSpacingValues) {
  if (allowedSpacingValues.has(value)) {
    return true;
  }

  if (value.startsWith('-') && allowedSpacingValues.has(value.slice(1))) {
    return true;
  }

  return false;
}

function isAllowedCssSpacing(value, allowedSpacingValues) {
  const normalized = normalizeSpacingValue(value);

  if (
    normalized === '0' ||
    normalized === 'auto' ||
    normalized.startsWith('var(--space-') ||
    normalized.includes('var(--space-')
  ) {
    return true;
  }

  const parts = normalized.split(/\s+/);
  return parts.every((part) => allowedSpacingValues.has(part));
}

function checkFile(filePath, allowedSpacingValues) {
  const absolutePath = path.resolve(repoRoot, filePath);

  if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
    return [];
  }

  const content = fs.readFileSync(absolutePath, 'utf8');
  const warnings = [];

  for (const { label, pattern } of COLOR_PATTERNS) {
    for (const match of content.matchAll(pattern)) {
      warnings.push({
        filePath,
        line: getLineNumber(content, match.index),
        message: `${label} "${match[0]}" 대신 docs/design-system/colors.md의 semantic token을 사용하세요.`,
      });
    }
  }

  for (const match of content.matchAll(SPACING_CLASS_PATTERN)) {
    const value = match[2];

    if (!isAllowedTailwindSpacing(value, allowedSpacingValues)) {
      warnings.push({
        filePath,
        line: getLineNumber(content, match.index),
        message: `Tailwind spacing "${match[0].trim()}"은 docs/design-system/spacing.md에 정의되지 않았습니다.`,
      });
    }
  }

  for (const match of content.matchAll(SPACING_CSS_PATTERN)) {
    const value = match[1];

    if (!isAllowedCssSpacing(value, allowedSpacingValues)) {
      warnings.push({
        filePath,
        line: getLineNumber(content, match.index),
        message: `CSS spacing "${match[0].trim()}"은 docs/design-system/spacing.md의 scale 또는 var(--space-*)를 사용하세요.`,
      });
    }
  }

  return warnings;
}

const files = process.argv.slice(2);

if (files.length === 0) {
  process.exit(0);
}

const allowedSpacingValues = readAllowedSpacingValues();
const warnings = files.flatMap((filePath) => checkFile(filePath, allowedSpacingValues));

if (warnings.length > 0) {
  process.stderr.write('[design-system] 디자인 시스템 위반 가능성이 있습니다.\n');

  for (const warning of warnings) {
    process.stderr.write(`- ${warning.filePath}:${warning.line} ${warning.message}\n`);
  }

  process.stderr.write(
    '[design-system] 이 스크립트는 경고만 출력하고 exit code 0으로 종료합니다. 위 항목을 토큰/공통 패턴으로 수정하세요.\n',
  );
}

process.exit(0);
