//server/models/Message Schema
// tests/messageSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import Message from '../server/models/Message.js'; 

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
  },
  sender: {
    type: String,
  },
  text: {
    type: String,
  },
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema, 'Message');

describe('Message Schema', () => {
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

  it('should create a message with the specified fields', async () => {
    const messageData = {
      conversationId: 'conv123',
      sender: 'user123',
      text: 'Hello, world!',
    };
    const message = new Message(messageData);
    const savedMessage = await message.save();

    expect(savedMessage.conversationId).toBe(messageData.conversationId);
    expect(savedMessage.sender).toBe(messageData.sender);
    expect(savedMessage.text).toBe(messageData.text);
    expect(savedMessage.createdAt).toBeInstanceOf(Date);
    expect(savedMessage.updatedAt).toBeInstanceOf(Date);
  });

  it('should create a message without optional fields', async () => {
    const messageData = {};
    const message = new Message(messageData);
    const savedMessage = await message.save();

    expect(savedMessage.conversationId).toBeUndefined();
    expect(savedMessage.sender).toBeUndefined();
    expect(savedMessage.text).toBeUndefined();
    expect(savedMessage.createdAt).toBeInstanceOf(Date);
    expect(savedMessage.updatedAt).toBeInstanceOf(Date);
  });
});
