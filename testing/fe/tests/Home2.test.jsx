import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Home2 from '../../../src/pages/Home2';
import { AuthContext } from '../../../src/contexts/AuthContext';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// Mock components
vi.mock('../../../src/components/HomeComponents/Sidebar', () => ({
  __esModule: true,
  default: () => <div>Sidebar</div>,
}));

vi.mock('../../../src/components/HomeComponents/Rightbar', () => ({
  __esModule: true,
  default: () => <div>Rightbar</div>,
}));

vi.mock('../../../src/components/HomeComponents/Post', () => ({
  __esModule: true,
  default: ({ onLike, onComment }) => (
    <div>
      <button onClick={onLike}>Like</button>
      <button onClick={() => onComment('Test comment')}>Comment</button>
    </div>
  ),
}));

describe('Home2 Component', () => {
  const userContextValue = {
    user: { id: '1', nickname: 'John Doe', token: 'mock-token' },
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  test('renders no posts message when there are no posts', async () => {
    axios.get.mockResolvedValueOnce({ data: { followedUserIds: [] } });

    render(
      <AuthContext.Provider value={userContextValue}>
        <Home2 />
      </AuthContext.Provider>
    );

    // Ensure no posts are displayed
    await waitFor(() => expect(screen.getByText(/No posts from followed users to display./)).toBeInTheDocument());
  });

  test('renders posts when data is fetched', async () => {
    const postsData = [
      { _id: '1', userId: { nickname: 'Alice' }, desc: 'Post 1', createdAt: '2024-12-12T10:00:00Z', likes: [], comments: [] },
    ];
    axios.get.mockResolvedValueOnce({ data: { followedUserIds: ['1'] } });
    axios.get.mockResolvedValueOnce({ data: postsData });

    render(
      <AuthContext.Provider value={userContextValue}>
        <Home2 />
      </AuthContext.Provider>
    );

    // Ensure posts are rendered
    await waitFor(() => expect(screen.getByText(/Post 1/)).toBeInTheDocument());
  });

  test('handles like action', async () => {
    const postsData = [
      { _id: '1', userId: { nickname: 'Alice' }, desc: 'Post 1', createdAt: '2024-12-12T10:00:00Z', likes: [], comments: [] },
    ];
    axios.get.mockResolvedValueOnce({ data: { followedUserIds: ['1'] } });
    axios.get.mockResolvedValueOnce({ data: postsData });
    axios.put.mockResolvedValueOnce({});

    render(
      <AuthContext.Provider value={userContextValue}>
        <Home2 />
      </AuthContext.Provider>
    );

    // Simulate like action
    const likeButton = screen.getByText('Like');
    fireEvent.click(likeButton);

    // Check if the like action was triggered
    await waitFor(() => expect(axios.put).toHaveBeenCalled());
  });

  test('handles comment action', async () => {
    const postsData = [
      { _id: '1', userId: { nickname: 'Alice' }, desc: 'Post 1', createdAt: '2024-12-12T10:00:00Z', likes: [], comments: [] },
    ];
    axios.get.mockResolvedValueOnce({ data: { followedUserIds: ['1'] } });
    axios.get.mockResolvedValueOnce({ data: postsData });
    axios.post.mockResolvedValueOnce({ data: { userId: '1', content: 'Test comment' } });

    render(
      <AuthContext.Provider value={userContextValue}>
        <Home2 />
      </AuthContext.Provider>
    );

    // Simulate comment action
    const commentButton = screen.getByText('Comment');
    fireEvent.click(commentButton);

    // Check if the comment action was triggered
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });

  test('handles errors in fetching posts', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching posts'));

    render(
      <AuthContext.Provider value={userContextValue}>
        <Home2 />
      </AuthContext.Provider>
    );

    // Ensure no posts are displayed and error handling is shown
    await waitFor(() => expect(screen.getByText(/No posts from followed users to display./)).toBeInTheDocument());
  });

  test('handles errors in like action', async () => {
    const postsData = [
      { _id: '1', userId: { nickname: 'Alice' }, desc: 'Post 1', createdAt: '2024-12-12T10:00:00Z', likes: [], comments: [] },
    ];
    axios.get.mockResolvedValueOnce({ data: { followedUserIds: ['1'] } });
    axios.get.mockResolvedValueOnce({ data: postsData });
    axios.put.mockRejectedValueOnce(new Error('Error liking post'));

    render(
      <AuthContext.Provider value={userContextValue}>
        <Home2 />
      </AuthContext.Provider>
    );

    // Simulate like action
    const likeButton = screen.getByText('Like');
    fireEvent.click(likeButton);

    // Ensure error handling is executed
    await waitFor(() => expect(axios.put).toHaveBeenCalled());
  });
});
