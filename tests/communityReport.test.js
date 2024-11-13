//server/models/communityReport Schema
// tests/communityReportSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import CommunityReport from '../server/models/CommunityReport.js'; 

const communityReportSchema = new mongoose.Schema({
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

const CommunityReport = mongoose.model('Community Report', communityReportSchema, 'Community Report');

describe('CommunityReport Schema', () => {
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

  it('should create a community report with required fields', async () => {
    const reportData = {
      reporter: 'Test Reporter',
      reason: 'Test Reason',
    };
    const report = new CommunityReport(reportData);
    const savedReport = await report.save();

    expect(savedReport.reporter).toBe(reportData.reporter);
    expect(savedReport.reason).toBe(reportData.reason);
    expect(savedReport.createdAt).toBeInstanceOf(Date);
  });

  it('should fail to create a community report without required fields', async () => {
    const reportData = {};
    const report = new CommunityReport(reportData);

    let error;
    try {
      await report.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.reporter).toBeDefined();
    expect(error.errors.reason).toBeDefined();
  });
});
