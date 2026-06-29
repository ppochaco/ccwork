import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useNotes } from '../context/NotesContext';
import { NoteList } from './NoteList';

vi.mock('../context/NotesContext', () => ({
  useNotes: vi.fn(),
}));

const useNotesMock = vi.mocked(useNotes);

describe('NoteList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should 태그 텍스트를 목록 항목에 표시하지 않는다 when 노트가 tags 배열을 가진다', () => {
    useNotesMock.mockReturnValue({
      notes: [
        {
          id: '1',
          title: '목록 노트',
          content: '목록 본문',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          tags: ['목록숨김태그'],
        },
      ],
      loading: false,
      error: null,
      createNote: vi.fn(),
      updateNote: vi.fn(),
      deleteNote: vi.fn(),
    } as unknown as ReturnType<typeof useNotes>);

    render(<NoteList selectedNoteId={null} onSelect={vi.fn()} />);

    expect(screen.getByText('목록 노트')).toBeInTheDocument();
    expect(screen.queryByText('목록숨김태그')).not.toBeInTheDocument();
  });
});
