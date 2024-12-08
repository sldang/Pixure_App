const mongoose = require("mongoose");
const Post = require("./Post");
const Schema = mongoose.Schema;

const communityPostSchema = new Schema({
    communityId: {
        type: String,
        required: false,
    },
    post: {
        type: Schema.Types.ObjectId, // Store the reference to a Post
        ref: 'Post', // Refers to the Post model
        required: false,
    },

});

module.exports = mongoose.model('Community Post', communityPostSchema,'Community Post')