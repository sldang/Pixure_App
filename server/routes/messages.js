const express = require("express");
const Message = require('../models/Message');
const router = express.Router();
const cors = require("cors");

//add messages
router.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true // Enable sending cookies with requests if needed
}));

router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);

    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err);
    }
});

//get messages
router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;