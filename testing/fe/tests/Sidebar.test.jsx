import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Sidebar from '../../../src/components/Sidebar';
import { AuthContext } from '../../../src/contexts/AuthContext';

vi.mock('axios');

describe('Sidebar Component', () => {
  const mockLogout = vi.fn();
  const mockNavigate = vi.fn();

  const mockUser = {
    user: { email: 'test@example.com', nickname: 'Test User' },
    token: 'mock-token',
  };

  beforeEach(() => {
    render(
      <AuthContext.Provider value={mockUser}>
        <Sidebar />
      </AuthContext.Provider>
    );
  });

  test('renders sidebar and profile', () => {
    expect(screen.getByText('Pixure')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  test('handles search input', () => {
    const searchInput = screen.getByPlaceholderText('Search users...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(searchInput.value).toBe('John');
  });

  test('shows notifications when clicked', () => {
    const notificationsButton = screen.getByText('Notifications');
    fireEvent.click(notificationsButton);
    expect(screen.getByText('John Doe liked your post')).toBeInTheDocument();
  });

  test('handles logout', () => {
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
});
