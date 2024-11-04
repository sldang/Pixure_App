const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  desc: String,
  img: String,
  likes: { type: Array, default: [] },
});


module.exports = mongoose.model("Post", PostSchema, 'Post');