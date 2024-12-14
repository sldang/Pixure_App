import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Communities from '../../../src/pages/Communities';
import { useCommunityContext } from '../../../src/contexts/CommunityContext';

vi.mock('../../../src/contexts/CommunityContext', () => ({
  useCommunityContext: vi.fn(),
}));

vi.mock('../../../src/pages/CommunityModal', () => ({
  __esModule: true,
  default: ({ community, onClose }) => (
    <div data-testid="community-modal">
      <p>{community.name}</p>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

global.fetch = vi.fn();

describe('Communities Component', () => {
  const mockDispatch = vi.fn();
  const mockContext = {
    state: {},
    dispatch: mockDispatch,
  };

  beforeEach(() => {
    useCommunityContext.mockReturnValue(mockContext);
    global.localStorage.setItem(
      'user',
      JSON.stringify({ user: { nickname: 'testUser' } })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
    global.localStorage.clear();
  });

  it('should render the heading and no communities message when no communities are joined', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    render(<Communities />);

    expect(screen.getByRole('heading', { name: /your communities/i })).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getByText(/you haven't joined any communities yet/i)
      ).toBeInTheDocument()
    );
  });

  it('should fetch and display communities', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [
        {
          name: 'Community A',
          description: 'Description A',
          imageUrl: 'https://via.placeholder.com/100',
          communityMembers: ['user1', 'user2'],
        },
      ],
    });

    render(<Communities />);

    await waitFor(() =>
      expect(screen.getByText('Community A')).toBeInTheDocument()
    );
    expect(screen.getByText('Description A')).toBeInTheDocument();
    expect(screen.getByText(/2 members/i)).toBeInTheDocument();
  });

  it('should open and close the modal', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [
        {
          name: 'Community A',
          description: 'Description A',
          imageUrl: 'https://via.placeholder.com/100',
          communityMembers: ['user1', 'user2'],
        },
      ],
    });

    render(<Communities />);

    await waitFor(() =>
      expect(screen.getByText('Community A')).toBeInTheDocument()
    );

    const openButton = screen.getByRole('button', { name: /open/i });
    fireEvent.click(openButton);

    expect(screen.getByTestId('community-modal')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() =>
      expect(screen.queryByTestId('community-modal')).not.toBeInTheDocument()
    );
  });

  it('should handle fetch errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Fetch error'));

    render(<Communities />);

    await waitFor(() =>
      expect(screen.getByText(/error fetching communities/i)).toBeInTheDocument()
    );
  });
});
