require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const bcrypt = require("bcrypt");
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
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://pixure-app.onrender.com'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//1
app.get("/api/Post", async (req, res) => {
    try {
        const data = await Post.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

//2
app.get("/api/Community", async (req, res) => {
    try {
        const data = await Community.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

//3
app.get("/api/CommunityReport", async (req, res) => {
    try {
        const data = await CommunityReport.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

//4
app.get("/api/FlagsProfile", async (req, res) => {
    try {
        const data = await Post.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

//5
app.get("/api/CommunityPostComment", async (req, res) => {
    try {
        const data = await CommunityPostComment.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

//6
app.get("/api/CommunityPost", async (req, res) => {
    try {
        const data = await CommunityPost.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

//7
app.get("/api/LocalCommunityAccount", async (req, res) => {
    try {
        const data = await LocalCommunityAccount.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

//8
app.get("/api/PostComment", async (req, res) => {
    try {
        const data = await PostComment.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

//9
app.get("/api/PostReport", async (req, res) => {
    try {
        const data = await PostReport.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

//10
app.get("/api/SearchTagsAndFlags", async (req, res) => {
    try {
        const data = await SearchTagsAndFlags.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

//11
app.get("/api/TagsProfile", async (req, res) => {
    try {
        const data = await TagsProfile.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

//12
app.get("/api/User", async (req, res) => {
    try {
        const data = await User.find({});
        res.json(data);
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
    }
});

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
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({
            firstName,
            lastName,
            nickname,
            email,
            zipcode,
            password: hashedPassword, // Save hashed password
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
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
});


app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the response with token
        res.json({ token, user: { id: user._id, email: user.email, nickname: user.nickname } });
    } catch (error) {
        res.status(500).json({ error: "An error occurred during login" });
    }
});




app.get("/", (req, res) => {
    res.json("hello");

});

app.get("*", (req, res) => {
    res.sendStatus("404");
})

app.listen(PORT, () => {
    console.log('server is running');
})