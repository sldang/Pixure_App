const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');

// CORS middleware setup
router.use(
  cors({
    origin: 'https://pixure-app-3h6l.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Set up memory storage for multer to handle image uploads in memory
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jfif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Combined route for creating a post, with or without an image
router.post('/', upload.single('img'), async (req, res) => {
  try {
    const userId = req.body.userId;

    // If there's an image, convert it to base64; otherwise, leave `imageData` empty
    let imageData = '';
    if (req.file) {
      const imageBuffer = req.file.buffer;
      imageData = `data:${req.file.mimetype};base64,${imageBuffer.toString('base64')}`;
    }

    // Create the post object with optional image data
    const newPost = new Post({
      userId: userId,
      desc: req.body.desc || '',
      imageData: imageData,
      likes: req.body.likes || [],
      community: req.body.community,    });

    // Save the post to the database
    const savedPost = await newPost.save();
    const populatedPost = await Post.findById(savedPost._id).populate('userId', 'nickname');

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Error saving post', details: error.message });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Ensure the user owns the post
    if (String(post.userId) === req.body.userId) { 
      await post.updateOne({ $set: { desc: req.body.desc } }); // Limit update fields to prevent accidental overwrites
      res.status(200).json({ message: "Post updated successfully." });
    } else {
      res.status(403).json({ error: "You may only update your own posts!" });
    }
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: "Error updating post", details: err.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Ensure the user owns the post
    if (String(post.userId) === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({ message: "Post deleted successfully." });
    } else {
      res.status(403).json({ error: "You may only delete your own posts!" });
    }
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: "Error deleting post", details: err.message });
  }
});

// Like/dislike posts
  router.put('/:id/like', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("Post liked!");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("Post disliked!");
      }
    } catch (err) {
      console.error('Error liking/disliking post: ', err);
      res.status(500).json(err);
    }
  });

// Get all posts of user with userId
router.get('/profile/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId })
      .populate('userId', 'nickname')  // Populate nickname for post userId
      .populate('comments.userId', 'nickname'); // Populate nickname for comments
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json(err);
  }
});

router.get('/community/:community', async (req, res) => {
  try {
    const posts = await Post.find({ community: req.params.community })
      .populate('userId', 'nickname')  // Populate nickname for post userId
      .populate('comments.userId', 'nickname'); // Populate nickname for comments
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json(err);
  }
});

// Get timeline posts
router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id })
      .populate('userId', 'nickname') // Populate nickname for post userId
      .populate('comments.userId', 'nickname'); // Populate nickname for comments
    const friendPosts = await Promise.all(
      currentUser.followList.map((friendId) => {
        return Post.find({ userId: friendId })
          .populate('userId', 'nickname') // Populate nickname for post userId
          .populate('comments.userId', 'nickname'); // Populate nickname for comments
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.error('Error fetching timeline: ', err);
    res.status(500).json(err);
  }
});

// Add a comment to a post
router.post('/:id/comments', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = { userId, content };
    post.comments.push(comment);
    await post.save();

    // Populate the new comment with the userId's nickname
    const newComment = post.comments[post.comments.length - 1];
    const populatedComment = await Post.populate(newComment, { path: 'userId', select: 'nickname' });

    res.status(201).json(populatedComment);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: "Error adding comment", details: err.message });
  }
});


// Get all comments for a post
router.get('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('comments.userId', 'nickname');
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json(post.comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: "Error fetching comments", details: err.message });
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: "Unhandled error", details: err.message });
});
router.delete('/:postId/comments/:commentId', async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId from the request body
    const { postId, commentId } = req.params;

    console.log("Request received - Post ID:", postId);
    console.log("Request received - Comment ID:", commentId);
    console.log("Request received - User ID:", userId);

    const post = await Post.findById(postId);
    if (!post) {
      console.error("Post not found");
      return res.status(404).json({ error: "Post not found" });
    }

    console.log("Post found:", post);

    // Check if the user is the post owner
    const isPostOwner = String(post.userId) === userId;

    // Find the comment index
    const commentIndex = post.comments.findIndex((comment) => String(comment._id) === commentId);
    if (commentIndex === -1) {
      console.error("Comment not found");
      return res.status(404).json({ error: "Comment not found" });
    }

    console.log("Comment found at index:", commentIndex);

    // Check if the user is the comment owner
    const isCommentOwner = String(post.comments[commentIndex].userId) === userId;

    // Allow deletion only if the user is the post owner or the comment owner
    if (isPostOwner || isCommentOwner) {
      post.comments.splice(commentIndex, 1); // Remove the comment from the array
      await post.save(); // Save the updated post
      return res.status(200).json({ message: "Comment deleted successfully." });
    }

    console.error("User not authorized to delete this comment");
    return res.status(403).json({ error: "You are not authorized to delete this comment." });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ error: "Error deleting comment", details: err.message });
  }
});

module.exports = router;
