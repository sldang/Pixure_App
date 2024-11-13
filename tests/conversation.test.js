//server/models/conversation Schema
// tests/conversationSchema.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import Conversation from '../server/models/Conversation.js'; 

const ConversationSchema = new mongoose.Schema({
  members: {
    type: Array,
  },
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', ConversationSchema, 'Conversation');

describe('Conversation Schema', () => {
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

  it('should create a conversation with members', async () => {
    const conversationData = {
      members: ['user1', 'user2'],
    };
    const conversation = new Conversation(conversationData);
    const savedConversation = await conversation.save();

    expect(savedConversation.members).toEqual(conversationData.members);
    expect(savedConversation.createdAt).toBeInstanceOf(Date);
    expect(savedConversation.updatedAt).toBeInstanceOf(Date);
  });

  it('should create a conversation without members', async () => {
    const conversationData = {};
    const conversation = new Conversation(conversationData);
    const savedConversation = await conversation.save();

    expect(savedConversation.members).toEqual([]);
    expect(savedConversation.createdAt).toBeInstanceOf(Date);
    expect(savedConversation.updatedAt).toBeInstanceOf(Date);
  });
});
