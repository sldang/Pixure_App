const express = require("express");
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const router = express.Router();
const cors = require("cors");


// router.post("/", async (req, res) => {
//     const { userEmail, otherEmail } = req.body;
//     console.log("User Email:", userEmail);
//     console.log("Other Email:", otherEmail);
//     const user = await User.findOne({ email: userEmail })
//     const recipient = await User.findOne({ email: otherEmail })
//     console.log("User Email:", user.email);
//     console.log("Other Email:", recipient.email);
//     if (!user || !recipient) {
//         console.log("Invalid credentials");
//         return res.status(404).json({ message: "User not found" });
//     } else {

//         const senderId = user._id
//         const recipientId = recipient._id
//         const newConversation = new Conversation({
//             members: [senderId, recipientId],
//         });
//         try {
//             const savedConversation = await newConversation.save();
//             res.status(200).json(savedConversation);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     }
// });

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch(err){
        res.status(500).json(err);
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