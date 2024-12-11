import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../../../src/components/Profile';
import Yoshi from '../../../src/components/yoshi.jpg';

jest.mock('../../../src/components/yoshi.jpg', () => 'mocked-yoshi.jpg');

describe('Profile Component', () => {
    test('renders profile image with correct src and alt attributes', () => {
        render(<Profile />);

        const profileImage = screen.getByAltText('Profile');
        expect(profileImage).toBeInTheDocument();
        expect(profileImage).toHaveAttribute('src', 'mocked-yoshi.jpg');
    });

    test('renders profile name', () => {
        render(<Profile />);

        const profileName = screen.getByText('John Doe');
        expect(profileName).toBeInTheDocument();
    });

    test('renders profile stats', () => {
        render(<Profile />);

        const posts = screen.getByText('722 posts');
        const followers = screen.getByText('25.1m followers');
        const following = screen.getByText('6 following');

        expect(posts).toBeInTheDocument();
        expect(followers).toBeInTheDocument();
        expect(following).toBeInTheDocument();
    });

    test('renders follow and message buttons', () => {
        render(<Profile />);

        const followButton = screen.getByRole('button', { name: /follow/i });
        const messageButton = screen.getByRole('button', { name: /message/i });

        expect(followButton).toBeInTheDocument();
        expect(messageButton).toBeInTheDocument();
    });

    test('renders profile bio', () => {
        render(<Profile />);

        const bio = screen.getByText("Everyone has a story to tell. Let's tell yours.");
        expect(bio).toBeInTheDocument();
    });
});
