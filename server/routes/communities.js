const express = require("express");
const router = express.Router();
const cors = require("cors");
const Community = require('../models/Community');
const User = require('../models/User');

//add messages
router.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true // Enable sending cookies with requests if needed
}));

router.post("/createCommunity", async (req, res) => {
    console.log("Create community request recieved");
    try {
        const { name, communityPosts, communityMembers, description, restriction, image } = req.body;
        if (!name) {
            return res.status(400).json({ error: "name is required" });
        }
        const newCommunity = new Community({
            name,
            communityPosts,
            communityMembers,
            description,
            restriction,
            image,

        });

        await newCommunity.save();
        res.status(201).json({ message: "Community created successfully" });
    } catch (error) {
        console.error("error creating community:", error);
        res.status(500).json({ error: "an error occured while creating community" })
    }
});

// API endpoint to get all communities
router.get("/", async (req, res) => {
    try {
        const data = await Community.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching communities:", error);
        res.status(500).json({ error: "An error occurred while fetching communities" });
    }
});

router.get('/communities/:community', async (req, res) => {
    const { community } = req.params;
    try {
        if (!community) {
            return res.status(400).json({ error: "Community name is required" });
        }
        const communities = await Community.find({
            name: community
        })
        res.status(200).json(communities);
    } catch (error) {
        console.error("Error fetching communities:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get('/myCommunities/:nickname', async (req, res) => {
    const { nickname } = req.params;

    try {
        if (!nickname) {
            return res.status(400).json({ error: "Nickname is required" });
        }

        const communities = await Community.find({ communityMembers: nickname });
        if (communities.length === 0) {
            return res.status(404).json({ message: "No communities found for this member" });
        }

        res.status(200).json(communities);
    } catch (error) {
        console.error("Error fetching communities:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/exclude/:nickname', async (req, res) => {
    const { nickname } = req.params;

    try {
        if (!nickname) {
            return res.status(400).json({ error: "Nickname is required" });
        }

        const communities = await Community.find({
            communityMembers: { $nin: [nickname] },
        });

        if (communities.length === 0) {
            return res.status(404).json({ message: "No communities found without this member" });
        }

        res.status(200).json(communities);
    } catch (error) {
        console.error("Error fetching communities:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/joinCommunity/:communityName/:userId', async (req, res) => {
    console.log("Join community request received");

    try {
        const { userId, communityName } = req.params;
        console.log("id", userId);
        console.log(communityName);

        const user = await User.findOne({ _id: userId });
        const community = await Community.findOne({ name: communityName });

        if (!user) {
            console.log("user not found");
            return res.status(404).json({ message: "user not found" });
        }

        // Check if the user to be followed exists
        if (!community) {
            console.log("community to follow not found");
            return res.status(404).json({ message: "community to follow not found" });
        }

        if (!user.communityIDs.includes(community._id)) {
            user.communityIDs.push(community._id);
            community.communityMembers.push(user.nickname);
            await user.save();
            await community.save();
            console.log("Successfully joined");
            return res.status(200).json({ message: "Joined community" });
        } else {
            console.log("Already in the community");
            return res.status(400).json({ message: "Already in the community" });

        }
    } catch (error) {
        console.log("Error joining community", error)
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;