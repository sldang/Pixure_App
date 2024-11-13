//server/models/LocalCommunityAccount Schema
// tests/localCommunityAccountSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import LocalCommunityAccount from '../server/models/LocalCommunityAccount.js'; 
require("dotenv").config();


const localCommunityAccountSchema = new mongoose.Schema({
  accountId: {
    type: String,
    required: true,
  },
  communityName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LocalCommunityAccount = mongoose.model('Local Community Account', localCommunityAccountSchema, 'Local Community Account');

describe('LocalCommunityAccount Schema', () => {
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

  it('should create a local community account with required fields', async () => {
    const accountData = {
      accountId: 'account123',
      communityName: 'Test Community',
    };
    const account = new LocalCommunityAccount(accountData);
    const savedAccount = await account.save();

    expect(savedAccount.accountId).toBe(accountData.accountId);
    expect(savedAccount.communityName).toBe(accountData.communityName);
    expect(savedAccount.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a local community account without required fields', async () => {
    const accountData = {};
    const account = new LocalCommunityAccount(accountData);

    let error;
    try {
      await account.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.accountId).toBeDefined();
    expect(error.errors.communityName).toBeDefined();
  });
});
