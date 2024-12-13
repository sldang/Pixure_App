import { render, screen, fireEvent } from '@testing-library/react';
import FriendPost from '../../../src/components/FriendPost';

describe('FriendPost Component', () => {
  it('renders the initial post with correct elements', () => {
    render(<FriendPost />);

    // Check if the like, dislike, and comment buttons are rendered
    expect(screen.getByText('0')).toBeInTheDocument(); // Likes and Dislikes count
    expect(screen.getAllByRole('button')).toHaveLength(3); // Like, Dislike, and Comment buttons
    expect(screen.getByPlaceholderText('Write a comment...')).toBeInTheDocument(); // Input field
  });

  it('increments like count when the like button is clicked', () => {
    render(<FriendPost />);
    const likeButton = screen.getAllByRole('button')[0];

    fireEvent.click(likeButton);
    expect(screen.getByText('1')).toBeInTheDocument(); // Like count updated
  });

  it('increments dislike count when the dislike button is clicked', () => {
    render(<FriendPost />);
    const dislikeButton = screen.getAllByRole('button')[1];

    fireEvent.click(dislikeButton);
    expect(screen.getByText('1')).toBeInTheDocument(); // Dislike count updated
  });

  it('adds a comment when submitted', () => {
    render(<FriendPost />);
    const input = screen.getByPlaceholderText('Write a comment...');
    const submitButton = screen.getByRole('button', { name: /paper plane/i });

    fireEvent.change(input, { target: { value: 'Test comment' } });
    fireEvent.click(submitButton);

    // Check if the comment is added
    expect(screen.getByText('Test comment')).toBeInTheDocument();
    expect(screen.getByText('Just now')).toBeInTheDocument(); // Timestamp
  });

  it('toggles comment visibility when comment button is clicked', () => {
    render(<FriendPost />);
    const commentButton = screen.getAllByRole('button')[2];

    fireEvent.click(commentButton);
    expect(screen.getByPlaceholderText('Write a comment...')).toBeVisible(); // Comment section visible

    fireEvent.click(commentButton);
    expect(screen.queryByPlaceholderText('Write a comment...')).not.toBeVisible(); // Comment section hidden
  });
});
