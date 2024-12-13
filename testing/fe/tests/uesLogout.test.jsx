import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useLogout } from '../../../src/hooks/useLogout';
import { AuthContextProvider } from '../../../src/contexts/AuthContext';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('useLogout', () => {
    it('should remove user from localStorage and dispatch LOGOUT', () => {
        const mockDispatch = vi.fn();

        // Mock useAuthContext to return the mock dispatch function
        vi.mock('../../../src/hooks/useAuthContext', () => ({
            useAuthContext: () => ({
                dispatch: mockDispatch,
            }),
        }));

        const { result } = renderHook(() => useLogout(), {
            wrapper: AuthContextProvider,
        });

        act(() => {
            localStorage.setItem('user', JSON.stringify({ id: '123' }));
            result.current.logout();
        });

        expect(localStorage.getItem('user')).toBeNull();
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGOUT' });
    });

    it('should throw an error if used outside of AuthContextProvider', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        vi.mock('../../../src/hooks/useAuthContext', () => ({
            useAuthContext: () => {
                throw new Error('useAuthContext must be used inside an AuthContextProvider');
            },
        }));

        const { result } = renderHook(() => useLogout());

        expect(() => {
            result.current.logout();
        }).toThrow('useAuthContext must be used inside an AuthContextProvider');

        consoleErrorSpy.mockRestore();
    });
});
