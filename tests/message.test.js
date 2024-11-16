// // // //server/models/Message Schema
// // // // tests/messageSchema.test.js
// // // import { describe, it, expect, beforeAll, afterAll } from 'vitest';
// // // import mongoose from 'mongoose';
// // // import Message from '../server/models/Message.js'; 

// // // require("dotenv").config();
// // // import path from 'path';
// // // import dotenv from 'dotenv';
// // // dotenv.config({ path: path.resolve(__dirname, '.env') });

// // // import { describe, it, expect, beforeAll, afterAll } from 'vitest';
// // // import mongoose from 'mongoose';
// // // require("dotenv").config();

// // // const MessageSchema = new mongoose.Schema({
// // //   conversationId: {
// // //     type: String,
// // //   },
// // //   sender: {
// // //     type: String,
// // //   },
// // //   text: {
// // //     type: String,
// // //   },
// // // }, { timestamps: true });

// // // const Message = mongoose.model('Message', MessageSchema, 'Message');

// // // describe('Message Schema', () => {
// // //   beforeAll(async () => {
// // //     console.log('Connecting to database...');
// // //     await mongoose.connect('mongodb://localhost:27017/testdb');
// // //     console.log('Connected to database');
// // //   });

// // //   afterAll(async () => {
// // //     console.log('Dropping database...');
// // //     await mongoose.connection.dropDatabase();
// // //     console.log('Dropped database');
// // //     console.log('Closing connection...');
// // //     await mongoose.connection.close();
// // //     console.log('Closed connection');
// // //   });

// // //   it('should create a message with the specified fields', async () => {
// // //     const messageData = {
// // //       conversationId: 'conv123',
// // //       sender: 'user123',
// // //       text: 'Hello, world!',
// // //     };
    
// // //     console.log('Creating message instance...');
// // //     const message = new Message(messageData);

// // //     console.log('Saving message instance...');
// // //     const savedMessage = await message.save();
// // //     console.log('Message instance saved.');

// // //     expect(savedMessage.conversationId).toBe(messageData.conversationId);
// // //     expect(savedMessage.sender).toBe(messageData.sender);
// // //     expect(savedMessage.text).toBe(messageData.text);
// // //     expect(savedMessage.createdAt).toBeInstanceOf(Date);
// // //     expect(savedMessage.updatedAt).toBeInstanceOf(Date);
// // //   }, 120000); // Increase timeout to 2 minutes

// // //   it('should create a message without optional fields', async () => {
// // //     const messageData = {};
    
// // //     console.log('Creating message instance without optional fields...');
// // //     const message = new Message(messageData);

// // //     console.log('Saving message instance...');
// // //     const savedMessage = await message.save();
// // //     console.log('Message instance saved.');

// // //     expect(savedMessage.conversationId).toBeUndefined();
// // //     expect(savedMessage.sender).toBeUndefined();
// // //     expect(savedMessage.text).toBeUndefined();
// // //     expect(savedMessage.createdAt).toBeInstanceOf(Date);
// // //     expect(savedMessage.updatedAt).toBeInstanceOf(Date);
// // //   }, 120000); // Increase timeout to 2 minutes
// // // });

// // // /*
// // // const MessageSchema = new mongoose.Schema({
// // //   conversationId: {
// // //     type: String,
// // //   },
// // //   sender: {
// // //     type: String,
// // //   },
// // //   text: {
// // //     type: String,
// // //   },
// // // }, { timestamps: true });

// // // const Message = mongoose.model('Message', MessageSchema, 'Message');

// // // describe('Message Schema', () => {
// // //   beforeAll(async () => {
// // //     console.log('Connecting to database...');
// // //     await mongoose.connect(process.env.MONGODB_URI);
// // //     console.log('Connected to database');
// // //   });

// // //   afterAll(async () => {
// // //     console.log('Dropping database...');
// // //     await mongoose.connection.dropDatabase();
// // //     console.log('Dropped database');
// // //     console.log('Closing connection...');
// // //     await mongoose.connection.close();
// // //     console.log('Closed connection');
// // //   });

// // //   it('should create a message with the specified fields', async () => {
// // //     const messageData = {
// // //       conversationId: 'conv123',
// // //       sender: 'user123',
// // //       text: 'Hello, world!',
// // //     };
// // //     const message = new Message(messageData);
// // //     const savedMessage = await message.save();

