import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

describe('Note 타입', () => {
  it('should tags 문자열 배열 필드를 공개 계약에 포함한다 when 노트 데이터가 타입 경계를 통과한다', () => {
    const noteSource = readFileSync(resolve('src/types/note.ts'), 'utf8');

    expect(noteSource).toMatch(/tags\s*:\s*string\[\]\s*;/);
  });
});
