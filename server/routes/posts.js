const express = require("express");
const Post = require('../models/Post'); 
const router = express.Router();

// Add new post
router.post("/", async (req, res) => {
    const newPost = new Post({
        content: req.body.content,  
        time: req.body.time,   
    });

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);  
    } catch (err) {
        res.status(500).json(err);
    }
});
// Get post by postId
router.get("/:postId", async (req, res) => {
    try {
        const posts = await Post.find({
            postId: req.params.postId,
        });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;