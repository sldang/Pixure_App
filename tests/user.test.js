//server/models/User Schema
// tests/userSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import User from '../server/models/User.js'; 

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  nickname: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  zipcode: { type: String, required: false },
  followerList: { type: Array, required: false },
  followList: { type: Array, required: false },
  karma: { type: String, required: false },
  communityIDs: { type: String, required: false },
  posts: { type: String, required: false },
  age: { type: String, required: false },
  searchTags: { type: String, required: false },
  postAndFlagsTags: { type: String, required: false },
  profilePic: { type: String, required: false },
  parentAccount: { type: String, required: false },
  parentAccountID: { type: String, required: false },
  childAccount: { type: String, required: false },
  childAccountID: { type: String, required: false },
});

const User = mongoose.model('User', userSchema, 'User');

describe('User Schema', () => {
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

  it('should create a user with specified fields', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      nickname: 'Johnny',
      email: 'john.doe@example.com',
      password: 'securepassword',
      zipcode: '12345',
      followerList: ['user1', 'user2'],
      followList: ['user3', 'user4'],
      karma: 'good',
      communityIDs: 'community1',
      posts: 'post1',
      age: '30',
      searchTags: 'tag1',
      postAndFlagsTags: 'flag1',
      profilePic: 'profilePic.jpg',
      parentAccount: 'parent1',
      parentAccountID: 'parentID1',
      childAccount: 'child1',
      childAccountID: 'childID1',
    };
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.nickname).toBe(userData.nickname);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.zipcode).toBe(userData.zipcode);
    expect(savedUser.followerList).toEqual(userData.followerList);
    expect(savedUser.followList).toEqual(userData.followList);
    expect(savedUser.karma).toBe(userData.karma);
    expect(savedUser.communityIDs).toBe(userData.communityIDs);
    expect(savedUser.posts).toBe(userData.posts);
    expect(savedUser.age).toBe(userData.age);
    expect(savedUser.searchTags).toBe(userData.searchTags);
    expect(savedUser.postAndFlagsTags).toBe(userData.postAndFlagsTags);
    expect(savedUser.profilePic).toBe(userData.profilePic);
    expect(savedUser.parentAccount).toBe(userData.parentAccount);
    expect(savedUser.parentAccountID).toBe(userData.parentAccountID);
    expect(savedUser.childAccount).toBe(userData.childAccount);
    expect(savedUser.childAccountID).toBe(userData.childAccountID);
  });

  it('should create a user without optional fields', async () => {
    const userData = { email: 'john.doe@example.com' };
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.firstName).toBeUndefined();
    expect(savedUser.lastName).toBeUndefined();
    expect(savedUser.nickname).toBeUndefined();
    expect(savedUser.password).toBeUndefined();
    expect(savedUser.zipcode).toBeUndefined();
    expect(savedUser.followerList).toEqual([]);
    expect(savedUser.followList).toEqual([]);
    expect(savedUser.karma).toBeUndefined();
    expect(savedUser.communityIDs).toBeUndefined();
    expect(savedUser.posts).toBeUndefined();
    expect(savedUser.age).toBeUndefined();
    expect(savedUser.searchTags).toBeUndefined();
    expect(savedUser.postAndFlagsTags).toBeUndefined();
    expect(savedUser.profilePic).toBeUndefined();
    expect(savedUser.parentAccount).toBeUndefined();
    expect(savedUser.parentAccountID).toBeUndefined();
    expect(savedUser.childAccount).toBeUndefined();
    expect(savedUser.childAccountID).toBeUndefined();
  });
});
