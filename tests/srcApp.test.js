// tests/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AuthContext } from '../contexts/AuthContext';
import { CommunityProvider } from '../contexts/CommunityContext';
import App from '../src/App.js';

// Mock components
vi.mock('../pages/Signup', () => ({
  default: () => <div>SignupPage</div>
}));
vi.mock('../pages/Login', () => ({
  default: () => <div>LoginPage</div>
}));
vi.mock('../pages/Home', () => ({
  default: () => <div>HomePage</div>
}));
vi.mock('../pages/Messenger', () => ({
  default: () => <div>MessengerPage</div>
}));
vi.mock('../components/FriendPost', () => ({
  default: () => <div>FriendPage</div>
}));
vi.mock('../pages/Explore', () => ({
  default: () => <div>ExplorePage</div>
}));
vi.mock('../pages/Communities', () => ({
  default: () => <div>CommunitiesPage</div>
}));
vi.mock('../components/EditProfile', () => ({
  default: () => <div>EditProfile</div>
}));
vi.mock('../components/HomeComponents/Sidebar', () => ({
  default: () => <div>Sidebar</div>
}));

describe('App component', () => {
  const renderWithProviders = (ui, { providerProps }) => {
    return render(
      <AuthContext.Provider value={providerProps}>
        <CommunityProvider>
          <BrowserRouter>
            {ui}
          </BrowserRouter>
        </CommunityProvider>
      </AuthContext.Provider>
    );
  };

  it('renders SignupPage if user is not authenticated and navigates to /signup', () => {
    const providerProps = { user: null };
    renderWithProviders(<App />, { providerProps });
    expect(screen.getByText('SignupPage')).toBeInTheDocument();
  });

  it('renders LoginPage if user is not authenticated and navigates to /login', () => {
    const providerProps = { user: null };
    renderWithProviders(<App />, { providerProps });
    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('renders MessengerPage if user navigates to /messenger', () => {
    const providerProps = { user: { name: 'Test User' } };
    renderWithProviders(<App />, { providerProps });
    expect(screen.getByText('MessengerPage')).toBeInTheDocument();
  });

  it('renders FriendPage if user is authenticated and navigates to /home', () => {
    const providerProps = { user: { name: 'Test User' } };
    renderWithProviders(<App />, { providerProps });
    expect(screen.getByText('FriendPage')).toBeInTheDocument();
  });

  it('renders Sidebar if user is authenticated', () => {
    const providerProps = { user: { name: 'Test User' } };
    renderWithProviders(<App />, { providerProps });
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  it('renders ExplorePage if user is authenticated and navigates to /explore', () => {
    const providerProps = { user: { name: 'Test User' } };
    renderWithProviders(<App />, { providerProps });
    expect(screen.getByText('ExplorePage')).toBeInTheDocument();
  });

  it('renders CommunitiesPage if user is authenticated and navigates to /communities', () => {
    const providerProps = { user: { name: 'Test User' } };
    renderWithProviders(<App />, { providerProps });
    expect(screen.getByText('CommunitiesPage')).toBeInTheDocument();
  });

  it('renders EditProfile if user navigates to /editprofile', () => {
    const providerProps = { user: { name: 'Test User' } };
    renderWithProviders(<App />, { providerProps });
    expect(screen.getByText('EditProfile')).toBeInTheDocument();
  });

  it('renders HomePage if user navigates to /profile', () => {
    const providerProps = { user: { name: 'Test User' } };
    renderWithProviders(<App />, { providerProps });
    expect(screen.getByText('HomePage')).toBeInTheDocument();
  });
});
