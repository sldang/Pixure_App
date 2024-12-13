import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';  // for API testing
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Mock required modules
vi.mock('dotenv', () => ({
  config: vi.fn()
}));

vi.mock('mongoose', () => ({
  connect: vi.fn().mockResolvedValue(true),
}));

vi.mock('express', () => {
  const mockExpress = vi.fn(() => ({
    use: vi.fn(),
    get: vi.fn(),
    post: vi.fn(),
    listen: vi.fn(),
  }));
  return mockExpress;
});

vi.mock('./connectDB', () => vi.fn());

import app from '../server';  // Import the server (Express instance)

// Initialize dotenv for testing
dotenv.config();

// Example of a simple route test
describe('Server Tests', () => {
  let server;

  beforeEach(() => {
    server = app.listen(5000);  // Start the server before each test
  });

  afterEach(() => {
    server.close();  // Close server after each test
  });

  it('should check if the server is running', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello, server is running!" });
  });

  it('should get all communities', async () => {
    const mockCommunities = [{ name: 'Test Community' }];
    vi.mock('./models/Community', () => ({
      find: vi.fn().mockResolvedValue(mockCommunities),
    }));

    const response = await request(server).get('/api/Community');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCommunities);
  });

  it('should create a new user', async () => {
    const mockCreateUser = vi.fn().mockResolvedValue(true);
    vi.mock('./models/User', () => ({
      create: mockCreateUser,
    }));

    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const response = await request(server)
      .post('/api/User')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
    expect(mockCreateUser).toHaveBeenCalledWith(newUser);
  });

  it('should return 404 if community not found', async () => {
    vi.mock('./models/Community', () => ({
      findOne: vi.fn().mockResolvedValue(null),
    }));

    const response = await request(server).get('/api/Community/non-existent');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Community not found' });
  });

  it('should allow user to login with valid credentials', async () => {
    const mockUser = {
      email: 'johndoe@example.com',
      password: 'password123',
      _id: 'user123',
    };

    vi.mock('./models/User', () => ({
      findOne: vi.fn().mockResolvedValue(mockUser),
      comparePassword: vi.fn().mockResolvedValue(true),
    }));

    const response = await request(server)
      .post('/api/login')
      .send({ email: 'johndoe@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(mockUser.email);
  });

  it('should return 400 if login credentials are incorrect', async () => {
    vi.mock('./models/User', () => ({
      findOne: vi.fn().mockResolvedValue(null),
    }));

    const response = await request(server)
      .post('/api/login')
      .send({ email: 'wrongemail@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid credentials');
  });

  it('should follow another user', async () => {
    const mockUser = {
      email: 'johndoe@example.com',
      followList: [],
    };

    vi.mock('./models/User', () => ({
      findOne: vi.fn().mockResolvedValue(mockUser),
      save: vi.fn(),
    }));

    const response = await request(server)
      .post('/api/follow')
      .send({ email: 'johndoe@example.com', followEmail: 'janedoe@example.com' });

    expect(response.status).toBe(200);
    expect(mockUser.followList).toContain('janedoe@example.com');
  });

  it('should return 404 if user to follow not found', async () => {
    vi.mock('./models/User', () => ({
      findOne: vi.fn().mockResolvedValue(null),
    }));

    const response = await request(server)
      .post('/api/follow')
      .send({ email: 'johndoe@example.com', followEmail: 'nonexistentuser@example.com' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User to follow not found');
  });
});
