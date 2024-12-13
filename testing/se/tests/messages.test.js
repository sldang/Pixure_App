const request = require('supertest');
const app = require('../../../src/app'); 
const mongoose = require('mongoose');
const Message = require('../../../server/models/Message');
const Conversation = require('../../../server/models/Conversation');
const User = require('../../../server/models/User');

describe('Message Routes', () => {
    let user1, user2, conversation;

    beforeAll(async () => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Create test users
        user1 = await User.create({
            email: 'user1@example.com',
            firstName: 'User',
            lastName: 'One',
            nickname: 'user1',
            password: 'password123',
        });

        user2 = await User.create({
            email: 'user2@example.com',
            firstName: 'User',
            lastName: 'Two',
            nickname: 'user2',
            password: 'password123',
        });

        // Create a conversation between the users
        conversation = await new Conversation({
            members: [user1._id.toString(), user2._id.toString()],
        }).save();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /api/messages', () => {
        test('should send a new message successfully', async () => {
            const res = await request(app)
                .post('/api/messages')
                .send({
                    conversationId: conversation._id.toString(),
                    sender: user1._id.toString(),
                    text: 'Hello!',
                });

            expect(res.status).toBe(200);
            expect(res.body.text).toBe('Hello!');
            expect(res.body.sender).toBe(user1._id.toString());
        });

        test('should return 500 if there is an internal error', async () => {
            // Simulate an error by disconnecting the database
            await mongoose.connection.close();

            const res = await request(app)
                .post('/api/messages')
                .send({
                    conversationId: conversation._id.toString(),
                    sender: user1._id.toString(),
                    text: 'Hello!',
                });

            expect(res.status).toBe(500);
            expect(res.body.message).toBe('Internal server error');
        });
    });

    describe('GET /api/messages/:conversationId', () => {
        test('should retrieve messages for a conversation', async () => {
            // First, send a message
            await request(app)
                .post('/api/messages')
                .send({
                    conversationId: conversation._id.toString(),
                    sender: user1._id.toString(),
                    text: 'Hello!',
                });

            const res = await request(app).get(`/api/messages/${conversation._id.toString()}`);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0); // Verify that messages are returned
        });

        test('should return 500 if there is an internal error', async () => {
            // Simulate an error by disconnecting the database
            await mongoose.connection.close();

            const res = await request(app).get(`/api/messages/${conversation._id.toString()}`);
            expect(res.status).toBe(500);
            expect(res.body.message).toBe('Internal server error');
        });
    });
});
