
require('dotenv').config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const jwt = require('jsonwebtoken');
//const bcrypt = require("bcryptjs");
const Post = require('./models/Post');
const Community = require('./models/Community');
const CommunityReport = require('./models/CommunityReport');    
const CommunityPostComment = require('./models/CommunityPostComment');
const FlagsProfile = require('./models/FlagsProfile');
const CommunityPost = require('./models/CommunityPost');
const LocalCommunityAccount = require('./models/LocalCommunityAccount');
const PostComment = require('./models/PostComment');
const PostReport = require('./models/PostReport');
const SearchTagsAndFlags = require('./models/SearchTagsAndFlags');
const TagsProfile = require('./models/TagsProfile');
const User = require('./models/User');
const Conversation = require('./models/Conversation')
const Message = require('./models/Message');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');
const usersRoute = require('./routes/users');



const app = express();
const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();

// CORS setup
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API endpoint to get all posts
app.get("/api/Post", async (req, res) => {
    try {
        const data = await Post.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "An error occurred while fetching posts" });
    }
});

// API endpoint to get all communities
app.get("/api/Community", async (req, res) => {
    try {
        const data = await Community.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching communities:", error);
        res.status(500).json({ error: "An error occurred while fetching communities" });
    }
});

// API endpoint to get all community reports
app.get("/api/CommunityReport", async (req, res) => {
    try {
        const data = await CommunityReport.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching community reports:", error);
        res.status(500).json({ error: "An error occurred while fetching community reports" });
    }
});

// API endpoint to get all flags profiles
app.get("/api/FlagsProfile", async (req, res) => {
    try {
        const data = await FlagsProfile.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching flags profiles:", error);
        res.status(500).json({ error: "An error occurred while fetching flags profiles" });
    }
});

// API endpoint to get all community post comments
app.get("/api/CommunityPostComment", async (req, res) => {
    try {
        const data = await CommunityPostComment.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching community post comments:", error);
        res.status(500).json({ error: "An error occurred while fetching community post comments" });
    }
});

// API endpoint to get all community posts
app.get("/api/CommunityPost", async (req, res) => {
    try {
        const data = await CommunityPost.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching community posts:", error);
        res.status(500).json({ error: "An error occurred while fetching community posts" });
    }
});

// API endpoint to get all local community accounts
app.get("/api/LocalCommunityAccount", async (req, res) => {
    try {
        const data = await LocalCommunityAccount.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching local community accounts:", error);
        res.status(500).json({ error: "An error occurred while fetching local community accounts" });
    }
});

// API endpoint to get all post comments
app.get("/api/PostComment", async (req, res) => {
    try {
        const data = await PostComment.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching post comments:", error);
        res.status(500).json({ error: "An error occurred while fetching post comments" });
    }
});

// API endpoint to get all post reports
app.get("/api/PostReport", async (req, res) => {
    try {
        const data = await PostReport.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching post reports:", error);
        res.status(500).json({ error: "An error occurred while fetching post reports" });
    }
});

// API endpoint to get all search tags and flags
app.get("/api/SearchTagsAndFlags", async (req, res) => {
    try {
        const data = await SearchTagsAndFlags.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching search tags and flags:", error);
        res.status(500).json({ error: "An error occurred while fetching search tags and flags" });
    }
});

// API endpoint to get all tags profiles
app.get("/api/TagsProfile", async (req, res) => {
    try {
        const data = await TagsProfile.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching tags profiles:", error);
        res.status(500).json({ error: "An error occurred while fetching tags profiles" });
    }
});

// API endpoint to get all users
app.get("/api/User", async (req, res) => {
    try {
        const data = await User.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});

// API endpoint to create a new user
app.post("/api/User", async (req, res) => {
    try {
        const {
            firstName, lastName, nickname, email, zipcode, password,
            friendsList, followList, karma, communityIDs, posts, age,
            searchTags, postAndFlagsTags, profilePic, parentAccount, 
            parentAccountID, childAccount, childAccountID
        } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Hash the password before saving
        //const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = password;

        // Create a new user object
        const newUser = new User({
            firstName,
            lastName,
            nickname,
            email,
            zipcode,
            password: hashedPassword, 
            friendsList,
            followList,
            karma,
            communityIDs,
            posts,
            age,
            searchTags,
            postAndFlagsTags,
            profilePic,
            parentAccount,
            parentAccountID,
            childAccount,
            childAccountID
        });

        // Save the new user to the database
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
        console.log("hope")
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
});

app.get("/api/login", async(req, res) => {
    res.json("bruh")
})

// Login endpoint
app.post("/api/login", async (req, res) => {
    console.log("Login request received:", req.body); // Log incoming request data
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ error: "User not found" });
        }

        // Compare the password
        //const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = password === user.password;
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token
        if(isMatch){
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user: { id: user._id, email: user.email, nickname: user.nickname } });
        }
        // Send the response with token
        
    } catch (error) {
        console.error("Error during login:", error); // Log the error
        res.status(500).json({ error: "An error occurred during login" });
    }
});

app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", usersRoute)

// Simple endpoint to check if server is running
app.get("/", (req, res) => {
    res.json("Hello, server is running!");
});

// Catch-all route for undefined endpoints
app.get("*", (req, res) => {
    res.sendStatus(404);
});

// Start the server
app.listen(PORT, () => {
    console.log('SERVER IS RUNNING');
})