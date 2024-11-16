// const User = require("../models/User");
// const router = require("express").Router();
// const bcryptjs = require("bcryptjs");
// const cors = require('cors');
// const jwt = require("jsonwebtoken");

// // CORS middleware setup
// router.use(
//   cors({
//     origin: 'https://pixure-app-3h6l.onrender.com' ,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   })
// );

// //update user
// router.put("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     if (req.body.password) {
//       try {
//         const salt = await bcryptjs.genSalt(10);
//         req.body.password = await bcryptjs.hash(req.body.password, salt);
//       } catch (err) {
//         return res.status(500).json(err);
//       }
//     }
//     try {
//       const user = await User.findByIdAndUpdate(req.params.id, {
//         $set: req.body,
//       });
//       res.status(200).json("Account has been updated");
//     } catch (err) {
//       return res.status(500).json(err);
//     }
//   } else {
//     return res.status(403).json("You can update only your account!");
//   }
// });

// //delete user
// router.delete("/:id", async (req, res) => {
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     try {
//       await User.findByIdAndDelete(req.params.id);
//       res.status(200).json("Account has been deleted");
//     } catch (err) {
//       return res.status(500).json(err);
//     }
//   } else {
//     return res.status(403).json("You can delete only your account!");
//   }
// });

// // Get a user profile with nickname and follower/following counts
// router.get("/profile/:userId", async (req, res) => {
//   const userId = req.params.userId; // Get userId from the request parameters

//   try {
//     // Find the user by ID and populate the followerList and followList
//     const user = await User.findById(userId)
//       .populate('followerList', '_id')  // Only retrieve _id for count
//       .populate('followList', '_id');    // Only retrieve _id for count

//     if (!user) {
//       return res.status(404).json("User not found");
//     }

//     // Directly access the nickname from the user object
//     const nickname = user.nickname; // Assuming nickname is stored directly in the user document

//     // Create the profile data response
//     const profileData = {
//       nickname: nickname || "Unknown User",  // Use nickname as the display name
//       postsCount: user.posts ? user.posts.length : 0,  // Count of posts
//       followersCount: user.followerList.length,  // Count of followers
//       followingCount: user.followList.length,     // Count of followings
//     };

//     res.status(200).json(profileData);
//   } catch (err) {
//     console.error("Error fetching user profile:", err);
//     res.status(500).json("An error occurred while fetching user profile");
//   }
// });

// module.exports = router;
// //get friends
// router.get("/friends/:userId", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     const friends = await Promise.all(
//       user.followings.map((friendId) => {
//         return User.findById(friendId);
//       })
//     );
//     let friendList = [];
//     friends.map((friend) => {
//       const { _id, username, profilePicture } = friend;
//       friendList.push({ _id, username, profilePicture });
//     });
//     res.status(200).json(friendList)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Follow a user by email
// router.put("/follow", async (req, res) => {
//   const { email, followEmail } = req.body;

//   if (email === followEmail) {
//     return res.status(403).json("You cannot follow yourself");
//   }

//   try {
//     // Find the target user (to be followed) and the current user by email
//     const user = await User.findOne({ email: followEmail });
//     const currentUser = await User.findOne({ email: email });

//     // Check if users exist
//     if (!user || !currentUser) {
//       return res.status(404).json("User not found");
//     }

//     // Check if already following
//     if (!user.followers.includes(currentUser._id)) {
//       await user.updateOne({ $push: { followers: currentUser._id } });
//       await currentUser.updateOne({ $push: { followings: user._id } });
//       res.status(200).json("User has been followed");
//     } else {
//       res.status(409).json("You already follow this user");
//     }
//   } catch (err) {
//     console.error("Error following user:", err);
//     res.status(500).json("An error occurred while trying to follow the user");
//   }
// });

// //unfollow a user

// router.put("/:id/unfollow", async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       const currentUser = await User.findById(req.body.userId);
//       if (user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $pull: { followers: req.body.userId } });
//         await currentUser.updateOne({ $pull: { followings: req.params.id } });
//         res.status(200).json("user has been unfollowed");
//       } else {
//         res.status(403).json("you dont follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("you cant unfollow yourself");
//   }
// });

// //user login
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     const validPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });

//     // Generate JWT token (if using JWT authentication)
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     // Choose a name to send in the response
//     const fullName = `${user.firstName} ${user.lastName}`; // Concatenate if you want full name
//     const responseName = user.nickname || fullName; // Use nickname if available, otherwise use full name

//     // Send response with token, _id, and name
//     res.status(200).json({ 
//       token,  // Only include if using JWT
//       userId: user._id,  // Use userId to be consistent with frontend
//       name: responseName // Use nickname or full name based on your display preferences
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;