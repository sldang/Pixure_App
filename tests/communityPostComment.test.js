//server/models/CommunityPostComment Schema
// tests/communityPostCommentSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import CommunityPostComment from '../server/models/CommunityPostComment.js'; 
require("dotenv").config();



const communityPostCommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community Post',
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

const CommunityPostComment = mongoose.model('Community Post Comment', communityPostCommentSchema, 'Community Post Comment');

describe('CommunityPostComment Schema', () => {
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

  it('should create a community post comment with required fields', async () => {
    const commentData = {
      postId: new mongoose.Types.ObjectId(),
      content: 'Test Content',
      author: 'Test Author',
    };
    const comment = new CommunityPostComment(commentData);
    const savedComment = await comment.save();

    expect(savedComment.postId).toBe(commentData.postId);
    expect(savedComment.content).toBe(commentData.content);
    expect(savedComment.author).toBe(commentData.author);
    expect(savedComment.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a community post comment without required fields', async () => {
    const commentData = {};
    const comment = new CommunityPostComment(commentData);

    let error;
    try {
      await comment.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.postId).toBeDefined();
    expect(error.errors.content).toBeDefined();
    expect(error.errors.author).toBeDefined();
  });
});
