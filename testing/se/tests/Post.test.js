const mongoose = require('mongoose');
const Post = require('../../../server/models/Post');
const User = require('../../../server/models/User'); // Assuming User model is defined

jest.mock('mongoose');
jest.mock('../../../server/models/User');

describe('Post Model', () => {
    beforeAll(() => {
        mongoose.connect.mockResolvedValue();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should create a post with userId and comments', async () => {
        const mockUser = { _id: 'userId123', email: 'user@example.com' };
        const mockComment = {
            userId: 'commentUserId123',
            content: 'This is a comment',
            createdAt: new Date(),
        };

        User.findOne.mockResolvedValue(mockUser);

        const postData = {
            userId: mockUser._id,
            desc: 'Test post description',
            img: 'image.jpg',
            imageData: 'imageDataString',
            likes: [],
            community: 'Test Community',
            comments: [mockComment],
        };

        const post = new Post(postData);
        await post.save();

        // Test for correct data in the post
        expect(post.userId).toBe(mockUser._id);
        expect(post.desc).toBe(postData.desc);
        expect(post.img).toBe(postData.img);
        expect(post.comments.length).toBe(1);
        expect(post.comments[0].userId).toBe(mockComment.userId);
        expect(post.comments[0].content).toBe(mockComment.content);
        expect(post.comments[0].createdAt).toBeDefined();
    });

    test('should allow an empty comment array', async () => {
        const mockUser = { _id: 'userId123', email: 'user@example.com' };

        User.findOne.mockResolvedValue(mockUser);

        const postData = {
            userId: mockUser._id,
            desc: 'Test post with no comments',
            img: 'image.jpg',
            imageData: 'imageDataString',
            likes: [],
            community: 'Test Community',
            comments: [],
        };

        const post = new Post(postData);
        await post.save();

        // Test for no comments
        expect(post.comments.length).toBe(0);
    });

    test('should create a post with timestamp fields', async () => {
        const mockUser = { _id: 'userId123', email: 'user@example.com' };

        User.findOne.mockResolvedValue(mockUser);

        const postData = {
            userId: mockUser._id,
            desc: 'Test post with timestamp',
            img: 'image.jpg',
            imageData: 'imageDataString',
            likes: [],
            community: 'Test Community',
            comments: [],
        };

        const post = new Post(postData);
        await post.save();

        // Test for timestamp creation
        expect(post.createdAt).toBeDefined();
        expect(post.updatedAt).toBeDefined();
    });
});
