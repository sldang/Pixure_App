import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Explore from '../../../src/pages/Explore';

// Mock the community context
vi.mock('../../../src/contexts/CommunityContext', () => ({
  useCommunityContext: () => ({
    state: {},
    dispatch: vi.fn(),
  }),
}));

// Mock the localStorage and environment variables
vi.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
  if (key === 'user') {
    return JSON.stringify({
      user: {
        id: 'user123',
        nickname: 'testUser',
      },
    });
  }
  return null;
});

vi.mock('../../../src/utils/env', () => ({
  REACT_APP_SERVER_URL: 'http://localhost:3000',
}));

describe('Explore Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Explore page with heading and create community button', () => {
    render(
      <BrowserRouter>
        <Explore />
        <ToastContainer />
      </BrowserRouter>
    );

    expect(screen.getByText('Find Your Community')).toBeInTheDocument();
    expect(screen.getByText('+ Create Community')).toBeInTheDocument();
  });

  it('fetches and displays communities', async () => {
    const mockCommunities = [
      {
        name: 'Community 1',
        description: 'Description 1',
        communityMembers: [{ id: 'user1' }],
        imageUrl: '',
      },
      {
        name: 'Community 2',
        description: 'Description 2',
        communityMembers: [{ id: 'user2' }, { id: 'user3' }],
        imageUrl: '',
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockCommunities),
    });

    render(
      <BrowserRouter>
        <Explore />
        <ToastContainer />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Community 1')).toBeInTheDocument()
    );
    expect(screen.getByText('Community 2')).toBeInTheDocument();
  });

  it('handles join community click', async () => {
    const mockJoinResponse = { success: true };
    global.fetch = vi.fn((url) => {
      if (url.includes('/api/communities/exclude')) {
        return Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                name: 'Community 1',
                description: 'Description 1',
                communityMembers: [{ id: 'user1' }],
                imageUrl: '',
              },
            ]),
        });
      }
      if (url.includes('/api/joinCommunity')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockJoinResponse),
        });
      }
    });

    render(
      <BrowserRouter>
        <Explore />
        <ToastContainer />
      </BrowserRouter>
    );

    const joinButton = await screen.findByText('Join Community');
    fireEvent.click(joinButton);

    await waitFor(() =>
      expect(
        screen.getByText('Welcome to "Community 1"!')
      ).toBeInTheDocument()
    );
  });

  it('navigates to the Create Community page when the button is clicked', () => {
    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', async () => {
      const original = await vi.importActual('react-router-dom');
      return {
        ...original,
        useNavigate: () => mockNavigate,
      };
    });

    render(
      <BrowserRouter>
        <Explore />
      </BrowserRouter>
    );

    const createButton = screen.getByText('+ Create Community');
    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith('/create-community');
  });
});
