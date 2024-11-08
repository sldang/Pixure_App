const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    nickname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    zipcode: {
        type: String,
        required: false,
    },
    followerList: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    followList: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    karma: {
        type: String,
        required: false,
    },
    communityIDs: {
        type: String, // Assuming communityIDs as a single string; change to Array if it's multiple IDs
        required: false,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    age: {
        type: String,
        required: false,
    },
    searchTags: {
        type: String, // Change to Array if you expect multiple tags
        required: false,
    },
    postAndFlagsTags: {
        type: String, // Change to Array if you expect multiple tags
        required: false,
    },
    profilePic: {
        type: String,
        required: false,
    },
    parentAccount: {
        type: String,
        required: false,
    },
    parentAccountID: {
        type: Schema.Types.ObjectId, // Assuming this references another User
        ref: "User",
        required: false,
    },
    childAccount: {
        type: String,
        required: false,
    },
    childAccountID: {
        type: Schema.Types.ObjectId, // Assuming this references another User
        ref: "User",
        required: false,
    },
});

module.exports = mongoose.model("User", userSchema, "User");