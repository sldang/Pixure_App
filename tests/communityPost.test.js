//server/models.CommunityPost Schema
// tests/communityPostSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import CommunityPost from '../server/models/CommunityPost.js'; 
require("dotenv").config();



const communityPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CommunityPost = mongoose.model('Community Post', communityPostSchema, 'Community Post');

describe('CommunityPost Schema', () => {
  beforeAll(async () => {
    console.log('Connecting to database...');
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');
  });

  afterAll(async () => {
    console.log('Dropping database...');
    await mongoose.connection.dropDatabase();
    console.log('Dropped database');
    console.log('Closing connection...');
    await mongoose.connection.close();
    console.log('Closed connection');
  });

  it('should create a community post with required fields', async () => {
    const postData = {
      title: 'Test Title',
      content: 'Test Content',
      author: 'Test Author',
    };
    const post = new CommunityPost(postData);
    const savedPost = await post.save();

    expect(savedPost.title).toBe(postData.title);
    expect(savedPost.content).toBe(postData.content);
    expect(savedPost.author).toBe(postData.author);
    expect(savedPost.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a community post without required fields', async () => {
    const postData = {};
    const post = new CommunityPost(postData);

    let error;
    try {
      await post.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.title).toBeDefined();
    expect(error.errors.content).toBeDefined();
    expect(error.errors.author).toBeDefined();
  });
});
