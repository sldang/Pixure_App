const User = require("../models/User");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const Post = require('../models/Post');
const express = require('express');
// CORS middleware setup
router.use(
  cors({
    origin: 'https://pixure-app-3h6l.onrender.com' ,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// memory storage for multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jfif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
});
router.get("/users/following/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("User ID received in request:", userId);

  try {
    // Find the logged-in user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.error("No user found for ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", user);

    const followIds = user.followList || [];
    console.log("Follow list (user IDs):", followIds);

    // Fetch posts from users in the follow list
    const posts = await Post.find({ userId: { $in: followIds } })
      .populate("userId", "nickname profilePicture")
      .sort({ createdAt: -1 });

    console.log("Posts fetched:", posts.length);
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts from following:", err);
    res.status(500).json({ error: "Error fetching posts from following", details: err.message });
  }
});

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcryptjs.genSalt(10);
        req.body.password = await bcryptjs.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});
router.get("/profile/:id", async (req, res) => {
  const userId = req.params.id; // Get userId from route parameters
  console.log("Request received for profile:", userId);

  try {
    const user = await User.findById(userId); // Find user by ID
    if (!user) {
      console.error("No user found for ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", user);

    const followers = await User.find({ _id: { $in: user.followerList } }, "_id nickname");
    const followings = await User.find({ _id: { $in: user.followList } }, "_id nickname");
    console.log("Followers count:", followers.length);
    console.log("Following count:", followings.length);

    res.status(200).json({
      nickname: user.nickname || "Unknown User",
      followersCount: followers.length,
      followingCount: followings.length,
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Error fetching user profile", details: err.message });
  }
});
module.exports = router;
//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Follow a user by email
router.put("/follow", async (req, res) => {
  const { followerEmail, followeeEmail } = req.body;

  if (followerEmail === followeeEmail) {
    return res.status(403).json("You cannot follow yourself");
  }

  try {
    // Find the user to be followed (followee) and the current user (follower) by email
    const followee = await User.findOne({ email: followeeEmail });
    const follower = await User.findOne({ email: followerEmail });

    if (!followee || !follower) {
      return res.status(404).json("User not found");
    }

    const followeeId = followee._id;
    const followerId = follower._id;

    // Check if the follower is already following the followee
    if (!followee.followers.includes(followerId)) {
      // Add the follower to the followee's followers list
      await followee.updateOne({ $addToSet: { followers: followerId } });

      // Add the followee to the follower's followList
      await follower.updateOne({ $addToSet: { followList: followeeId } });

      res.status(200).json("User has been followed");
    } else {
      res.status(409).json("You already follow this user");
    }
  } catch (err) {
    console.error("Error following user:", err);
    res.status(500).json("An error occurred while trying to follow the user");
  }
});


router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followList: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You don't follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT token (if using JWT authentication)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Choose a name to send in the response
    const fullName = `${user.firstName} ${user.lastName}`; // Concatenate if you want full name
    const responseName = user.nickname || fullName; // Use nickname if available, otherwise use full name

    // Send response with token, _id, and name
    res.status(200).json({ 
      token,  // Only include if using JWT
      userId: user._id,  // Use userId to be consistent with frontend
      name: responseName // Use nickname or full name based on your display preferences
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// update user profile picture
router.post('/:id/upload', upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.params.id;

    console.log("File received:", req.file);
    console.log("User ID:", userId);

    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const profilePicture = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: profilePicture },
      { new: true }
    );

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Updated user:", user);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      message: "Profile picture uploaded successfully",
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    console.error("Error uploading profile picture", err);
    res.status(500).json({ error: "Error uploading profile picture", details: err.message });
  }
});

router.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`Response: ${res.statusCode}, Content-Type: ${res.get('Content-Type')}`);
  });
  //console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
});

module.exports = router;