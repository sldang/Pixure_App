const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    nickname: { 
        type: String,
        unique: true,

    },
    email: {
        type: String,
        required: true, // Enforce email requirement
        unique: true, // Ensure uniqueness
    },
    password: { type: String, required: true },
    zipcode: { type: String },
    followerList: { type: [String], default: [] }, // Enforce email strings if storing emails
    followList: { type: [String], default: [] },  // Same as above
    karma: { type: String },
    communityIDs: { type: [String], default: [] }, // Use array if applicable
    posts: { type: [String], default: [] },        // Use array if applicable
    age: { type: String },
    searchTags: { type: [String], default: [] },
    postAndFlagsTags: { type: [String], default: [] },
    profilePicture: {
        type: String,
        default: 'https://via.placeholder.com/150', // Default profile picture
    },

    parentAccount: { type: String, default: '' },
    parentAccountID: { type: String },
    childAccount: { type: String },
    childAccountID: { type: String },

});

module.exports = mongoose.model("User", userSchema, "User");
