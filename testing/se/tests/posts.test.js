const request = require('supertest');
const app = require('../../../src/app'); 
const mongoose = require('mongoose');
const Post = require('../../../server/models/Post');
const User = require('../../../server/models/User');

describe('Post Routes', () => {
  let user1, user2, post;

  beforeAll(async () => {
    mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create test users
    user1 = await User.create({
      email: 'user1@example.com',
      firstName: 'User',
      lastName: 'One',
      nickname: 'user1',
      password: 'password123',
    });

    user2 = await User.create({
      email: 'user2@example.com',
      firstName: 'User',
      lastName: 'Two',
      nickname: 'user2',
      password: 'password123',
    });

    // Create a test post
    post = await Post.create({
      userId: user1._id,
      desc: 'Test post',
      imageData: '',
      likes: [],
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/posts', () => {
    test('should create a post successfully', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({
          userId: user1._id,
          desc: 'Another post',
        });

      expect(res.status).toBe(201);
      expect(res.body.desc).toBe('Another post');
    });

    test('should return error for unsupported file type', async () => {
      const res = await request(app)
        .post('/api/posts')
        .attach('img', 'path/to/unsupported/file.txt')
        .send({
          userId: user1._id,
          desc: 'Post with unsupported file type',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Unsupported file type');
    });
  });

  describe('PUT /api/posts/:id', () => {
    test('should update a post successfully', async () => {
      const res = await request(app)
        .put(`/api/posts/${post._id}`)
        .send({
          userId: user1._id,
          desc: 'Updated description',
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Post updated successfully.');
    });

    test('should return error if user is not post owner', async () => {
      const res = await request(app)
        .put(`/api/posts/${post._id}`)
        .send({
          userId: user2._id,
          desc: 'Updated description by non-owner',
        });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('You may only update your own posts!');
    });
  });

  describe('DELETE /api/posts/:id', () => {
    test('should delete a post successfully', async () => {
      const res = await request(app)
        .delete(`/api/posts/${post._id}`)
        .send({ userId: user1._id });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Post deleted successfully.');
    });

    test('should return error if user is not post owner', async () => {
      const res = await request(app)
        .delete(`/api/posts/${post._id}`)
        .send({ userId: user2._id });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('You may only delete your own posts!');
    });
  });

  describe('PUT /api/posts/:id/like', () => {
    test('should like a post', async () => {
      const res = await request(app)
        .put(`/api/posts/${post._id}/like`)
        .send({ userId: user2._id });

      expect(res.status).toBe(200);
      expect(res.body).toBe('Post liked!');
    });

    test('should dislike a post', async () => {
      const res = await request(app)
        .put(`/api/posts/${post._id}/like`)
        .send({ userId: user2._id });

      expect(res.status).toBe(200);
      expect(res.body).toBe('Post disliked!');
    });
  });

  describe('POST /api/posts/:id/comments', () => {
    test('should add a comment to a post', async () => {
      const res = await request(app)
        .post(`/api/posts/${post._id}/comments`)
        .send({
          userId: user1._id,
          content: 'This is a comment',
        });

      expect(res.status).toBe(201);
      expect(res.body.content).toBe('This is a comment');
    });
  });

  describe('GET /api/posts/:id/comments', () => {
    test('should get all comments for a post', async () => {
      const res = await request(app).get(`/api/posts/${post._id}/comments`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
