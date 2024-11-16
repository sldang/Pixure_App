/*
//server/models/Community.js Schema
// tests/communitySchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import Community from '../server/models/Community.js'; 
require("dotenv").config({ path: path.resolve(__dirname, '.env')});

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
    await mongoose.connect(MONGODB_URI, {
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

*/
/*

// tests/communitySchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import Community from '../server/models/Community.js'; 
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

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
    await mongoose.connect(MONGODB_URI, {
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
*/

// // tests/communitySchema.test.js
// import { describe, it, expect, beforeAll, afterAll } from 'vitest';
// import mongoose from 'mongoose';
// import Community from '../server/models/Community.js'; 
// import path from 'path';
// import dotenv from 'dotenv';

// dotenv.config({ path: path.resolve(__dirname, '.env') });

// const MONGODB_URI = process.env.MONGODB_URI;

// const communitySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Community = mongoose.model('Community', communitySchema, 'Community');

// describe('Community Schema', () => {
//   beforeAll(async () => {
//     try {
//       await mongoose.connect(MONGODB_URI, {
//         serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30 seconds
//       });
//       console.log('Connected to MongoDB');
//     } catch (err) {
//       console.error('Failed to connect to MongoDB', err);
//     }
//   });
  
//   afterAll(async () => {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//   });
//   it('should create a community with required fields', async () => {
//     const communityData = {
//       name: 'Test Community',
//     };
//     console.log('Creating community with data:', communityData);
//     const community = new Community(communityData);
    
//     console.log('Saving community...');
//     const savedCommunity = await community.save();
    
//     console.log('Community saved:', savedCommunity);
//     expect(savedCommunity.name).toBe(communityData.name);
//     expect(savedCommunity.description).toBeUndefined(); // Optional field
//     expect(savedCommunity.createdAt).toBeInstanceOf(Date);
//   }, 10000); // Increase the timeout for this test
  
//   it('should fail to create a community without a required field', async () => {
//     const communityData = {};
//     console.log('Creating community with data:', communityData);
//     const community = new Community(communityData);
  
//     let error;
//     try {
//       console.log('Saving community...');
//       await community.save();
//     } catch (e) {
//       console.log('Error occurred:', e);
//       error = e;
//     }
  
//     expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
//     expect(error.errors.name).toBeDefined();
//   }, 10000); // Increase the timeout for this test
  
// });


// tests/communitySchema.test.js
// import { describe, it, expect, beforeAll, afterAll
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import Community from '../server/models/Community.js'; 
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

describe('Community Schema', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30 seconds
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
  });
  
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a community with required fields', async () => {
    const communityData = {
      name: 'Test Community',
    };
    console.log('Creating community with data:', communityData);
    const community = new Community(communityData);
    
    console.log('Saving community...');
    const savedCommunity = await community.save();
    
    console.log('Community saved:', savedCommunity);
    expect(savedCommunity.name).toBe(communityData.name);
    expect(savedCommunity.description).toBeUndefined(); // Optional field
    expect(savedCommunity.createdAt).toBeInstanceOf(Date);
  }, 10000); // Increase the timeout for this test
  
  it('should fail to create a community without a required field', async () => {
    const communityData = {};
    console.log('Creating community with data:', communityData);
    const community = new Community(communityData);
  
    let error;
    try {
      console.log('Saving community...');
      await community.save();
    } catch (e) {
      console.log('Error occurred:', e);
      error = e;
    }
  
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.name).toBeDefined();
  }, 10000); // Increase the timeout for this test
  
});
