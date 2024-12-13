import { render, screen } from '@testing-library/react';
import ProfilePage from '../../../src/pages/ProfilePage'; 

describe('ProfilePage Component', () => {

  test('renders Profile component', () => {
    render(<ProfilePage />);

    // Check if the Profile component is rendered
    expect(screen.getByText('Your Profile')).toBeInTheDocument();
  });

  test('renders ChatOnline component', () => {
    render(<ProfilePage />);

    // Check if the ChatOnline component is rendered
    expect(screen.getByText('Chat Online')).toBeInTheDocument(); // Adjust if "Chat Online" text exists or change it accordingly
  });

  test('renders both components within layout', () => {
    render(<ProfilePage />);

    // Check if the layout is correct (both Profile and ChatOnline should appear in a flex container)
    const profileSection = screen.getByText('Your Profile');
    const chatOnlineSection = screen.getByText('Chat Online'); // Adjust if necessary based on actual content

    // Ensure that both sections are rendered correctly
    expect(profileSection).toBeInTheDocument();
    expect(chatOnlineSection).toBeInTheDocument();
  });

});
