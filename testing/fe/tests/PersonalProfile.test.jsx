import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PersonalProfile from '../../../src/components/HomeComponents/PersonalProfile';
import { AuthContext } from '../../../src/contexts/AuthContext';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom'; // Wrap in MemoryRouter for navigation

// Mock axios
vi.mock('axios');

// Mock AuthContext
const mockUser = {
  user: { email: 'test@example.com', nickname: 'testuser' },
  token: 'fake-token',
};

const renderWithAuthContext = (ui) => {
  return render(
    <AuthContext.Provider value={mockUser}>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('PersonalProfile Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        nickname: 'testuser',
        postsCount: 10,
        followersCount: 100,
        followingCount: 200,
      },
    });
  });

  test('renders profile data when fetched successfully', async () => {
    renderWithAuthContext(<PersonalProfile />);

    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('Posts: 10')).toBeInTheDocument();
      expect(screen.getByText('Followers: 100')).toBeInTheDocument();
      expect(screen.getByText('Following: 200')).toBeInTheDocument();
    });
  });

  test('handles edit button click', async () => {
    renderWithAuthContext(<PersonalProfile />);

    const editButton = screen.getByText('Edit Profile'); // Adjust text depending on how UserProfileDisplay renders the button
    fireEvent.click(editButton);

    // Assuming navigate takes you to '/editprofile'
    await waitFor(() => {
      expect(window.location.pathname).toBe('/editprofile');
    });
  });

  test('handles error when fetching profile data', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch'));

    renderWithAuthContext(<PersonalProfile />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch profile data')).toBeInTheDocument(); // You can adjust this based on your error handling logic
    });
  });
});
