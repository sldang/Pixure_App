// import { renderHook, act } from '@testing-library/react';
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import axios from 'axios';
// import useMessages from '../../../src/hooks/useMessages';

// vi.mock('axios');

// describe('useMessages', () => {
//     let currentChat;
//     let userId;

//     beforeEach(() => {
//         currentChat = { _id: 'chat123' };
//         userId = 'user123';
//         vi.resetAllMocks();
//     });

//     it('should initialize states correctly', () => {
//         const { result } = renderHook(() => useMessages(currentChat, userId));

//         expect(result.current.messages).toEqual([]);
//         expect(result.current.newMessage).toBe('');
//         expect(result.current.setNewMessage).toBeInstanceOf(Function);
//         expect(result.current.fetchMessages).toBeInstanceOf(Function);
//         expect(result.current.handleNewMessage).toBeInstanceOf(Function);
//         expect(result.current.addMessage).toBeInstanceOf(Function);
//     });

//     it('should fetch messages successfully', async () => {
//         const mockMessages = [{ _id: 'msg1', text: 'Hello' }];
//         axios.get.mockResolvedValueOnce({ data: mockMessages });

//         const { result } = renderHook(() => useMessages(currentChat, userId));

//         await act(async () => {
//             await result.current.fetchMessages();
//         });

//         expect(axios.get).toHaveBeenCalledWith(`/api/messages/${currentChat._id}`);
//         expect(result.current.messages).toEqual(mockMessages);
//     });

//     it('should handle errors when fetching messages', async () => {
//         axios.get.mockRejectedValueOnce(new Error('Error fetching messages'));

//         const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

//         const { result } = renderHook(() => useMessages(currentChat, userId));

//         await act(async () => {
//             await result.current.fetchMessages();
//         });

//         expect(axios.get).toHaveBeenCalledWith(`/api/messages/${currentChat._id}`);
//         expect(result.current.messages).toEqual([]);
//         expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching messages:', expect.any(Error));

//         consoleErrorSpy.mockRestore();
//     });

//     it('should add a new message to state via handleNewMessage', () => {
//         const { result } = renderHook(() => useMessages(currentChat, userId));

//         const message = { _id: 'msg1', text: 'Hello' };

//         act(() => {
//             result.current.handleNewMessage(message);
//         });

//         expect(result.current.messages).toEqual([message]);
//         expect(result.current.processedMessageIds.has(message._id)).toBe(true);
//     });

//     it('should not add duplicate messages via handleNewMessage', () => {
//         const { result } = renderHook(() => useMessages(currentChat, userId));

//         const message = { _id: 'msg1', text: 'Hello' };

//         act(() => {
//             result.current.handleNewMessage(message);
//             result.current.handleNewMessage(message); // Add duplicate
//         });

//         expect(result.current.messages).toEqual([message]);
//     });

//     it('should add a new message via addMessage', async () => {
//         const newMessage = { text: 'Hi there!', senderId: userId };
//         const mockResponse = { data: { _id: 'msg2', text: 'Hi there!' } };
//         axios.post.mockResolvedValueOnce(mockResponse);

//         const { result } = renderHook(() => useMessages(currentChat, userId));

//         await act(async () => {
//             await result.current.addMessage(newMessage);
//         });

//         expect(axios.post).toHaveBeenCalledWith('/api/messages', newMessage);
//         expect(result.current.messages).toEqual([mockResponse.data]);
//     });

//     it('should handle errors when adding a message', async () => {
//         axios.post.mockRejectedValueOnce(new Error('Error sending message'));

//         const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

//         const { result } = renderHook(() => useMessages(currentChat, userId));

//         await act(async () => {
//             try {
//                 await result.current.addMessage({ text: 'Hello', senderId: userId });
//             } catch (error) {
//                 expect(error.message).toBe('Could not send message.');
//             }
//         });

//         expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending message:', expect.any(Error));

//         consoleErrorSpy.mockRestore();
//     });
// });

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import useMessages from '../../../src/hooks/useMessages';

vi.mock('axios');

describe('useMessages', () => {
    let currentChat;
    let userId;

    beforeEach(() => {
        currentChat = { _id: 'chat123' };
        userId = 'user123';
        vi.resetAllMocks();
    });

    it('should initialize states correctly', () => {
        const { result } = renderHook(() => useMessages(currentChat, userId));

        expect(result.current.messages).toEqual([]);
        expect(result.current.newMessage).toBe('');
        expect(result.current.setNewMessage).toBeInstanceOf(Function);
        expect(result.current.fetchMessages).toBeInstanceOf(Function);
        expect(result.current.handleNewMessage).toBeInstanceOf(Function);
        expect(result.current.addMessage).toBeInstanceOf(Function);
    });

    it('should fetch messages successfully', async () => {
        const mockMessages = [{ _id: 'msg1', text: 'Hello' }];
        axios.get.mockResolvedValueOnce({ data: mockMessages });

        const { result } = renderHook(() => useMessages(currentChat, userId));

        await act(async () => {
            await result.current.fetchMessages();
        });

        expect(axios.get).toHaveBeenCalledWith(`/api/messages/${currentChat._id}`);
        expect(result.current.messages).toEqual(mockMessages);
    });

    it('should handle errors when fetching messages', async () => {
        axios.get.mockRejectedValueOnce(new Error('Error fetching messages'));

        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const { result } = renderHook(() => useMessages(currentChat, userId));

        await act(async () => {
            await result.current.fetchMessages();
        });

        expect(axios.get).toHaveBeenCalledWith(`/api/messages/${currentChat._id}`);
        expect(result.current.messages).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching messages:', expect.any(Error));

        consoleErrorSpy.mockRestore();
    });

    it('should add a new message to state via handleNewMessage', () => {
        const { result } = renderHook(() => useMessages(currentChat, userId));

        const message = { _id: 'msg1', text: 'Hello' };

        act(() => {
            result.current.handleNewMessage(message);
        });

        expect(result.current.messages).toEqual([message]);
        expect(result.current.processedMessageIds.current.has(message._id)).toBe(true);
    });

    it('should not add duplicate messages via handleNewMessage', () => {
        const { result } = renderHook(() => useMessages(currentChat, userId));

        const message = { _id: 'msg1', text: 'Hello' };

        act(() => {
            result.current.handleNewMessage(message);
            result.current.handleNewMessage(message); // Add duplicate
        });

        expect(result.current.messages).toEqual([message]);
    });

    it('should add a new message via addMessage', async () => {
        const newMessage = { text: 'Hi there!', senderId: userId };
        const mockResponse = { data: { _id: 'msg2', text: 'Hi there!' } };
        axios.post.mockResolvedValueOnce(mockResponse);

        const { result } = renderHook(() => useMessages(currentChat, userId));

        await act(async () => {
            await result.current.addMessage(newMessage);
        });

        expect(axios.post).toHaveBeenCalledWith('/api/messages', newMessage);
        expect(result.current.messages).toEqual([mockResponse.data]);
    });

    it('should handle errors when adding a message', async () => {
        axios.post.mockRejectedValueOnce(new Error('Error sending message'));

        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const { result } = renderHook(() => useMessages(currentChat, userId));

        await act(async () => {
            try {
                await result.current.addMessage({ text: 'Hello', senderId: userId });
            } catch (error) {
                expect(error.message).toBe('Could not send message.');
            }
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending message:', expect.any(Error));

        consoleErrorSpy.mockRestore();
    });
});
