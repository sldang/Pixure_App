import { render, screen } from '@testing-library/react';
import Profile from '../../../src/pages/Profile'; 
import { vi } from 'vitest';
import React from 'react';

describe('Profile Component', () => {

  test('renders profile header', () => {
    render(<Profile />);

    // Check if the profile header is rendered
    expect(screen.getByText('Your Profile')).toBeInTheDocument();
  });

  test('displays followers correctly', () => {
    render(<Profile />);

    // Check if "Followers" section is rendered
    expect(screen.getByText('Followers')).toBeInTheDocument();

    // Check if followers are listed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Emily Stone')).toBeInTheDocument();
  });

  test('displays following correctly', () => {
    render(<Profile />);

    // Check if "Following" section is rendered
    expect(screen.getByText('Following')).toBeInTheDocument();

    // Check if following are listed
    expect(screen.getByText('Michael Jordan')).toBeInTheDocument();
    expect(screen.getByText('LeBron James')).toBeInTheDocument();
    expect(screen.getByText('Serena Williams')).toBeInTheDocument();
  });

  test('shows "No followers yet" when there are no followers', () => {
    // Override followers state to be empty for this test
    vi.spyOn(React, 'useState').mockImplementationOnce(() => [[], vi.fn()]);

    render(<Profile />);

    // Check if "No followers yet" message is displayed
    expect(screen.getByText('No followers yet')).toBeInTheDocument();
  });

  test('shows "Not following anyone yet" when not following anyone', () => {
    // Override following state to be empty for this test
    vi.spyOn(React, 'useState').mockImplementationOnce(() => [[], vi.fn()]);

    render(<Profile />);

    // Check if "Not following anyone yet" message is displayed
    expect(screen.getByText('Not following anyone yet')).toBeInTheDocument();
  });

});
