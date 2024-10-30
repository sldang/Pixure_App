const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const cors = require('cors');
router.options('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://pixure-app-3h6l.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.sendStatus(204); // No content
});

//add messages
router.use(cors({
  origin: process.env.FRONTEND_URL || 'https://pixure-app-3h6l.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Enable sending cookies with requests if needed
}));

// Add new post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
  
   
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error saving post' });
  }
});

// Get all posts
router.get('/:postId', async (req, res) => {
  try {
    const posts = await Post.find({ postId: req.params.postId});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

module.exports = router;