// // //     expect(savedMessage.conversationId).toBe(messageData.conversationId);
// // //     expect(savedMessage.sender).toBe(messageData.sender);
// // //     expect(savedMessage.text).toBe(messageData.text);
// // //     expect(savedMessage.createdAt).toBeInstanceOf(Date);
// // //     expect(savedMessage.updatedAt).toBeInstanceOf(Date);
// // //   }, 15000); // Increase timeout to 15 seconds

// // //   it('should create a message without optional fields', async () => {
// // //     const messageData = {};
// // //     const message = new Message(messageData);
// // //     const savedMessage = await message.save();

// // //     expect(savedMessage.conversationId).toBeUndefined();
// // //     expect(savedMessage.sender).toBeUndefined();
// // //     expect(savedMessage.text).toBeUndefined();
// // //     expect(savedMessage.createdAt).toBeInstanceOf(Date);
// // //     expect(savedMessage.updatedAt).toBeInstanceOf(Date);
// // //   }, 15000); // Increase timeout to 15 seconds
// // // });
// // // */
// // import { describe, it, expect, beforeAll, afterAll } from 'vitest';
// // import mongoose from 'mongoose';
// // import Message from '../server/models/Message.js'; 

// // require("dotenv").config();
// // import path from 'path';
// // import dotenv from 'dotenv';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// // const MessageSchema = new mongoose.Schema({
// //   conversationId: {
// //     type: String,
// //   },
// //   sender: {
// //     type: String,
// //   },
// //   text: {
// //     type: String,
// //   },
// // }, { timestamps: true });

// // const Message = mongoose.model('Message', MessageSchema, 'Message');

// // describe('Message Schema', () => {
// //   beforeAll(async () => {
// //     console.log('Connecting to database...');
// //     await mongoose.connect(process.env.MONGODB_URI);
// //     console.log('Connected to database');
// //   });

// //   afterAll(async () => {
// //     console.log('Dropping database...');
// //     await mongoose.connection.dropDatabase();
// //     console.log('Dropped database');
// //     console.log('Closing connection...');
// //     await mongoose.connection.close();
// //     console.log('Closed connection');
// //   });

// //   it('should create a message with the specified fields', async () => {
// //     const messageData = {
// //       conversationId: 'conv123',
// //       sender: 'user123',
// //       text: 'Hello, world!',
// //     };
    
// //     console.log('Creating message instance...');
// //     const message = new Message(messageData);

// //     console.log('Saving message instance...');
// //     const savedMessage = await message.save();
// //     console.log('Message instance saved.');

// //     expect(savedMessage.conversationId).toBe(messageData.conversationId);
// //     expect(savedMessage.sender).toBe(messageData.sender);
// //     expect(savedMessage.text).toBe(messageData.text);
// //     expect(savedMessage.createdAt).toBeInstanceOf(Date);
// //     expect(savedMessage.updatedAt).toBeInstanceOf(Date);
// //   }, 90000); // Set timeout to 1.5 minutes (90 seconds)

// //   it('should create a message without optional fields', async () => {
// //     const messageData = {};
    
// //     console.log('Creating message instance without optional fields...');
// //     const message = new Message(messageData);

// //     console.log('Saving message instance...');
// //     const savedMessage = await message.save();
// //     console.log('Message instance saved.');

// //     expect(savedMessage.conversationId).toBeUndefined();
// //     expect(savedMessage.sender).toBeUndefined();
// //     expect(savedMessage.text).toBeUndefined();
// //     expect(savedMessage.createdAt).toBeInstanceOf(Date);
// //     expect(savedMessage.updatedAt).toBeInstanceOf(Date);
// //   }, 90000); // Set timeout to 1.5 minutes (90 seconds)
// // });


// import { describe, it, expect, beforeAll, afterAll } from 'vitest';
// import mongoose from 'mongoose';
// import Message from '../server/models/Message.js'; 
// require("dotenv").config();
// import path from 'path';
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// const MessageSchema = new mongoose.Schema({
//   conversationId: {
//     type: String,
//   },
//   sender: {
//     type: String,
//   },
//   text: {
//     type: String,
//   },
// }, { timestamps: true });

// const Message = mongoose.model('Message', MessageSchema, 'Message');

// describe('Message Schema', () => {
//   beforeAll(async () => {
//     console.log('Connecting to database...');
//     await mongoose.connect('mongodb://localhost:27017/testdb', {
//       serverSelectionTimeoutMS: 90000,  // Increase server selection timeout to 90 seconds
//       socketTimeoutMS: 90000,           // Increase socket timeout to 90 seconds
//     });
//     console.log('Connected to database');
//   });

