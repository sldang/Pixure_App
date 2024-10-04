require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
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
    origin: process.env.FRONTEND_URL || 'https://pixure-app.onrender.com' // Add your actual frontend domain
  }));
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
        console.log(req.body);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nickname: req.body.nickname,
            email: req.body.email,
            zipcode: req.body.zipcode,
            password: req.body.password,
            friendsList: req.body.freindsList,
            followList: req.body.followList,
            karma: req.body.karma,
            communityIDs: req.body.communityIDs,
            posts: req.body.posts,
            age: req.body.age,
            searchTags: req.body.searchTags,
            postAndFlagsTags: req.body.postAndFlagsTags,
            profilePic: req.body.profilePic,
            parentAccount: req.body.parentAccount,
            parentAccountID: req.body.parentAccountID,
            childAccount: req.body.childAccount,
            childAccountID: req.body.childAccountID,


        })
        await User.create(newUser);
        res.json("data submitted")
    } catch {
        res.status(500).json({ error: "An error occured while fetching books" });
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