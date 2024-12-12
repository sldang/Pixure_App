import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAuthContext } from '../../../src/hooks/useAuthContext';
import { AuthContextProvider } from '../../../src/contexts/AuthContext';

describe('useAuthContext', () => {
    it('should return the context value when used inside AuthContextProvider', () => {
        const { result } = renderHook(() => useAuthContext(), {
            wrapper: AuthContextProvider,
        });

        expect(result.current).toHaveProperty('user', null); // Default value from AuthContextProvider
        expect(result.current).toHaveProperty('dispatch');
        expect(typeof result.current.dispatch).toBe('function');
    });

    it('should throw an error when used outside AuthContextProvider', () => {
        const { result } = renderHook(() => useAuthContext());

        expect(result.error).toEqual(
            new Error('useAuthContext must be used inside an AuthContextProvider')
        );
    });
});
