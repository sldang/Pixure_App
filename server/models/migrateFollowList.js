const mongoose = require('mongoose');
const User = require('./User'); // Adjust the path based on your project structure

async function migrateFollowList() {
    try {
        const connectionString = 'mongodb+srv://makdzer:PleaseWork1@firstweb.rj7jx.mongodb.net/esentia';
        if (!connectionString) {
            throw new Error('MongoDB connection string is not defined.');
        }

        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB');

        const users = await User.find();
        console.log(`Found ${users.length} users.`);

        for (const user of users) {
            console.log(`Processing user: ${user.email}`);

            // Initialize followList as an array if it's not defined
            if (!Array.isArray(user.followList)) {
                user.followList = [];
            }

            // Skip if already converted to ObjectId
            if (user.followList.every(item => mongoose.Types.ObjectId.isValid(item))) {
                console.log(`User ${user.email} already has ObjectId followList. Skipping...`);
                continue;
            }

            const updatedFollowList = [];
            for (const email of user.followList) {
                const followedUser = await User.findOne({ email });
                if (followedUser) {
                    updatedFollowList.push(followedUser._id);
                } else {
                    console.warn(`Email ${email} not found for user ${user.email}`);
                }
            }

            user.followList = updatedFollowList;
            await user.save();
            console.log(`Updated followList for user: ${user.email}`);
        }

        console.log('Migration complete!');
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        await mongoose.connection.close(); // Properly close connection
        console.log('MongoDB connection closed.');
    }
}

migrateFollowList().catch(console.error);
