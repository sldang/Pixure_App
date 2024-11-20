// const io = require("socket.io")(8900, {
//     cors: {
//         origin:process.env.FRONTEND_URL
//     }
// });

// let users = [];

// // function to map userId to socketId
// const addUser = (userId, socketId) => {
//     !users.some((user) => user.userId === userId) &&
//         users.push({ userId, socketId });
// }

// // function to remove a user upon disconnecting from socket server
// const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId)
// }

// // find user to send message to 
// const getUser = (userId) => {
//     return users.find((user) => user.userId === userId);
// }

// // 
// io.on("connection", (socket) => {
//     // user connects
//     console.log("a user connected.");

//     // take userId and socketId from user
//     socket.on("addUser", (userId) => {
//         addUser(userId, socket.id);
//         io.emit("getUsers", users);
//     });

//     // send and get message
//     socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//         const user = getUser(receiverId);
//         io.to(user.socketId).emit("getMessage", {
//             senderId, 
//             text
//         });
//     });
//   // Real-time new post event
//   socket.on('newPost', (post) => {
//     console.log('New post received:', post);
//     io.emit('postAdded', post); // Emit to all users
//   });
//     // user disconnects
//     socket.on("disconnect", () => {
//         console.log("a user disconnected!");
//         removeUser(socket.id);
//         io.emit("getUsers", users);
//     });
// });
// console.log('Socket.IO server running on port 8900');

const io = require("socket.io")(8900, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
});

let users = [];

// function to map userId to socketId
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
}

// function to remove a user upon disconnecting from socket server
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

// find user to send message to  
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

// Export these functions for testing
module.exports = {
    addUser,
    removeUser,
    getUser
};

io.on("connection", (socket) => {
    // ... rest of your existing socket logic
});

console.log('Socket.IO server running on port 8900');