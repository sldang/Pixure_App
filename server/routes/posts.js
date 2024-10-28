const express = require("express");
const Post = require('../models/Post'); 
const router = express.Router();
const io = require('../index').io;  // Access Socket.IO instance

// Add a new post
router.post("/", async (req, res) => {
    const newPost = new Post({
        content: req.body.content,
        time: req.body.time,
    });

    try {
        const savedPost = await newPost.save();
        console.log('Saved Post:', savedPost); // Log saved post for debugging
        io.emit("postAdded", savedPost);  // Emit event to all clients
        res.status(200).json(savedPost);  // Send response to the client
    } catch (err) {
        console.error('Error saving post:', err);
        res.status(500).json(err);
    }
});

// Get post by postId
router.get("/:postId", async (req, res) => {
    try {
        const posts = await Post.find({ postId: req.params.postId });
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).json(err);
    }
});

module.exports = router;