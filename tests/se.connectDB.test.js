//PROGRESS HERE
import { describe, it, vi, expect, afterEach, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import connectDB from '../server/connectDB';

// Mock mongoose
vi.mock('mongoose', () => ({
  default: {
    connect: vi.fn()
  }
}));

describe('connectDB', () => {
  const TEST_URI = 'mongodb://localhost:27017/test';

  beforeEach(() => {
    // Set test environment
    process.env.MONGODB_URI = TEST_URI;
    
    // Clear mocks
    vi.clearAllMocks();
    
    // Mock console methods
    console.log = vi.fn();
    console.error = vi.fn();
    process.exit = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    //delete process.env.MONGODB_URI;
  });

  it('should connect to MongoDB successfully', async () => {
    // Arrange
    mongoose.connect.mockResolvedValueOnce({
      connection: { host: 'localhost' }
    });

    // Act
    await connectDB();

    // Assert
    expect(mongoose.connect).toHaveBeenCalledWith(TEST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    expect(console.log).toHaveBeenCalledWith('MongoDB Connected: localhost');
  });

  it('should handle connection error', async () => {
    // Arrange
    const mockError = new Error('Connection error');
    mongoose.connect.mockRejectedValueOnce(mockError);

    // Act
    await connectDB();

    // Assert
    expect(console.error).toHaveBeenCalledWith('Error: Connection error');
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('should use correct MongoDB URI from environment', async () => {
    // Arrange
    const customUri = 'mongodb://testdb:27017/custom';
    process.env.MONGODB_URI = customUri;
    mongoose.connect.mockResolvedValueOnce({
      connection: { host: 'testdb' }
    });

    // Act
    await connectDB();

    // Assert
    expect(mongoose.connect).toHaveBeenCalledWith(customUri, expect.any(Object));
  });

  it('should handle missing MongoDB URI', async () => {
    // Arrange
    delete process.env.MONGODB_URI;
    const mockError = new Error('The `uri` parameter to `openUri()` must be a string, got "undefined"');
    mongoose.connect.mockRejectedValueOnce(mockError);

    // Act
    await connectDB();

    // Assert
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('must be a string'));
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
//END PROGRESS HERE
