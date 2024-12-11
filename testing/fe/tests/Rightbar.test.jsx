import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Rightbar from '../../../src/components/HomeComponents/Rightbar';
import { AuthContext } from '../../../src/contexts/AuthContext';
import axios from 'axios';

// Mocking axios
vi.mock('axios');

describe('Rightbar Component', () => {
  const mockUser = {
    user: { id: '123', token: 'token' },
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        followersCount: 100,
        followingCount: 50,
        nickname: 'Test User',
        profilePicture: 'https://example.com/profile.jpg',
      },
    });
  });

  test('renders profile stats correctly', async () => {
    render(
      <AuthContext.Provider value={mockUser}>
        <Rightbar />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Followers:')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('Following:')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/profile.jpg');
    });
  });

  test('handles API error', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    render(
      <AuthContext.Provider value={mockUser}>
        <Rightbar />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch profile data. Please try again.')).toBeInTheDocument();
    });
  });
});
