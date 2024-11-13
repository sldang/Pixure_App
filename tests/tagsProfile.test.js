//server/models/TagsProfile Schema
// tests/tagsProfileSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import TagsProfile from '../server/models/TagsProfile.js'; 

const tagsProfileSchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TagsProfile = mongoose.model('Tags Profile', tagsProfileSchema, 'Tags Profile');

describe('TagsProfile Schema', () => {
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

  it('should create a tags profile with required fields', async () => {
    const tagData = {
      tagName: 'Test Tag',
    };
    const tagProfile = new TagsProfile(tagData);
    const savedTagProfile = await tagProfile.save();

    expect(savedTagProfile.tagName).toBe(tagData.tagName);
    expect(savedTagProfile.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a tags profile without required fields', async () => {
    const tagData = {};
    const tagProfile = new TagsProfile(tagData);

    let error;
    try {
      await tagProfile.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.tagName).toBeDefined();
  });
});
