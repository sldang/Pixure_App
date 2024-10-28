const io = require("socket.io")(8900, {
    cors: {
        origin: "https://pixure-app.onrender.com",
        methods: ["GET", "POST"]
    }
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => users.find((user) => user.userId === userId);

// Listen for connections
io.on("connection", (socket) => {
    console.log("a user connected.");

    // Add user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    // Handle sending messages
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", { senderId, text });
        }
    });

    // Handle new post uploads
    socket.on("newPost", (post) => {
        console.log("New post received:", post);
        io.emit("postAdded", post);  // Broadcast new post to all users
    });

    // Handle disconnections
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});