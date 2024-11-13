//server/models/SearchTagsAndFlags Schema
// tests/searchTagsAndFlagsSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import SearchTagsAndFlags from '../server/models/SearchTagsAndFlags.js'; 
require("dotenv").config();


const searchTagsAndFlagsSchema = new mongoose.Schema({
  tagName: {
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

const SearchTagsAndFlags = mongoose.model('Search Tags and Flags', searchTagsAndFlagsSchema, 'Search Tags and Flags');

describe('SearchTagsAndFlags Schema', () => {
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

  it('should create a search tag or flag with required fields', async () => {
    const data = {
      tagName: 'Test Tag',
      flagType: 'Test Flag',
    };
    const tagOrFlag = new SearchTagsAndFlags(data);
    const savedTagOrFlag = await tagOrFlag.save();

    expect(savedTagOrFlag.tagName).toBe(data.tagName);
    expect(savedTagOrFlag.flagType).toBe(data.flagType);
    expect(savedTagOrFlag.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a search tag or flag without required fields', async () => {
    const data = {};
    const tagOrFlag = new SearchTagsAndFlags(data);

    let error;
    try {
      await tagOrFlag.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.tagName).toBeDefined();
    expect(error.errors.flagType).toBeDefined();
  });
});
