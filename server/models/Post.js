const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    postId:
    {
      type: String
    },

    content: { type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema, 'Post');