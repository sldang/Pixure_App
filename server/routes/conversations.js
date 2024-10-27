const express = require("express");
const Conversation = require('../models/Conversation');
const router = express.Router();

// new conv
router.use(cors({
    origin: process.env.FRONTEND_URL || 'https://pixure-app.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true // Enable sending cookies with requests if needed
}));

router.post("/", async (req, res) => {
    const { userEmail, otherEmail } = req.body;
    console.log(userEmail + otherEmail)
    const user = await User.findOne({ userEmail })
    const recipient = await User.findOne({ otherEmail })
    if (!user || !recipient) {
        console.log("Invalid credentials");
        return res.status(404).json({ message: "User not found" });
    } else {

        const senderId = user._id
        const recipientId = recipient._id
        const newConversation = new Conversation({
            members: [senderId, recipientId],
        });
        try {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

// get conv of a user
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;