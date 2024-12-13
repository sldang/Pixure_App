import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { io } from 'socket.io-client';
import useSocket from '../../../src/hooks/useSocket';

vi.mock('socket.io-client');

describe('useSocket', () => {
    let mockSocket;
    let userId;
    let handleNewMessage;

    beforeEach(() => {
        mockSocket = {
            on: vi.fn(),
            emit: vi.fn(),
            disconnect: vi.fn(),
        };
        io.mockReturnValue(mockSocket);
        userId = 'user123';
        handleNewMessage = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should establish and disconnect socket connection', () => {
        const { unmount } = renderHook(() => useSocket(userId, handleNewMessage));

        expect(io).toHaveBeenCalledWith('https://socket-pixure-app.onrender.com', {
            transports: ['websocket'],
        });

        unmount();
        expect(mockSocket.disconnect).toHaveBeenCalled();
    });

    it('should handle incoming messages', () => {
        const { result } = renderHook(() => useSocket(userId, handleNewMessage));

        const messageData = {
            senderId: 'user456',
            text: 'Hello!',
        };

        // Simulate the "getMessage" event
        const arrivalMessageCallback = mockSocket.on.mock.calls.find(
            ([event]) => event === 'getMessage'
        )[1];

        act(() => {
            arrivalMessageCallback(messageData);
        });

        expect(result.current.arrivalMessage).toEqual({
            sender: messageData.senderId,
            text: messageData.text,
            createdAt: expect.any(Number),
        });
    });

    it('should emit addUser and listen for getUsers', () => {
        renderHook(() => useSocket(userId, handleNewMessage));

        expect(mockSocket.emit).toHaveBeenCalledWith('addUser', userId);

        const users = [{ id: 'user123' }, { id: 'user456' }];
        const getUsersCallback = mockSocket.on.mock.calls.find(
            ([event]) => event === 'getUsers'
        )[1];

        act(() => {
            getUsersCallback(users);
        });

        expect(mockSocket.on).toHaveBeenCalledWith('getUsers', expect.any(Function));
    });

    it('should send messages', () => {
        const { result } = renderHook(() => useSocket(userId, handleNewMessage));

        const messageData = { sender: userId, text: 'Hello!' };
        const receiverId = 'user456';

        act(() => {
            result.current.sendMessage(messageData, receiverId);
        });

        expect(mockSocket.emit).toHaveBeenCalledWith('sendMessage', {
            senderId: messageData.sender,
            receiverId,
            text: messageData.text,
        });
    });
});
