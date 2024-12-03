const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path based on your project structure

async function migrateFollowList() {
    try {
        await mongoose.connect('your_mongo_connection_string', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
        const users = await User.find();
        for (const user of users) {
            const updatedFollowList = [];
            for (const email of user.followList) {
                const followedUser = await User.findOne({ email });
                if (followedUser) {
                    updatedFollowList.push(followedUser._id);
                }
            }
            user.followList = updatedFollowList;
            await user.save();
        }
        console.log('Migration complete!');
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        mongoose.connection.close();
    }
}

migrateFollowList().catch(console.error);
