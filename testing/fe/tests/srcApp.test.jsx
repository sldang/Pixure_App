import React, { useRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/contexts/AuthContext';
import App from '../../../src/App';

// Mock the components used in the App to isolate tests
vi.mock('./components/HomeComponents/Sidebar', () => ({
  default: () => <div>Sidebar</div>,
}));
vi.mock('./pages/Signup', () => ({
  default: () => <div>Signup Page</div>,
}));
vi.mock('./pages/Login', () => ({
  default: () => <div>Login Page</div>,
}));
vi.mock('./pages/Home', () => ({
  default: () => <div>Home Page</div>,
}));
vi.mock('./pages/Messenger', () => ({
  default: () => <div>Messenger Page</div>,
}));
vi.mock('./pages/Explore', () => ({
  default: () => <div>Explore Page</div>,
}));
vi.mock('./pages/Communities', () => ({
  default: () => <div>Communities Page</div>,
}));
vi.mock('./components/CreateCommunity', () => ({
  default: () => <div>Create Community</div>,
}));
vi.mock('./components/EditProfile', () => ({
  default: () => <div>Edit Profile</div>,
}));

describe('App Component', () => {
  it('renders public routes correctly when not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <AuthContext.Provider value={{ user: null }}>
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Check if the Signup page is rendered
    expect(screen.getByText('Signup Page')).toBeInTheDocument();
  });

  it('redirects to home if user is authenticated and tries to access login', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={{ user: { name: 'Test User' } }}>
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Wait for the component to render and check if redirected to home
    await waitFor(() => {
      expect(screen.getByText('Home Page')).toBeInTheDocument();
    });
  });

  it('renders the sidebar when the user is authenticated', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: { name: 'Test User' } }}>
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Check if the Sidebar is rendered
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  it('renders protected routes only when user is authenticated', async () => {
    render(
      <MemoryRouter initialEntries={['/messenger']}>
        <AuthContext.Provider value={{ user: null }}>
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Check if user is redirected to login when not authenticated
    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });
});
