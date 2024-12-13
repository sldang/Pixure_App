// /testing/se/tests/socket.test.js

import { vi, expect, beforeAll, afterAll, it, describe } from 'vitest';
import { Server } from 'socket.io';
import { createServer } from 'http';
import ioClient from 'socket.io-client';
import path from 'path';

// Mocking the socket server file
vi.mock('../../../socket/index.js', () => {
  return {
    io: vi.fn(),
  };
});

describe('Socket.IO Server', () => {
  let server, clientSocket;

  beforeAll((done) => {
    // Create an HTTP server and socket server
    server = createServer();
    const socketServer = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    // Start server
    server.listen(8900, () => {
      console.log('Test Socket.IO server running');
      done();
    });

    // Create client socket to connect to the server
    clientSocket = ioClient.connect('http://localhost:8900', {
      transports: ['websocket'],
    });

    // Listen for connection
    clientSocket.on('connect', () => {
      done();
    });
  });

  afterAll((done) => {
    // Disconnect the client socket after the tests
    clientSocket.disconnect();
    server.close(done);
  });

  it('should handle user connection and disconnection', (done) => {
    const testUserId = 'user123';

    // Mock console.log to track user connections
    const spyConsoleLog = vi.spyOn(console, 'log');

    clientSocket.emit('addUser', testUserId);

    clientSocket.on('getUsers', (users) => {
      expect(users.length).toBeGreaterThan(0);
      expect(spyConsoleLog).toHaveBeenCalledWith('a user connected.');

      // Simulate disconnection
      clientSocket.disconnect();

      clientSocket.on('connect', () => {
        expect(spyConsoleLog).toHaveBeenCalledWith('a user disconnected!');
        done();
      });
    });
  });

  it('should send message to another user', (done) => {
    const senderId = 'user1';
    const receiverId = 'user2';
    const message = 'Hello, user2!';

    // Mock the receiving user socket
    const mockUserSocket = {
      emit: vi.fn(),
    };

    const spyGetUser = vi.fn(() => mockUserSocket);

    // Emit sendMessage from sender to receiver
    clientSocket.emit('sendMessage', {
      senderId,
      receiverId,
      text: message,
    });

    // Ensure the message was sent to the correct receiver
    expect(mockUserSocket.emit).toHaveBeenCalledWith('getMessage', {
      senderId,
      text: message,
    });

    done();
  });

  it('should handle new post event', (done) => {
    const newPost = { id: 'post1', content: 'This is a new post!' };

    // Mock a socket that will listen to 'postAdded' event
    clientSocket.on('postAdded', (post) => {
      expect(post).toEqual(newPost);
      done();
    });

    // Emit a new post event
    clientSocket.emit('newPost', newPost);
  });
});
