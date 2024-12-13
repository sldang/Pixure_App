const request = require('supertest');
const app = require('../../../src/app'); 
const mongoose = require('mongoose');
const User = require('../../../server/models/User');
const Community = require('../../../server/models/Community');

describe('POST /api/followCommunity', () => {
    beforeAll(async () => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Setup test data
        await User.create({
            email: 'testuser@example.com',
            firstName: 'Test',
            lastName: 'User',
            nickname: 'testuser',
            password: 'password123',
        });

        await Community.create({
            name: 'Test Community',
            communityPosts: [],
            communityMembers: [],
            description: 'A test community',
            restriction: false,
            imageString: '',
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should follow a community successfully', async () => {
        const res = await request(app)
            .post('/api/followCommunity')
            .send({
                email: 'testuser@example.com',
                communityName: 'Test Community',
            });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Followed successfully');

        // Verify the user is following the community
        const user = await User.findOne({ email: 'testuser@example.com' });
        const community = await Community.findOne({ name: 'Test Community' });
        expect(user.communityIDs).toContain(community._id.toString());
        expect(community.communityMembers).toContain('testuser@example.com');
    });

    test('should return 404 if the follower is not found', async () => {
        const res = await request(app)
            .post('/api/followCommunity')
            .send({
                email: 'nonexistentuser@example.com',
                communityName: 'Test Community',
            });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Follower not found');
    });

    test('should return 404 if the community is not found', async () => {
        const res = await request(app)
            .post('/api/followCommunity')
            .send({
                email: 'testuser@example.com',
                communityName: 'Nonexistent Community',
            });

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('community to follow not found');
    });

    test('should return 400 if already following the community', async () => {
        // First, follow the community
        await request(app)
            .post('/api/followCommunity')
            .send({
                email: 'testuser@example.com',
                communityName: 'Test Community',
            });

        // Try to follow the same community again
        const res = await request(app)
            .post('/api/followCommunity')
            .send({
                email: 'testuser@example.com',
                communityName: 'Test Community',
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Already following this community');
    });

    test('should handle internal server errors', async () => {
        // Simulate an error by disconnecting from the database
        await mongoose.connection.close();

        const res = await request(app)
            .post('/api/followCommunity')
            .send({
                email: 'testuser@example.com',
                communityName: 'Test Community',
            });

        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Internal server error');
    });
});
