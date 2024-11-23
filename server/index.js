require('dotenv').config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const jwt = require('jsonwebtoken');
const path = require('path');
const bcryptjs = require("bcryptjs");
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
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const postRoute = require('./routes/posts');
app.use('/api/posts', postRoute);
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Connect to the database
connectDB();

// CORS setup
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true // Enable sending cookies with requests if needed
}));

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));

// Simple endpoint to check if server is running
app.get("/", (req, res) => {
    res.json("Hello, server is running!");
});

// API routes
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/conversations", require("./routes/conversations"));

// Serve react static files
app.use(express.static(path.join(__dirname, "client/build")));

// Catch-all route for undefined endpoints
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
   
    console.log(`Server running on port ${PORT}`);
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

app.options('*', cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

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

app.get("/api/Post", async (req, res) => {
    try {
        const data = await Post.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching community reports:", error);
        res.status(500).json({ error: "An error occurred while fetching community reports" });
    }
})

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
            followerList, followList, karma, communityIDs, posts, age,
            searchTags, postAndFlagsTags, profilePic, parentAccount,
            parentAccountID, childAccount, childAccountID, bio
        } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Hash the password before saving
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user object
        const newUser = new User({
            firstName,
            lastName,
            nickname,
            email,
            zipcode,
            password: hashedPassword,
            followerList,
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
            childAccountID,
            bio,
        });

        // Save the new user to the database
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
});

app.get("/api/login", async (req, res) => {
    res.json("test")
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
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token
        if (isMatch) {
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user: { id: user._id, email: user.email, nickname: user.nickname } });
        }
        // Send the response with token

    } catch (error) {
        console.error("Error during login:", error); // Log the error
        res.status(500).json({ error: "An error occurred during login" });
    }
});


app.post("/api/follow", async (req, res) => {
    console.log("Follow request received");
    try {
        const { email, followEmail } = req.body; // The email of the user making the follow request and the email to follow
        console.log("Email:", email);
        console.log("Follow Email:", followEmail);

        const follower = await User.findOne({ email });
        const followed = await User.findOne({ email: followEmail }); // Ensure you're querying by email field

        // Check if the follower exists
        if (!follower) {
            console.log("Follower not found");
            return res.status(404).json({ message: "Follower not found" });
        }

        // Check if the user to be followed exists
        if (!followed) {
            console.log("User to follow not found");
            return res.status(404).json({ message: "User to follow not found" });
        }

        // Check if the followEmail is already in the followList to avoid duplicates
        if (!follower.followList.includes(followEmail)) {
            follower.followList.push(followEmail);
            followed.followerList.push(email); // Adding the current user's email to the followed user's followerList
            await follower.save(); // Save changes to the follower
            await followed.save(); // Save changes to the followed user
            console.log("Email added to follow list");
            return res.status(200).json({ message: "Followed successfully" });
        } else {
            console.log("Already following this user");
            return res.status(400).json({ message: "Already following this user" });
        }
    } catch (error) {
        console.error("Error while following:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// In your user routes file
app.get('/api/getUserByEmail', async (req, res) => {
    const email = req.query.email;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ username: user.nickname });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/api/getUserFollowers', async (req,res) => {
    const {email} = req.query;
    try{
        const user = await User.findOne({email})
        if (!user) return res.status(404).json({ message: 'User not found' })
        res.status(200).json({ followList: user.followList });
    }catch (err){
        res.status(500).json(err)
    }
});

app.get('/api/user/:userEmail/follow-stats', async (req, res) => {
    try {
        // Get user ID from request parameters
        const { userEmail } = req.params;
        
        // Find the user by ID
        const user = await User.findOne({ email: userEmail });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Get the count of followers and followed
        const followersCount = user.followerList.length;
        const followedCount = user.followList.length;

        // Respond with the counts
        res.status(200).json({
            followersCount,
            followedCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

require('dotenv').config();
const http = require('http'); // Import HTTP module

const server = http.createServer(app); // Create HTTP server

const getUser = (userId) => users.find((user) => user.userId === userId);
