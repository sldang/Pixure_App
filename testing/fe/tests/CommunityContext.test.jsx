import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CommunityProvider, useCommunityContext } from '../../../src/contexts/CommunityContext';
import { useReducer } from 'react';

// Mock child component to test provider
const MockChild = () => {
    const { state, dispatch } = useCommunityContext();
    return (
        <div>
            <p data-testid="joinedCommunities">{state.joinedCommunities.length}</p>
            <p data-testid="allCommunities">{state.allCommunities.length}</p>
        </div>
    );
};

describe('CommunityContext', () => {
    it('should provide default state', () => {
        render(
            <CommunityProvider>
                <MockChild />
            </CommunityProvider>
        );

        expect(screen.getByTestId('joinedCommunities').textContent).toBe('0');
        expect(screen.getByTestId('allCommunities').textContent).toBe('0');
    });

    it('should update state with dispatch actions', () => {
        const TestComponent = () => {
            const { state, dispatch } = useCommunityContext();

            return (
                <div>
                    <button
                        onClick={() =>
                            dispatch({
                                type: 'JOIN_COMMUNITY',
                                payload: { name: 'React Developers' },
                            })
                        }
                    >
                        Join Community
                    </button>
                    <p data-testid="joinedCommunities">{state.joinedCommunities.length}</p>
                </div>
            );
        };

        render(
            <CommunityProvider>
                <TestComponent />
            </CommunityProvider>
        );

        const button = screen.getByText('Join Community');
        button.click();

        expect(screen.getByTestId('joinedCommunities').textContent).toBe('1');
    });

    it('should throw error if useCommunityContext is used outside provider', () => {
        const TestComponent = () => {
            try {
                useCommunityContext();
            } catch (error) {
                return <p data-testid="error">{error.message}</p>;
            }
            return null;
        };

        render(<TestComponent />);

        expect(screen.getByTestId('error').textContent).toBe(
            'useCommunityContext must be used within a CommunityProvider'
        );
    });
});