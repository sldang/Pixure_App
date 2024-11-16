
// server/models/Post.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  desc: String,
  img: String,
  imageData: String,
  likes: { type: Array, default: [] },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
