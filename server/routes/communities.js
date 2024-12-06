const express = require("express");
const router = express.Router();
const cors = require("cors");

//add messages
router.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true // Enable sending cookies with requests if needed
}));

router.post("/createCommunity", async (req, res) => {
    console.log("Create community request recieved");
    try{
        const{ name, communityPosts, communityMembers,  } = req.body;
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
        res.status(201).json({message: "Community created successfully"});
    } catch(error){
        console.error("error creating community:", error);
        res.status(500).json({error:"an error occured while creating community"})
    }
});

router.post("/followCommunity", async (req, res) => {
    console.log("Follow request received");
    try {
        const { email, communityName } = req.body; // The email of the user making the follow request and the email to follow
        console.log("Email:", email);
        console.log("Follow Email:", communityName);

        const follower = await User.findOne({ email });
        const community = await Community.findOne({  name: communityName }); // Ensure you're querying by email field

        // Check if the follower exists
        if (!follower) {
            console.log("Follower not found");
            return res.status(404).json({ message: "Follower not found" });
        }

        // Check if the user to be followed exists
        if (!community) {
            console.log("community to follow not found");
            return res.status(404).json({ message: "community to follow not found" });
        }

        // Check if the followEmail is already in the followList to avoid duplicates
        if (!follower.communityID.includes(community._id)) {
            follower.communityID.push(community._id);
            community.communityMembers.push(email); // Adding the current user's email to the followed user's followerList
            await follower.save(); // Save changes to the follower
            await community.save(); // Save changes to the followed user
            console.log("Email added to follow list");
            return res.status(200).json({ message: "Followed successfully" });
        } else {
            console.log("Already following this community");
            return res.status(400).json({ message: "Already following this community" });
        }
    } catch (error) {
        console.error("Error while following:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});