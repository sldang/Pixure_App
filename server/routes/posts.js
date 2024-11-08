const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');

// CORS middleware setup
router.use(
  cors({
    origin: 'https://pixure-app-3h6l.onrender.com' ,
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
    });

    // Save the post to the database
    const savedPost = await newPost.save();
    const populatedPost = await Post.findById(savedPost._id).populate('userId', 'nickname');

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Error saving post', details: error.message });
  }
});

module.exports = router;
// Handle preflight requests (OPTIONS)
router.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https:pixure-app-3h6l.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // No content
});


// update a post
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

// delete a post
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

// like/dislike posts
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)) {
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
})

// Get all posts of user with userId
router.get('/profile/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).populate('userId', 'nickname'); // Populate nickname
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
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followList.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.error('Error fetching timeline: ', err);
    res.status(500).json(err);
  }
})

// Get all posts of user with userid
router.get('/profile/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).populate('userId', 'username profilePicture'); // Only pull specific fields
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json(err);
  }
});
// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: "Unhandled error", details: err.message });
});
module.exports = router;