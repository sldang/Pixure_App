import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import NewsFeed from '../../../src/HomeComponents/NewsFeed';
import { AuthContext } from '../../../src/contexts/AuthContext';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// Mock AuthContext
const mockUser = {
  user: { id: '123', nickname: 'testuser' },
  token: 'fake-token',
};

const renderWithAuthContext = (ui) => {
  return render(
    <AuthContext.Provider value={mockUser}>
      {ui}
    </AuthContext.Provider>
  );
};

describe('NewsFeed Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] }); // Mock empty response for posts
  });

  test('renders posts when user has posts', async () => {
    const mockPosts = [
      {
        _id: '1',
        userId: { nickname: 'user1' },
        desc: 'This is a post',
        createdAt: '2024-12-09',
        likes: ['123'],
        comments: [{ _id: 'c1', content: 'Nice post!' }],
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockPosts });

    renderWithAuthContext(<NewsFeed />);

    await waitFor(() => {
      expect(screen.getByText('This is a post')).toBeInTheDocument();
      expect(screen.getByText('Nice post!')).toBeInTheDocument();
    });
  });

  test('shows no posts message when no posts are available', async () => {
    renderWithAuthContext(<NewsFeed />);

    await waitFor(() => {
      expect(screen.getByText('No posts to display')).toBeInTheDocument();
    });
  });

  test('uploads a new post', async () => {
    axios.post.mockResolvedValue({ data: { _id: '2', userId: { nickname: 'testuser' }, desc: 'New post' } });
    const { getByText, getByRole } = renderWithAuthContext(<NewsFeed />);

    fireEvent.change(getByRole('textbox'), { target: { value: 'New post content' } });
    fireEvent.click(getByText('Upload'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/posts',
        expect.any(FormData),
        expect.objectContaining({
          headers: { Authorization: 'Bearer fake-token' },
        })
      );
      expect(screen.getByText('New post')).toBeInTheDocument();
    });
  });

  test('likes a post', async () => {
    const mockPosts = [
      { _id: '1', userId: { nickname: 'user1' }, desc: 'Post content', likes: ['123'] },
    ];

    axios.put.mockResolvedValue({ data: {} });

    renderWithAuthContext(<NewsFeed />);

    await waitFor(() => {
      const likeButton = screen.getByText('Like');
      fireEvent.click(likeButton);
      expect(axios.put).toHaveBeenCalledWith(
        '/api/posts/1/like',
        { userId: '123' },
        expect.objectContaining({ headers: { Authorization: 'Bearer fake-token' } })
      );
    });
  });

  test('comments on a post', async () => {
    const mockPosts = [
      { _id: '1', userId: { nickname: 'user1' }, desc: 'Post content', comments: [] },
    ];

    axios.post.mockResolvedValue({ data: { _id: 'c2', content: 'Great post!' } });

    renderWithAuthContext(<NewsFeed />);

    const commentButton = screen.getByText('Comment');
    fireEvent.click(commentButton);
    fireEvent.change(screen.getByPlaceholderText('Add a comment'), { target: { value: 'Great post!' } });
    fireEvent.click(screen.getByText('Post Comment'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/posts/1/comments',
        { userId: '123', content: 'Great post!' },
        expect.objectContaining({ headers: { Authorization: 'Bearer fake-token' } })
      );
    });
  });

  test('deletes a post', async () => {
    const mockPosts = [
      { _id: '1', userId: { nickname: 'user1' }, desc: 'Post content', likes: [], comments: [] },
    ];

    axios.delete.mockResolvedValue({ data: {} });

    renderWithAuthContext(<NewsFeed />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        '/api/posts/1',
        expect.objectContaining({
          headers: { Authorization: 'Bearer fake-token' },
          data: { userId: '123' },
        })
      );
    });
  });

  test('handles error when uploading post', async () => {
    axios.post.mockRejectedValue(new Error('Upload failed'));

    const { getByText, getByRole } = renderWithAuthContext(<NewsFeed />);

    fireEvent.change(getByRole('textbox'), { target: { value: 'Error post content' } });
    fireEvent.click(getByText('Upload'));

    await waitFor(() => {
      expect(screen.getByText('Error uploading post: Upload failed')).toBeInTheDocument();
    });
  });
});
