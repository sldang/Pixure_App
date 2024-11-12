
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//require('dotenv').config({ path: './.env'});

//decomment this for debuging:
//console.log("MONGO_URI:", process.env.MONGO_URI);


const { POST, GET } = require('../server/index.js'); 

// Mock the Mongoose model
jest.mock('../server/models/Post.js', () => {
  const mockFind = jest.fn();
  const mockSave = jest.fn().mockImplementation(() => ({ save: jest.fn() }));
  return {
    find: mockFind,
    save: mockSave
  };
});

const Post = require('../server/models/Post.js'); // This will use the mocked version
//console.log("MONGO_URI in test file:", process.env.MONGO_URI);

const app = express();
app.use(bodyParser.json());

app.post('/api/report', POST);
app.get('/api/report', GET);

describe('Report API', () => {

  beforeAll(async () => {
    //console.log("MONGO_URI in test file:", process.env.MONGO_URI);
    const url = process.env.MONGO_URI; // test database
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should submit a report', async () => {
    const mockReport = { title: 'Report 1', content: 'Content 1', active: true };
    const newReport = new Post(mockReport);
    Post.mockImplementationOnce(() => newReport);

    const response = await request(app).post('/api/report').send(mockReport);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(mockReport.title);
    expect(response.body.content).toBe(mockReport.content);
    expect(response.body.active).toBe(mockReport.active);
    expect(newReport.save).toHaveBeenCalled();
  });

  it('should handle errors when submitting a report', async () => {
    Post.mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const response = await request(app).post('/api/report').send({ title: 'Report 1', content: 'Content 1', active: true });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'An error occurred while submitting the report' });
  });

  it('should retrieve reports with query params', async () => {
    const mockReports = [
      { title: 'Report 1', content: 'Content 1', active: true },
      { title: 'Report 2', content: 'Content 2', active: false },
    ];
    Post.find.mockResolvedValue(mockReports);

    const response = await request(app).get('/api/report').query({ limit: 2, active: 'true' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockReports);
    expect(Post.find).toHaveBeenCalledWith({ active: true }, null, { limit: 2 });
  });

  it('should handle errors when retrieving reports', async () => {
    Post.find.mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const response = await request(app).get('/api/report').query({ limit: 2, active: 'true' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'An error occurred while fetching reports' });
  });
});
