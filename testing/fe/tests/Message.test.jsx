// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Message from '../../../src/components/MessengerComponents/Message'; 
// import { format } from 'timeago.js';

// // Mocking timeago.js
// jest.mock('timeago.js', () => ({
//   format: jest.fn(() => 'Just now'),
// }));

// describe('Message Component', () => {
//   it('should render message text and formatted time', () => {
//     const message = {
//       text: 'Hello, this is a test message.',
//       createdAt: '2024-12-09T00:00:00Z', // Example date
//     };

//     // Render the component
//     render(<Message message={message} own={false} />);

//     // Check if message text is rendered
//     expect(screen.getByText('Hello, this is a test message.')).toBeInTheDocument();

//     // Check if formatted creation time is rendered (mocked as "Just now")
//     expect(screen.getByText('Just now')).toBeInTheDocument();
//   });

//   it('should apply the correct CSS class for "own" messages', () => {
//     const message = {
//       text: 'This is a test message from own user.',
//       createdAt: '2024-12-09T00:00:00Z',
//     };

//     // Render the component with own={true}
//     render(<Message message={message} own={true} />);

//     // Check if the correct CSS class is applied
//     const messageElement = screen.getByText('This is a test message from own user.').closest('div');
//     expect(messageElement).toHaveClass('message own');
//   });

//   it('should apply the correct CSS class for non-own messages', () => {
//     const message = {
//       text: 'This is a test message from another user.',
//       createdAt: '2024-12-09T00:00:00Z',
//     };

//     // Render the component with own={false}
//     render(<Message message={message} own={false} />);

//     // Check if the correct CSS class is applied
//     const messageElement = screen.getByText('This is a test message from another user.').closest('div');
//     expect(messageElement).toHaveClass('message');
//   });
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Message from '../../../src/components/MessengerComponents/Message'; 
import { format } from 'timeago.js';

// Mocking timeago.js
vi.mock('timeago.js', () => ({
  format: vi.fn(() => 'Just now'),
}));

describe('Message Component', () => {
  it('should render message text and formatted time', () => {
    const message = {
      text: 'Hello, this is a test message.',
      createdAt: '2024-12-09T00:00:00Z', // Example date
    };

    // Render the component
    render(<Message message={message} own={false} />);

    // Check if message text is rendered
    expect(screen.getByText('Hello, this is a test message.')).toBeInTheDocument();

    // Check if formatted creation time is rendered (mocked as "Just now")
    expect(screen.getByText('Just now')).toBeInTheDocument();
  });

  it('should apply the correct CSS class for "own" messages', () => {
    const message = {
      text: 'This is a test message from own user.',
      createdAt: '2024-12-09T00:00:00Z',
    };

    // Render the component with own={true}
    render(<Message message={message} own={true} />);

    // Check if the correct CSS class is applied
    const messageElement = screen.getByText('This is a test message from own user.').closest('div');
    expect(messageElement).toHaveClass('message own');
  });

  it('should apply the correct CSS class for non-own messages', () => {
    const message = {
      text: 'This is a test message from another user.',
      createdAt: '2024-12-09T00:00:00Z',
    };

    // Render the component with own={false}
    render(<Message message={message} own={false} />);

    // Check if the correct CSS class is applied
    const messageElement = screen.getByText('This is a test message from another user.').closest('div');
    expect(messageElement).toHaveClass('message');
  });
});
