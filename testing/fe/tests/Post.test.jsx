import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Post from '../../../src/components/HomeComponents/Post';

describe('Post Component', () => {
  const mockOnLike = vi.fn();
  const mockOnComment = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnUpdate = vi.fn();
  const mockOnDeleteComment = vi.fn();

  const postProps = {
    user: 'testuser',
    content: 'This is a test post.',
    time: '2024-12-09 12:00:00',
    img: 'https://example.com/test-image.jpg',
    likes: ['user1', 'user2'],
    comments: [
      { _id: '1', userId: { nickname: 'commenter' }, content: 'Great post!' },
    ],
    onLike: mockOnLike,
    onComment: mockOnComment,
    onDelete: mockOnDelete,
    onUpdate: mockOnUpdate,
    onDeleteComment: mockOnDeleteComment,
  };

  beforeEach(() => {
    mockOnLike.mockClear();
    mockOnComment.mockClear();
    mockOnDelete.mockClear();
    mockOnUpdate.mockClear();
    mockOnDeleteComment.mockClear();
  });

  test('renders post content correctly', () => {
    render(<Post {...postProps} />);
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('This is a test post.')).toBeInTheDocument();
    expect(screen.getByText('❤️ 2')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write a comment...')).toBeInTheDocument();
  });

  test('triggers like function on like button click', () => {
    render(<Post {...postProps} />);
    fireEvent.click(screen.getByText('❤️ 2'));
    expect(mockOnLike).toHaveBeenCalledTimes(1);
  });

  test('triggers comment function on comment submit', () => {
    render(<Post {...postProps} />);
    const commentInput = screen.getByPlaceholderText('Write a comment...');
    fireEvent.change(commentInput, { target: { value: 'Nice post!' } });
    fireEvent.click(screen.getByText('Comment'));
    expect(mockOnComment).toHaveBeenCalledWith('Nice post!');
  });

  test('triggers delete comment function', () => {
    render(<Post {...postProps} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDeleteComment).toHaveBeenCalledWith('1');
  });

  test('triggers delete post function', () => {
    render(<Post {...postProps} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  test('triggers update post function', () => {
    render(<Post {...postProps} />);
    fireEvent.click(screen.getByText('Update'));
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
  });

  test('does not show delete comment button if onDeleteComment is not passed', () => {
    const { queryByText } = render(
      <Post {...{ ...postProps, onDeleteComment: undefined }} />
    );
    expect(queryByText('Delete')).toBeNull();
  });
});
