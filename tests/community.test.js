//server/models/Community.js Schema
// tests/communitySchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import Community from '../server/models/Community.js'; 
require("dotenv").config()

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Community = mongoose.model('Community', communitySchema, 'Community');

describe('Community Schema', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a community with required fields', async () => {
    const communityData = {
      name: 'Test Community',
    };
    const community = new Community(communityData);
    const savedCommunity = await community.save();

    expect(savedCommunity.name).toBe(communityData.name);
    expect(savedCommunity.description).toBeUndefined(); // Optional field
    expect(savedCommunity.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a community without a required field', async () => {
    const communityData = {};
    const community = new Community(communityData);

    let error;
    try {
      await community.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.name).toBeDefined();
  });
});
