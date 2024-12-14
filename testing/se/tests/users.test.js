import request from 'supertest';
import { vi } from 'vitest';
import express from 'express';
import userRouter from '../../../server/routes/userRoutes'; // Adjust path as necessary
import mongoose from 'mongoose';

// Create a mock app
const app = express();
app.use(express.json());
app.use('/api/users', userRouter);

vi.mock('../../../server/models/User'); // Mock User model
vi.mock('../../../server/models/Post'); // Mock Post model

// Mocked User model functions
const User = {
  findById: vi.fn(),
  findOne: vi.fn(),
  findByIdAndUpdate: vi.fn(),
  findByIdAndDelete: vi.fn(),
  find: vi.fn(),
};

// Use the mock User model
mongoose.model = vi.fn().mockReturnValue(User);

describe('User Routes', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/users/:id', () => {
    it('should return user data when user exists', async () => {
      const mockUser = { _id: '1', nickname: 'JohnDoe', email: 'john@example.com' };
      User.findById.mockResolvedValue(mockUser);

      const response = await request(app).get('/api/users/?userId=1');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(User.findById).toHaveBeenCalledWith('1');
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);

      const response = await request(app).get('/api/users/?userId=2');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });

    it('should return 400 if userId is missing', async () => {
      const response = await request(app).get('/api/users/');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing userId query parameter');
    });
  });

  describe('POST /api/users/login', () => {
    it('should return token and user data on successful login', async () => {
      const mockUser = {
        _id: '1',
        email: 'john@example.com',
        password: 'hashedpassword',
        firstName: 'John',
        lastName: 'Doe',
        nickname: 'JohnDoe',
      };
      User.findOne.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/users/login')
        .send({ email: 'john@example.com', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.userId).toBe(mockUser._id);
      expect(response.body.name).toBe(mockUser.nickname);
      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
    });

    it('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/users/login')
        .send({ email: 'john@example.com', password: 'password' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });

    it('should return 400 if password is incorrect', async () => {
      const mockUser = {
        _id: '1',
        email: 'john@example.com',
        password: 'hashedpassword',
      };
      User.findOne.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/users/login')
        .send({ email: 'john@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid credentials');
    });
  });

  describe('PUT /api/users/follow', () => {
    it('should allow user to follow another user', async () => {
      const mockFollower = { email: 'follower@example.com', followList: [] };
      const mockFollowee = { email: 'followee@example.com', followerList: [] };
      User.findOne
        .mockResolvedValueOnce(mockFollower) // for follower
        .mockResolvedValueOnce(mockFollowee); // for followee
      User.save.mockResolvedValue();

      const response = await request(app)
        .put('/api/users/follow')
        .send({
          followerEmail: 'follower@example.com',
          followeeEmail: 'followee@example.com',
        });

      expect(response.status).toBe(200);
      expect(response.body).toBe('Successfully followed the user');
      expect(User.findOne).toHaveBeenCalledWith({ email: 'follower@example.com' });
      expect(User.findOne).toHaveBeenCalledWith({ email: 'followee@example.com' });
    });

    it('should return 400 if email is missing', async () => {
      const response = await request(app)
        .put('/api/users/follow')
        .send({ followerEmail: '', followeeEmail: 'followee@example.com' });

      expect(response.status).toBe(400);
      expect(response.body).toBe('Follower email and followee email are required');
    });

    it('should return 403 if trying to follow yourself', async () => {
      const response = await request(app)
        .put('/api/users/follow')
        .send({ followerEmail: 'john@example.com', followeeEmail: 'john@example.com' });

      expect(response.status).toBe(403);
      expect(response.body).toBe('You cannot follow yourself');
    });
  });

  describe('PUT /api/users/unfollow', () => {
    it('should allow user to unfollow another user', async () => {
      const mockFollower = { email: 'follower@example.com', followList: ['followee@example.com'] };
      const mockFollowee = { email: 'followee@example.com', followerList: ['follower@example.com'] };
      User.findOne
        .mockResolvedValueOnce(mockFollower) // for follower
        .mockResolvedValueOnce(mockFollowee); // for followee
      User.save.mockResolvedValue();

      const response = await request(app)
        .put('/api/users/unfollow')
        .send({
          followerEmail: 'follower@example.com',
          followeeEmail: 'followee@example.com',
        });

      expect(response.status).toBe(200);
      expect(response.body).toBe('Successfully unfollowed the user');
      expect(User.findOne).toHaveBeenCalledWith({ email: 'follower@example.com' });
      expect(User.findOne).toHaveBeenCalledWith({ email: 'followee@example.com' });
    });

    it('should return 400 if email is missing', async () => {
      const response = await request(app)
        .put('/api/users/unfollow')
        .send({ followerEmail: '', followeeEmail: 'followee@example.com' });

      expect(response.status).toBe(400);
      expect(response.body).toBe('Follower email and followee email are required');
    });

    it('should return 403 if trying to unfollow yourself', async () => {
      const response = await request(app)
        .put('/api/users/unfollow')
        .send({ followerEmail: 'john@example.com', followeeEmail: 'john@example.com' });

      expect(response.status).toBe(403);
      expect(response.body).toBe('You cannot unfollow yourself');
    });
  });

  describe('PUT /api/users/update-profile', () => {
    it('should allow user to update their profile', async () => {
      const mockUser = { _id: '1', nickname: 'JohnDoe', email: 'john@example.com' };
      const updatedUser = { ...mockUser, nickname: 'JohnDoeUpdated' };
      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      const response = await request(app)
        .put('/api/users/update-profile')
        .send({ userId: '1', nickname: 'JohnDoeUpdated' });

      expect(response.status).toBe(200);
      expect(response.body.nickname).toBe('JohnDoeUpdated');
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('1', { nickname: 'JohnDoeUpdated' }, { new: true });
    });

    it('should return 400 if userId or nickname is missing', async () => {
      const response = await request(app)
        .put('/api/users/update-profile')
        .send({ userId: '', nickname: 'JohnDoeUpdated' });

      expect(response.status).toBe(400);
      expect(response.body).toBe('User ID and nickname are required');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should allow admin to delete user', async () => {
      User.findByIdAndDelete.mockResolvedValue(true);

      const response = await request(app).delete('/api/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toBe('User deleted successfully');
      expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
    });

    it('should return 404 if user not found', async () => {
      User.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete('/api/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toBe('User not found');
    });
  });
});
