//server/models/PostReport.js
// tests/postReportSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import PostReport from '../server/models/PostReport.js'; 
require("dotenv").config();


const postReportSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  reporter: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostReport = mongoose.model('Post Report', postReportSchema, 'Post Report');

describe('PostReport Schema', () => {
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

  it('should create a post report with required fields', async () => {
    const reportData = {
      postId: new mongoose.Types.ObjectId(),
      reporter: 'Test Reporter',
      reason: 'Test Reason',
    };
    const report = new PostReport(reportData);
    const savedReport = await report.save();

    expect(savedReport.postId).toBe(reportData.postId);
    expect(savedReport.reporter).toBe(reportData.reporter);
    expect(savedReport.reason).toBe(reportData.reason);
    expect(savedReport.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a post report without required fields', async () => {
    const reportData = {};
    const report = new PostReport(reportData);

    let error;
    try {
      await report.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.postId).toBeDefined();
    expect(error.errors.reporter).toBeDefined();
    expect(error.errors.reason).toBeDefined();
  });
});
