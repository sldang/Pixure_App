const mongoose = require("mongoose");

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  desc: String,
  img: String,
  imageData: String,
  likes: { type: Array, default: [] },
  comments: [commentSchema], // Nested comments schema
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema, 'Post');