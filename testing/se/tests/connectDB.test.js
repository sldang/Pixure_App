// // /testing/se/tests/connectDB.test.js

// import { vi, expect, beforeAll, afterAll } from 'vitest';
// import mongoose from 'mongoose';
// import connectDB from '../../../server/connectDB';

// vi.mock('mongoose', () => ({
//   connect: vi.fn(),
// }));

// describe('connectDB', () => {
//   beforeAll(() => {
//     process.env.MONGODB_URI = 'mongodb://localhost/test';
//   });

//   afterAll(() => {
//     vi.clearAllMocks();
//   });

//   it('should connect to MongoDB successfully', async () => {
//     const mockConnection = { connection: { host: 'localhost' } };
//     mongoose.connect.mockResolvedValue(mockConnection);

//     await connectDB();

//     expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost/test', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     expect(console.log).toHaveBeenCalledWith('MongoDB Connected: localhost');
//   });

//   it('should handle errors when MongoDB connection fails', async () => {
//     const mockError = new Error('MongoDB connection failed');
//     mongoose.connect.mockRejectedValue(mockError);

//     const spyProcessExit = vi.spyOn(process, 'exit').mockImplementation(() => {});

//     await connectDB();

//     expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost/test', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     expect(console.error).toHaveBeenCalledWith('Error: MongoDB connection failed');
//     expect(spyProcessExit).toHaveBeenCalledWith(1);

//     spyProcessExit.mockRestore();
//   });
// });

// /testing/se/tests/connectDB.test.js

import { vi, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import connectDB from '../../../server/connectDB';

// Correctly mock the mongoose named export
vi.mock('mongoose', () => ({
  connect: vi.fn(),
  connection: {
    host: 'localhost',
  },
}));

describe('connectDB', () => {
  beforeAll(() => {
    process.env.MONGODB_URI = 'mongodb://localhost/test';
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should connect to MongoDB successfully', async () => {
    const mockConnection = { connection: { host: 'localhost' } };
    mongoose.connect.mockResolvedValue(mockConnection);

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    expect(console.log).toHaveBeenCalledWith('MongoDB Connected: localhost');
  });

  it('should handle errors when MongoDB connection fails', async () => {
    const mockError = new Error('MongoDB connection failed');
    mongoose.connect.mockRejectedValue(mockError);

    const spyProcessExit = vi.spyOn(process, 'exit').mockImplementation(() => {});

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    expect(console.error).toHaveBeenCalledWith('Error: MongoDB connection failed');
    expect(spyProcessExit).toHaveBeenCalledWith(1);

    spyProcessExit.mockRestore();
  });
});
