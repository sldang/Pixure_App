// // tests/postSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import Post from '../server/models/Post.js';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '.env') });

// describe('Post Schema', () => {
//   beforeAll(async () => {
//     console.log('Connecting to database...');
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('Connected to database');
//   }, 30000); // Increase timeout to 30 seconds

//   afterAll(async () => {
//     console.log('Dropping database...');
//     await mongoose.connection.dropDatabase();
//     console.log('Dropped database');
//     console.log('Closing connection...');
//     await mongoose.connection.close();
//     console.log('Closed connection');
//   }, 30000); // Increase timeout to 30 seconds

//   it('should create a post with the specified fields', async () => {
//     const postData = {
//       userId: new mongoose.Types.ObjectId(),
//       desc: 'This is a test post',
//       img: 'test-image.jpg',
//       imageData: 'base64imageData',
//       likes: ['user1', 'user2'],
//     };
//     const post = new Post(postData);
//     const savedPost = await post.save();

//     expect(savedPost.userId).toEqual(postData.userId); // Use toEqual for object comparison
//     expect(savedPost.desc).toBe(postData.desc);
//     expect(savedPost.img).toBe(postData.img);
//     expect(savedPost.imageData).toBe(postData.imageData);
//     expect(savedPost.likes).toEqual(postData.likes);
//     expect(savedPost.createdAt).toBeInstanceOf(Date);
//     expect(savedPost.updatedAt).toBeInstanceOf(Date);
//   });

//   it('should create a post without optional fields', async () => {
//     const postData = { userId: new mongoose.Types.ObjectId() };
//     const post = new Post(postData);
//     const savedPost = await post.save();

//     expect(savedPost.userId).toEqual(postData.userId); // Use toEqual for object comparison
//     expect(savedPost.desc).toBeUndefined();
//     expect(savedPost.img).toBeUndefined();
//     expect(savedPost.imageData).toBeUndefined();
//     expect(savedPost.likes).toEqual([]);
//     expect(savedPost.createdAt).toBeInstanceOf(Date);
//     expect(savedPost.updatedAt).toBeInstanceOf(Date);
//   });
// });


describe('Post Schema', () => {
  beforeAll(async () => {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database');
  }, 30000); // Increase timeout to 30 seconds

  afterAll(async () => {
    console.log('Dropping database...');
    await mongoose.connection.dropDatabase();
    console.log('Dropped database');
    console.log('Closing connection...');
    await mongoose.connection.close();
    console.log('Closed connection');
  }, 30000); // Increase timeout to 30 seconds

  it('should create a post with the specified fields', async () => {
    const postData = {
      userId: new mongoose.Types.ObjectId(),
      desc: 'This is a test post',
      img: 'test-image.jpg',
      imageData: 'base64imageData',
      likes: ['user1', 'user2'],
    };
    const post = new Post(postData);
    const savedPost = await post.save();

    expect(savedPost.userId).toEqual(postData.userId);
    expect(savedPost.desc).toBe(postData.desc);
    expect(savedPost.img).toBe(postData.img);
    expect(savedPost.imageData).toBe(postData.imageData);
    expect(savedPost.likes).toEqual(postData.likes);
    expect(savedPost.createdAt).toBeInstanceOf(Date);
    expect(savedPost.updatedAt).toBeInstanceOf(Date);
  }, 10000); // Set individual test timeout to 10 seconds

  it('should create a post without optional fields', async () => {
    const postData = { userId: new mongoose.Types.ObjectId() };
    const post = new Post(postData);
    const savedPost = await post.save();

    expect(savedPost.userId).toEqual(postData.userId);
    expect(savedPost.desc).toBeUndefined();
    expect(savedPost.img).toBeUndefined();
    expect(savedPost.imageData).toBeUndefined();
    expect(savedPost.likes).toEqual([]);
    expect(savedPost.createdAt).toBeInstanceOf(Date);
    expect(savedPost.updatedAt).toBeInstanceOf(Date);
  }, 10000); // Set individual test timeout to 10 seconds
});
