import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthContextProvider, AuthContext } from '../../../src/contexts/AuthContext';
import { useContext } from 'react';

// Mock child component to test provider
const MockChild = () => {
    const context = useContext(AuthContext);
    return (
        <div>
            <p data-testid="user">{context?.user ? context.user.name : 'No user'}</p>
            <button onClick={() => context.dispatch({ type: 'LOGIN', payload: { name: 'John Doe' } })}>
                Login
            </button>
            <button onClick={() => context.dispatch({ type: 'LOGOUT' })}>Logout</button>
        </div>
    );
};

describe('AuthContext', () => {
    it('should provide default state', () => {
        render(
            <AuthContextProvider>
                <MockChild />
            </AuthContextProvider>
        );

        expect(screen.getByTestId('user').textContent).toBe('No user');
    });

    it('should update state with LOGIN action', () => {
        render(
            <AuthContextProvider>
                <MockChild />
            </AuthContextProvider>
        );

        const loginButton = screen.getByText('Login');
        loginButton.click();

        expect(screen.getByTestId('user').textContent).toBe('John Doe');
    });

    it('should update state with LOGOUT action', () => {
        render(
            <AuthContextProvider>
                <MockChild />
            </AuthContextProvider>
        );

        const loginButton = screen.getByText('Login');
        loginButton.click();

        const logoutButton = screen.getByText('Logout');
        logoutButton.click();

        expect(screen.getByTestId('user').textContent).toBe('No user');
    });
});
