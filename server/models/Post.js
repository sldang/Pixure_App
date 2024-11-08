const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  desc: String,
  img: String,
  likes: { type: Array, default: [] },
}
{ timestamps: true });


module.exports = mongoose.model("Post", postSchema, 'Post');