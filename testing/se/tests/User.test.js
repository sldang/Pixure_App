const mongoose = require('mongoose');
const User = require('../../../server/models/User');

describe('User Model', () => {
    beforeAll(() => {
        mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should create a user with valid fields', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            nickname: 'johnny123',
            email: 'john.doe@example.com',
            password: 'securepassword',
            zipcode: '12345',
            followerList: ['jane.doe@example.com'],
            followList: ['jane.doe@example.com'],
            karma: '100',
            communityIDs: ['community1', 'community2'],
            posts: ['post1', 'post2'],
            age: '25',
            searchTags: ['tech', 'coding'],
            postAndFlagsTags: ['spam'],
            profilePicture: 'https://example.com/profile.jpg',
            parentAccount: 'parent123',
            parentAccountID: 'id123',
            childAccount: 'child123',
            childAccountID: 'id456',
            bio: 'Passionate about coding and technology.',
        };

        const user = new User(userData);
        await user.save();

        // Check if the user document was saved correctly
        expect(user.firstName).toBe('John');
        expect(user.email).toBe('john.doe@example.com');
        expect(user.nickname).toBe('johnny123');
        expect(user.followerList).toContain('jane.doe@example.com');
        expect(user.profilePicture).toBe('https://example.com/profile.jpg');
        expect(user.bio).toBe('Passionate about coding and technology.');
    });

    test('should fail to create user with duplicate email', async () => {
        const userData = {
            firstName: 'Alice',
            lastName: 'Smith',
            nickname: 'alice123',
            email: 'john.doe@example.com',  // Same email as the previous user
            password: 'securepassword',
        };

        const user = new User(userData);
        await expect(user.save()).rejects.toThrowError('E11000 duplicate key error');
    });

    test('should create a user with default profile picture and bio if not provided', async () => {
        const userData = {
            firstName: 'Bob',
            lastName: 'Brown',
            nickname: 'bob123',
            email: 'bob.brown@example.com',
            password: 'password123',
        };

        const user = new User(userData);
        await user.save();

        // Check default profile picture and bio
        expect(user.profilePicture).toBe('https://via.placeholder.com/150');
        expect(user.bio).toBe("Everyone has a story to tell. I'm gonna tell you mine.");
    });

    test('should throw an error if required fields are missing', async () => {
        const userData = {
            firstName: 'Invalid',
            lastName: 'User',
            nickname: 'invalidUser',
            // Missing email and password fields
        };

        const user = new User(userData);
        await expect(user.save()).rejects.toThrowError('User validation failed: email: Path `email` is required.');
    });
});
