const User = require("../models/User");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const Post = require('../models/Post');
const express = require('express');
const mongoose = require("mongoose");
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
router.post("/by-email", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's ID and other necessary data
    res.status(200).json({ _id: user._id, nickname: user.nickname });
  } catch (err) {
    console.error("Error fetching user by email:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Get posts of all followed users
router.get("/users/followed-posts/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followEmails = user.followList || [];
    console.log("Followed Emails:", followEmails);

    // Find userIds for all emails in the followList
    const followedUsers = await User.find({ email: { $in: followEmails } }, "_id email");
    const followedUserIds = followedUsers.map((user) => user._id);
    console.log("Followed User IDs:", followedUserIds);

    // Fetch posts for each followed userId
    const posts = await Promise.all(
      followedUserIds.map((id) =>
        Post.find({ userId: id })
          .populate("userId", "nickname")
          .populate("comments.userId", "nickname")
      )
    );

    // Flatten and sort all posts by creation date
    const allPosts = posts.flat().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    console.log("Total Posts Fetched:", allPosts.length);

    res.status(200).json(allPosts);
  } catch (err) {
    console.error("Error fetching posts of followed users:", err);
    res.status(500).json({ error: "Error fetching posts of followed users", details: err.message });
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
//get profile info
router.get("/profile/:id", async (req, res) => {
  const idOrEmail = req.params.id; // Get the ID or email from the request
  console.log("Request received for profile:", idOrEmail);

  try {
    let user;

    // Check if the value is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(idOrEmail)) {
      user = await User.findById(idOrEmail); // Query by ObjectId
    } else {
      user = await User.findOne({ email: idOrEmail }); // Query by email
    }

    if (!user) {
      console.error("No user found for ID or email:", idOrEmail);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found:", user);

    const followers = await User.find({ _id: { $in: user.followerList } }, "_id nickname");
    const followings = await User.find({ _id: { $in: user.followList } }, "_id nickname");

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

router.put("/follow", async (req, res) => {
  const { followerEmail, followeeEmail } = req.body;

  if (followerEmail === followeeEmail) {
    return res.status(403).json("You cannot follow yourself");
  }

  try {
    // Convert emails to user IDs
    const follower = await User.findOne({ email: followerEmail });
    const followee = await User.findOne({ email: followeeEmail });

    if (!follower || !followee) {
      return res.status(404).json("User not found");
    }

    const followerId = follower._id;
    const followeeId = followee._id;

    // Check if already following
    if (!followee.followers.includes(followerId)) {
      // Add follower ID to followee's followers list
      await followee.updateOne({ $addToSet: { followers: followerId } });

      // Add followee email to follower's followList
      await follower.updateOne({ $addToSet: { followList: followeeEmail } });

      return res.status(200).json("User has been followed");
    } else {
      return res.status(409).json("You already follow this user");
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