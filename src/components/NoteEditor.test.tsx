import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NoteEditor } from './NoteEditor';

const mockUseNotes = vi.fn();

vi.mock('../context/NotesContext', () => ({
  useNotes: () => mockUseNotes(),
}));

describe('NoteEditor', () => {
  afterEach(() => {
    mockUseNotes.mockReset();
  });

  it('should 저장된 태그 칩을 제목 아래와 본문 위에 표시한다 when 선택된 노트에 tags가 있다', () => {
    mockUseNotes.mockReturnValue({
      notes: [
        {
          id: 'note-1',
          title: '태그가 있는 노트',
          content: '본문',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z',
          tags: ['업무', '긴급'],
        },
      ],
      createNote: vi.fn(),
      updateNote: vi.fn(),
    });

    render(<NoteEditor selectedNoteId="note-1" isCreating={false} onDone={vi.fn()} />);

    const titleInput = screen.getByDisplayValue('태그가 있는 노트');
    const firstTag = screen.getByText('업무');
    const secondTag = screen.getByText('긴급');
    const contentInput = screen.getByDisplayValue('본문');

    expect(titleInput.compareDocumentPosition(firstTag)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(firstTag.compareDocumentPosition(contentInput)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(secondTag).toBeVisible();
  });

  it('should 태그 칩을 표시하지 않고 편집 화면을 유지한다 when 선택된 노트의 tags가 빈 배열이다', () => {
    mockUseNotes.mockReturnValue({
      notes: [
        {
          id: 'note-2',
          title: '태그가 없는 노트',
          content: '본문만 있는 노트',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z',
          tags: [],
        },
      ],
      createNote: vi.fn(),
      updateNote: vi.fn(),
    });

    render(<NoteEditor selectedNoteId="note-2" isCreating={false} onDone={vi.fn()} />);

    expect(screen.getByDisplayValue('태그가 없는 노트')).toBeVisible();
    expect(screen.getByDisplayValue('본문만 있는 노트')).toBeVisible();
    expect(screen.getByRole('button', { name: '저장' })).toBeVisible();
    expect(screen.queryByText('노트를 선택하거나 새 노트를 만드세요')).not.toBeInTheDocument();
  });
});
