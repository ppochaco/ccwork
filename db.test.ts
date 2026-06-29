import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

describe('db.json', () => {
  it('should 모든 기존 노트에 빈 tags 배열을 명시한다 when 시드 노트 데이터를 확인한다', () => {
    const dbSource = readFileSync(resolve('db.json'), 'utf8');
    const db = JSON.parse(dbSource) as {
      notes: Array<{ tags?: unknown }>;
    };

    expect(db.notes.length).toBeGreaterThan(0);
    expect(db.notes.every((note) => Array.isArray(note.tags) && note.tags.length === 0)).toBe(true);
  });
});
