// // import { render, screen, fireEvent } from '@testing-library/react';
// // import '@testing-library/jest-dom'; // Ensure Vitest and Testing Library compatibility
// // import CommunityModal from '../../../src/pages/CommunityModal';

// // const mockCommunity = {
// //   name: 'Sample Community',
// //   description: 'A place to share ideas and collaborate.',
// //   members: 50,
// //   posts: [
// //     {
// //       id: 1,
// //       user: 'User1',
// //       content: 'First post content!',
// //       timestamp: '1 hour ago',
// //       likes: 10,
// //       dislikes: 2,
// //       comments: [
// //         {
// //           user: 'Commenter1',
// //           text: 'Great post!',
// //           timestamp: '30 minutes ago',
// //           likes: 5,
// //           dislikes: 0,
// //           replies: [],
// //         },
// //       ],
// //     },
// //   ],
// // };

// // describe('CommunityModal Component', () => {
// //   it('renders community name and description', () => {
// //     render(<CommunityModal community={mockCommunity} onClose={jest.fn()} />);

// //     expect(screen.getByText('Sample Community')).toBeInTheDocument();
// //     expect(
// //       screen.getByText('A place to share ideas and collaborate.')
// //     ).toBeInTheDocument();
// //   });

// //   it('renders the correct number of posts', () => {
// //     render(<CommunityModal community={mockCommunity} onClose={jest.fn()} />);

// //     const posts = screen.getAllByText(/post content!/i);
// //     expect(posts.length).toBe(mockCommunity.posts.length);
// //   });

// //   it('closes when the close button is clicked', () => {
// //     const mockOnClose = jest.fn();
// //     render(<CommunityModal community={mockCommunity} onClose={mockOnClose} />);

// //     const closeButton = screen.getByText(/\u00d7/); // Close button (\u00d7 is the "×" symbol)
// //     fireEvent.click(closeButton);

// //     expect(mockOnClose).toHaveBeenCalledTimes(1);
// //   });
// // });

// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom'; 
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import CommunityModal from '../../../src/pages/CommunityModal';

// const mockCommunity = {
//   name: 'Sample Community',
//   description: 'A place to share ideas and collaborate.',
//   members: 50,
//   posts: [
//     {
//       id: 1,
//       user: 'User1',
//       content: 'First post content!',
//       timestamp: '1 hour ago',
//       likes: 10,
//       dislikes: 2,
//       comments: [
//         {
//           user: 'Commenter1',
//           text: 'Great post!',
//           timestamp: '30 minutes ago',
//           likes: 5,
//           dislikes: 0,
//           replies: [],
//         },
//       ],
//     },
//   ],
// };

// describe('CommunityModal Component', () => {
//   it('renders community name and description', () => {
//     render(<CommunityModal community={mockCommunity} onClose={vi.fn()} />);

//     expect(screen.getByText('Sample Community')).toBeInTheDocument();
//     expect(
//       screen.getByText('A place to share ideas and collaborate.')
//     ).toBeInTheDocument();
//   });

//   it('renders the correct number of posts', () => {
//     render(<CommunityModal community={mockCommunity} onClose={vi.fn()} />);

//     const posts = screen.getAllByText(/post content!/i);
//     expect(posts.length).toBe(mockCommunity.posts.length);
//   });

//   it('closes when the close button is clicked', () => {
//     const mockOnClose = vi.fn();
//     render(<CommunityModal community={mockCommunity} onClose={mockOnClose} />);

//     const closeButton = screen.getByText(/\u00d7/); // Close button (\u00d7 is the "×" symbol)
//     fireEvent.click(closeButton);

//     expect(mockOnClose).toHaveBeenCalledTimes(1);
//   });
// });

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { describe, it, expect, vi } from 'vitest';
import CommunityModal from '../../../src/pages/CommunityModal';

const mockCommunity = {
  name: 'Sample Community',
  description: 'A place to share ideas and collaborate.',
  members: 50,
  posts: [
    {
      id: 1,
      user: 'User1',
      content: 'First post content!',
      timestamp: '1 hour ago',
      likes: 10,
      dislikes: 2,
      comments: [
        {
          user: 'Commenter1',
          text: 'Great post!',
          timestamp: '30 minutes ago',
          likes: 5,
          dislikes: 0,
          replies: [],
        },
      ],
    },
  ],
};

describe('CommunityModal Component', () => {
  it('renders community name and description', () => {
    render(<CommunityModal community={mockCommunity} onClose={vi.fn()} />);

    expect(screen.getByText('Sample Community')).toBeInTheDocument();
    expect(
      screen.getByText('A place to share ideas and collaborate.')
    ).toBeInTheDocument();
  });

  it('renders the correct number of posts', () => {
    render(<CommunityModal community={mockCommunity} onClose={vi.fn()} />);

    const posts = screen.getAllByText(/post content!/i);
    expect(posts.length).toBe(mockCommunity.posts.length);
  });

  it('closes when the close button is clicked', () => {
    const mockOnClose = vi.fn();
    render(<CommunityModal community={mockCommunity} onClose={mockOnClose} />);

    const closeButton = screen.getByText(/\u00d7/); // Close button (\u00d7 is the "×" symbol)
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
