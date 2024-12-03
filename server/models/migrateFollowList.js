require('dotenv').config(); // Ensure environment variables are loaded
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path based on your project structure

async function migrateFollowList() {
    try {
        const connectionString = process.env.MONGODB_URI; // Use MONGODB_URI
        if (!connectionString) {
            throw new Error('MONGODB_URI is not defined in the environment variables.');
        }

        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
        const users = await User.find();
        console.log(`Found ${users.length} users.`);

        for (const user of users) {
            console.log(`Processing user: ${user.email}`);

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
        mongoose.connection.close(() => {
            console.log('MongoDB connection closed.');
        });
    }
}

migrateFollowList().catch(console.error);
