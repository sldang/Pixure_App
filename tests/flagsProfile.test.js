//server/models/FlagsProfile Schema
// tests/flagsProfileSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import FlagsProfile from '../server/models/FlagsProfile.js'; 
require("dotenv").config();


const flagsProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  flagType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FlagsProfile = mongoose.model('Flags Profile', flagsProfileSchema, 'Flags Profile');

describe('FlagsProfile Schema', () => {
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

  it('should create a flags profile with required fields', async () => {
    const profileData = {
      userId: 'user123',
      flagType: 'Test Flag',
    };
    const profile = new FlagsProfile(profileData);
    const savedProfile = await profile.save();

    expect(savedProfile.userId).toBe(profileData.userId);
    expect(savedProfile.flagType).toBe(profileData.flagType);
    expect(savedProfile.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a flags profile without required fields', async () => {
    const profileData = {};
    const profile = new FlagsProfile(profileData);

    let error;
    try {
      await profile.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.userId).toBeDefined();
    expect(error.errors.flagType).toBeDefined();
  });
});
