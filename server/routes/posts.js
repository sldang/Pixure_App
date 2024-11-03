const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();
const cors = require('cors');

// CORS middleware setup
router.use(
  cors({
    origin: process.env.FRONTEND_URL ,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Handle preflight requests (OPTIONS)
router.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // No content
});

// Add new post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Send JSON response with 201 status
  } catch (error) {
    console.error('Error saving post:', err);
    res.status(500).json(err);
  }
});

// update a post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.userId == req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated.");
    } else {
      res.status(403).json("You may only update your own posts!");
    }
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json(err);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(post.userId == req.body.userId){
      await post.deleteOne();
      res.status(200).json('Post deleted.');
    } else {
      res.status(403).json("You may only delete your own posts!");
    }
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json(err);
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

// Get a post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.error('Error finding post: ', err);
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

// Get all posts of a user
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching user posts: ', err);
    res.status(500).json(err);
  }
});

module.exports = router;