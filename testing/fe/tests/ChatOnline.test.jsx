import { render, screen } from '@testing-library/react';
import ChatOnline from '../../../src/components/MessengerComponents/ChatOnline';  // Correct file path for the component

describe('ChatOnline Component', () => {
  it('renders the correct number of friends', () => {
    render(<ChatOnline />);

    // Check if all friend elements are rendered
    const friendElements = screen.getAllByText('John Doe');
    expect(friendElements).toHaveLength(3); // Assuming there are 3 "John Doe" entries
  });

  it('displays the correct image for each friend', () => {
    render(<ChatOnline />);

    // Check if all images are rendered with correct source
    const images = screen.getAllByRole('img');
    images.forEach(image => {
      expect(image).toHaveAttribute('src', 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=');
    });
  });

  it('displays a badge for each friend', () => {
    render(<ChatOnline />);

    // Check if each friend has a badge
    const badges = screen.getAllByClassName('chatOnlineBadge');
    expect(badges).toHaveLength(3); // Assuming 3 badges are displayed
  });
});
