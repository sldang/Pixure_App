const request = require('supertest');
const app = require('../../../src/app'); 
const mongoose = require('mongoose');
const User = require('../../../server/models/User');
const Conversation = require('../../../server/models/Conversation');

describe('Conversation Routes', () => {
    beforeAll(async () => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Create test users
        await User.create({
            email: 'user1@example.com',
            firstName: 'User',
            lastName: 'One',
            nickname: 'user1',
            password: 'password123',
        });

        await User.create({
            email: 'user2@example.com',
            firstName: 'User',
            lastName: 'Two',
            nickname: 'user2',
            password: 'password123',
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /api/conversations', () => {
        test('should create a new conversation successfully', async () => {
            const res = await request(app)
                .post('/api/conversations')
                .send({
                    userEmail: 'user1@example.com',
                    otherEmail: 'user2@example.com',
                });

            expect(res.status).toBe(200);
            expect(res.body.members).toContainEqual(expect.any(String)); // Check for valid member IDs
            expect(res.body.members).toContainEqual(expect.any(String));
        });

        test('should return 404 if user or recipient is not found', async () => {
            const res = await request(app)
                .post('/api/conversations')
                .send({
                    userEmail: 'nonexistent@example.com',
                    otherEmail: 'user2@example.com',
                });

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('User not found');
        });

        test('should return 500 if there is an internal error', async () => {
            // Simulate an error by disconnecting the database
            await mongoose.connection.close();

            const res = await request(app)
                .post('/api/conversations')
                .send({
                    userEmail: 'user1@example.com',
                    otherEmail: 'user2@example.com',
                });

            expect(res.status).toBe(500);
            expect(res.body.message).toBe('Internal server error');
        });
    });

    describe('GET /api/conversations/:userId', () => {
        test('should return all conversations for a user', async () => {
            const user1 = await User.findOne({ email: 'user1@example.com' });
            const user2 = await User.findOne({ email: 'user2@example.com' });

            const newConversation = new Conversation({
                members: [user1._id.toString(), user2._id.toString()],
            });
            await newConversation.save();

            const res = await request(app).get(`/api/conversations/${user1._id.toString()}`);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0); // Verify that conversations are returned
        });

        test('should return 500 if there is an internal error', async () => {
            // Simulate an error by disconnecting the database
            await mongoose.connection.close();

            const res = await request(app).get('/api/conversations/123');
            expect(res.status).toBe(500);
            expect(res.body.message).toBe('Internal server error');
        });
    });
});