//   afterAll(async () => {
//     console.log('Dropping database...');
//     await mongoose.connection.dropDatabase();
//     console.log('Dropped database');
//     console.log('Closing connection...');
//     await mongoose.connection.close();
//     console.log('Closed connection');
//   });

//   it('should create a message with the specified fields', async () => {
//     const messageData = {
//       conversationId: 'conv123',
//       sender: 'user123',
//       text: 'Hello, world!',
//     };
    
//     console.log('Creating message instance...');
//     const message = new Message(messageData);

//     console.log('Saving message instance...');
//     const savedMessage = await message.save();
//     console.log('Message instance saved.');

//     expect(savedMessage.conversationId).toBe(messageData.conversationId);
//     expect(savedMessage.sender).toBe(messageData.sender);
//     expect(savedMessage.text).toBe(messageData.text);
//     expect(savedMessage.createdAt).toBeInstanceOf(Date);
//     expect(savedMessage.updatedAt).toBeInstanceOf(Date);
//   }, 90000);  // Set timeout to 1.5 minutes (90 seconds)

//   it('should create a message without optional fields', async () => {
//     const messageData = {};
    
//     console.log('Creating message instance without optional fields...');
//     const message = new Message(messageData);

//     console.log('Saving message instance...');
//     const savedMessage = await message.save();
//     console.log('Message instance saved.');

//     expect(savedMessage.conversationId).toBeUndefined();
//     expect(savedMessage.sender).toBeUndefined();
//     expect(savedMessage.text).toBeUndefined();
//     expect(savedMessage.createdAt).toBeInstanceOf(Date);
//     expect(savedMessage.updatedAt).toBeInstanceOf(Date);
//   }, 90000);  // Set timeout to 1.5 minutes (90 seconds)
// });

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import Message from '../server/models/Message.js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

describe('Message Schema', () => {
  beforeAll(async () => {
    try {
      console.log('Connecting to database...');
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb', {
        serverSelectionTimeoutMS: 90000,
        socketTimeoutMS: 90000,
      });
      console.log('Connected to database');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      console.log('Dropping database...');
      await mongoose.connection.dropDatabase();
      console.log('Dropped database');
      
      console.log('Closing connection...');
      await mongoose.connection.close();
      console.log('Closed connection');
    } catch (error) {
      console.error('Cleanup error:', error);
      throw error;
    }
  });

  describe('Message Creation', () => {
    it('should create a message with all fields', async () => {
      const messageData = {
        conversationId: 'conv123',
        sender: 'user123',
        text: 'Hello, world!',
      };
      
      console.log('Creating message instance...');
      const message = new Message(messageData);

      console.log('Saving message instance...');
      const savedMessage = await message.save();
      console.log('Message instance saved.');

      // Validate all fields
      expect(savedMessage).toBeDefined();
      expect(savedMessage.conversationId).toBe(messageData.conversationId);
      expect(savedMessage.sender).toBe(messageData.sender);
      expect(savedMessage.text).toBe(messageData.text);
      expect(savedMessage.createdAt).toBeInstanceOf(Date);
      expect(savedMessage.updatedAt).toBeInstanceOf(Date);
    }, 90000);

    it('should create a message without optional fields', async () => {
      console.log('Creating message instance without optional fields...');
      const message = new Message({});

      console.log('Saving message instance...');
      const savedMessage = await message.save();
      console.log('Message instance saved.');

      // Validate empty fields
      expect(savedMessage).toBeDefined();
      expect(savedMessage.conversationId).toBeUndefined();
      expect(savedMessage.sender).toBeUndefined();
      expect(savedMessage.text).toBeUndefined();
      expect(savedMessage.createdAt).toBeInstanceOf(Date);
      expect(savedMessage.updatedAt).toBeInstanceOf(Date);
    }, 90000);
  });

  describe('Message Validation', () => {
    it('should handle very long text content', async () => {
      const longText = 'a'.repeat(10000);
      const message = new Message({
        conversationId: 'conv123',
        sender: 'user123',
        text: longText,
      });

      const savedMessage = await message.save();
      expect(savedMessage.text).toBe(longText);
    }, 90000);

    it('should handle special characters in text', async () => {
      const specialText = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';
      const message = new Message({
        conversationId: 'conv123',
        sender: 'user123',
        text: specialText,
      });

      const savedMessage = await message.save();
      expect(savedMessage.text).toBe(specialText);
    }, 90000);
  });
});