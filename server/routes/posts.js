const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Add new post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post({
      content: req.body.content,
      time: req.body.time,
    });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error saving post' });
  }
});

// Get all posts
router.get('/:postId', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

module.exports = router;