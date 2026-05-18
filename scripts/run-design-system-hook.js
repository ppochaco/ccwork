#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const UI_FILE_PATTERN = /\.(jsx|tsx|css)$/;

function readStdin() {
  if (process.stdin.isTTY) {
    return '';
  }

  try {
    return require('node:fs').readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

function addPath(paths, value) {
  if (typeof value !== 'string' || value.length === 0) {
    return;
  }

  const normalized = path.isAbsolute(value) ? path.relative(repoRoot, value) : value;

  if (UI_FILE_PATTERN.test(normalized)) {
    paths.add(normalized);
  }
}

function collectFromObject(paths, value) {
  if (!value || typeof value !== 'object') {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectFromObject(paths, item);
    }
    return;
  }

  for (const key of ['file_path', 'filePath', 'path', 'target_file', 'targetFile']) {
    addPath(paths, value[key]);
  }

  for (const key of ['files', 'paths']) {
    collectFromObject(paths, value[key]);
  }

  collectFromObject(paths, value.tool_input);
  collectFromObject(paths, value.input);
}

function collectFilePaths() {
  const paths = new Set();

  addPath(paths, process.env.CLAUDE_FILE_PATH);
  addPath(paths, process.env.CODEX_FILE_PATH);

  const stdin = readStdin();

  if (stdin.trim().length > 0) {
    try {
      collectFromObject(paths, JSON.parse(stdin));
    } catch {
      // Hook payload formats differ by runtime. Ignore non-JSON stdin.
    }
  }

  return [...paths];
}

const filePaths = collectFilePaths();

if (filePaths.length === 0) {
  process.exit(0);
}

for (const scriptPath of [
  'scripts/check-design-system.js',
  'scripts/check-state-representation.js',
]) {
  spawnSync(process.execPath, [scriptPath, ...filePaths], {
    cwd: repoRoot,
    stdio: 'inherit',
  });
}

process.exit(0);
