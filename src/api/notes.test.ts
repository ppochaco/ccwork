import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetchNotes } from './notes';

describe('fetchNotes', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should 저장된 tags 배열을 유지한다 when API 응답 노트에 tags가 포함되어 있다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: '1',
          title: '태그 있는 노트',
          content: '저장된 태그 확인',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          tags: ['업무', '긴급'],
        },
      ],
    } as Response);

    await expect(fetchNotes()).resolves.toMatchObject([
      {
        id: '1',
        tags: ['업무', '긴급'],
      },
    ]);
  });

  it('should tags를 빈 배열로 정규화한다 when API 응답 노트에 tags 필드가 없다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: '1',
          title: '기존 노트',
          content: '태그 필드 없음',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ],
    } as Response);

    await expect(fetchNotes()).resolves.toMatchObject([
      {
        id: '1',
        tags: [],
      },
    ]);
  });

  it('should tags를 빈 배열로 정규화한다 when API 응답 노트의 tags가 배열이 아니다', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: '1',
          title: '잘못된 태그 노트',
          content: '태그 필드가 배열이 아님',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          tags: '업무',
        },
      ],
    } as Response);

    await expect(fetchNotes()).resolves.toMatchObject([
      {
        id: '1',
        tags: [],
      },
    ]);
  });
});
