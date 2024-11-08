const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middleware/verifyToken'); // Import the middleware
// CORS middleware setup
router.use(
  cors({
    origin: 'https://pixure-app-3h6l.onrender.com' ,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Add new post with image upload
router.post('/', upload.single('img'), async (req, res) => {
  try {
      console.log("Received data:", req.body); // Log received data
      console.log("File data:", req.file); // Log uploaded file data

      const userId = req.body.userId;
      console.log("UserId:", userId);

      const newPost = new Post({
          userId: userId,
          desc: req.body.desc || "", // Default to empty string if not provided
          img: req.file ? `/uploads/${req.file.filename}` : "", // Store path to uploaded image
          likes: req.body.likes || [], // Default to empty array if not provided
      });

      console.log("New Post object:", newPost); // Log new post object

      const savedPost = await newPost.save();
      console.log("Saved Post:", savedPost); // Log saved post object

      const populatedPost = await Post.findById(savedPost._id).populate('userId', 'nickname');
      console.log("Populated Post:", populatedPost); // Log populated post

      res.status(201).json(populatedPost);
  } catch (error) {
      console.error('Error saving post with image:', error); // Log detailed error stack
      res.status(500).json({ error: "Error saving post with image", details: error.message });
  }
});
// Handle preflight requests (OPTIONS)
router.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https:pixure-app-3h6l.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // No content
});

// Add new post
router.post('/', async (req, res) => {
  console.log("Received data:", req.body);

  const userId = req.body.userId;

  const newPost = new Post({
    userId: userId,
    desc: req.body.desc,
    img: req.body.img || "",
    likes: req.body.likes || [],
  });

  try {
    // Save the new post
    const savedPost = await newPost.save();

    // Populate the userId field to include only the nickname
    const populatedPost = await Post.findById(savedPost._id).populate('userId', 'nickname');

    console.log("Post saved with populated user:", populatedPost);
    
    // Send the populated post back in the response
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('Error saving or populating post:', error);
    res.status(500).json({ error: "Error saving or populating post", details: error.message });
  }
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

module.exports = router;