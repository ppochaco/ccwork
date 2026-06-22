import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useNotes } from '../context/NotesContext';
import { NoteEditor } from './NoteEditor';

vi.mock('../context/NotesContext', () => ({
  useNotes: vi.fn(),
}));

const useNotesMock = vi.mocked(useNotes);

function mockNotes(notes: unknown[]) {
  useNotesMock.mockReturnValue({
    notes,
    loading: false,
    error: null,
    createNote: vi.fn(),
    updateNote: vi.fn(),
    deleteNote: vi.fn(),
  } as ReturnType<typeof useNotes>);
}

describe('NoteEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should 저장된 태그 칩을 제목 아래와 본문 위에 표시한다 when 선택된 노트에 `tags: ["업무", "긴급"]`이 있다', () => {
    mockNotes([
      {
        id: '1',
        title: '프로젝트 노트',
        content: '본문입니다',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        tags: ['업무', '긴급'],
      },
    ]);

    render(<NoteEditor selectedNoteId="1" isCreating={false} onDone={vi.fn()} />);

    const titleInput = screen.getByDisplayValue('프로젝트 노트');
    const workTag = screen.getByText('업무');
    const urgentTag = screen.getByText('긴급');
    const contentInput = screen.getByDisplayValue('본문입니다');

    expect(workTag).toBeInTheDocument();
    expect(urgentTag).toBeInTheDocument();
    expect(titleInput.compareDocumentPosition(workTag)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(workTag.compareDocumentPosition(contentInput)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('should 태그 칩 없이 편집 폼을 유지한다 when 선택된 노트의 tags가 빈 배열이다', () => {
    mockNotes([
      {
        id: '1',
        title: '태그 없는 노트',
        content: '본문입니다',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        tags: [],
      },
    ]);

    render(<NoteEditor selectedNoteId="1" isCreating={false} onDone={vi.fn()} />);

    expect(screen.getByDisplayValue('태그 없는 노트')).toBeInTheDocument();
    expect(screen.getByDisplayValue('본문입니다')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument();
    expect(screen.queryByText('업무')).not.toBeInTheDocument();
  });

  it('should 화면 오류 없이 제목, 본문, 저장 버튼을 표시한다 when 선택된 기존 노트에 tags 필드가 없다', () => {
    mockNotes([
      {
        id: '1',
        title: '기존 노트',
        content: '태그 필드가 없는 본문',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ]);

    render(<NoteEditor selectedNoteId="1" isCreating={false} onDone={vi.fn()} />);

    expect(screen.getByDisplayValue('기존 노트')).toBeInTheDocument();
    expect(screen.getByDisplayValue('태그 필드가 없는 본문')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument();
  });

  it('should 기존 제목과 본문 동기화를 유지한다 when 태그가 있는 노트를 선택한다', () => {
    mockNotes([
      {
        id: '1',
        title: '동기화 노트',
        content: '동기화 본문',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        tags: ['업무'],
      },
    ]);

    render(<NoteEditor selectedNoteId="1" isCreating={false} onDone={vi.fn()} />);

    expect(screen.getByDisplayValue('동기화 노트')).toBeInTheDocument();
    expect(screen.getByDisplayValue('동기화 본문')).toBeInTheDocument();
  });

  it('should 태그가 없는 노트를 위한 큰 empty state를 표시하지 않는다 when 선택된 노트의 tags가 비어 있다', () => {
    mockNotes([
      {
        id: '1',
        title: '빈 태그 노트',
        content: '본문입니다',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        tags: [],
      },
    ]);

    render(<NoteEditor selectedNoteId="1" isCreating={false} onDone={vi.fn()} />);

    expect(screen.queryByText('태그가 없습니다')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('빈 태그 노트')).toBeInTheDocument();
    expect(screen.getByDisplayValue('본문입니다')).toBeInTheDocument();
  });
});
