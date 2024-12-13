import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useConversations from '../../../src/hooks/useConversations';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('useConversations', () => {
    it('should initialize with an empty conversations array', () => {
        const { result } = renderHook(() => useConversations('userId123'));
        expect(result.current.conversations).toEqual([]);
    });

    it('should fetch conversations and update state', async () => {
        const mockConversations = [
            { id: 1, name: 'Chat 1' },
            { id: 2, name: 'Chat 2' },
        ];
        axios.get.mockResolvedValueOnce({ data: mockConversations });

        const { result } = renderHook(() => useConversations('userId123'));
        await act(async () => {
            await result.current.fetchConversations();
        });

        expect(axios.get).toHaveBeenCalledWith('/api/conversations/userId123');
        expect(result.current.conversations).toEqual(mockConversations);
    });

    it('should log an error if fetching conversations fails', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        axios.get.mockRejectedValueOnce(new Error('API Error'));

        const { result } = renderHook(() => useConversations('userId123'));
        await act(async () => {
            await result.current.fetchConversations();
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Error fetching conversations:',
            expect.any(Error)
        );
        consoleErrorSpy.mockRestore();
    });

    it('should add a new conversation and update state', async () => {
        const newConversation = { id: 3, name: 'Chat 3' };
        axios.post.mockResolvedValueOnce({ data: newConversation });

        const { result } = renderHook(() => useConversations('userId123'));
        await act(async () => {
            const addedConversation = await result.current.addConversation(
                'user@example.com',
                'other@example.com'
            );
            expect(addedConversation).toEqual(newConversation);
        });

        expect(result.current.conversations).toEqual([newConversation]);
        expect(axios.post).toHaveBeenCalledWith('/api/conversations', {
            userEmail: 'user@example.com',
            otherEmail: 'other@example.com',
        });
    });

    it('should throw an error if adding a conversation fails', async () => {
        axios.post.mockRejectedValueOnce(new Error('API Error'));

        const { result } = renderHook(() => useConversations('userId123'));

        await expect(
            act(async () => {
                await result.current.addConversation(
                    'user@example.com',
                    'other@example.com'
                );
            })
        ).rejects.toThrow('Could not create conversation.');
    });
});
