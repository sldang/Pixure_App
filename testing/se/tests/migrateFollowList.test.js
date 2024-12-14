const mongoose = require('mongoose');
const User = require('../../../server/models/User');
const { migrateFollowList } = require('../../../server/migrateFollowList'); // Adjust path accordingly

jest.mock('mongoose');
jest.mock('../../../server/models/User');

describe('Migrate Follow List', () => {
    beforeEach(() => {
        mongoose.connect.mockResolvedValue();
        User.find.mockResolvedValue([
            { email: 'user1@example.com', followList: ['user2@example.com'] },
            { email: 'user2@example.com', followList: [] },
        ]);
        User.findOne.mockResolvedValue({ _id: 'mockedObjectId' });
        User.prototype.save.mockResolvedValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should migrate followList to ObjectIds', async () => {
        await migrateFollowList();

        // Ensure the migration processed the users
        expect(User.find).toHaveBeenCalledTimes(1);
        expect(User.findOne).toHaveBeenCalledTimes(1);

        // Ensure save was called with updated followList
        expect(User.prototype.save).toHaveBeenCalledTimes(1);
        expect(User.prototype.save).toHaveBeenCalledWith(expect.objectContaining({
            followList: ['mockedObjectId'],
        }));
    });

    test('should handle users with already valid ObjectId followList', async () => {
        User.find.mockResolvedValue([
            { email: 'user1@example.com', followList: ['mockedObjectId'] },
        ]);

        await migrateFollowList();

        // Ensure that the user with valid followList was skipped
        expect(User.prototype.save).toHaveBeenCalledTimes(0);
    });

    test('should log a warning for missing followed user', async () => {
        User.findOne.mockResolvedValueOnce(null); // Simulate missing user

        await migrateFollowList();

        expect(console.warn).toHaveBeenCalledWith('Email user2@example.com not found for user user1@example.com');
    });
});
