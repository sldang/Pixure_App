const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    postId: {
        type: String,
    },
    content: {  
        type: String,
        required: true,  
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema, 'Post');