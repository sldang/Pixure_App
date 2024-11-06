const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();
const cors = require('cors');
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

    // Populate userId with nickname, firstName, and lastName
    const populatedPost = await savedPost.populate('userId', 'nickname firstName lastName');

    // Check for nickname or fallback to firstName/lastName if nickname is unavailable
    if (!populatedPost.userId) {
      console.error("User information could not be populated.");
      return res.status(500).json({ error: "User information could not be populated" });
    }

    console.log("Post saved with populated user:", populatedPost);

    // Send the populated post back in the response
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: "Error saving post" });
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