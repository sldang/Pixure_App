const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const cors = require('cors');

// CORS middleware setup
router.use(
  cors({
    origin: process.env.FRONTEND_URL || 'https://pixure-app-3h6l.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Handle preflight requests (OPTIONS)
router.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://pixure-app-3h6l.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // No content
});

// Add new post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post(req.body); // Fixed redundancy
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Send JSON response with 201 status
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Error saving post' });
  }
});

// Get posts by postId
router.get('/:postId', async (req, res) => {
  try {
    const posts = await Post.find({ postId: req.params.postId });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

module.exports = router;