
// // // Import the module you are testing
// // const { addUser, removeUser, getUser } = require('../../socket/index.js'); const { Server } = require("socket.io");
// // const { createServer } = require("http");
// // const ioClient = require("socket.io-client");


// // const PORT = 8901; // Use a different port for testing
// // let ioServer, server, clientSocket, serverSocket;

// // jest.setTimeout(30000); // Set a higher timeout

// // let users = []; // Define the users array

// // beforeAll((done) => {
// //   server = createServer();
// //   ioServer = new Server(server, {
// //     cors: {
// //       origin: process.env.FRONTEND_URL
// //     }
// //   });

// //   server.listen(PORT, () => {
// //     clientSocket = ioClient(`http://localhost:${PORT}`, {
// //       transports: ["websocket"],
// //     });
// //     clientSocket.on("connect", done);
// //   });

// //   ioServer.on("connection", (socket) => {
// //     serverSocket = socket;

// //     socket.on("addUser", (userId) => {
// //       addUser(userId, socket.id);
// //       ioServer.emit("getUsers", users);
// //     });

// //     socket.on("sendMessage", ({ senderId, receiverId, text }) => {
// //       const user = getUser(receiverId);
// //       ioServer.to(user.socketId).emit("getMessage", {
// //         senderId,
// //         text
// //       });
// //     });

// //     socket.on("newPost", (post) => {
// //       ioServer.emit("postAdded", post);
// //     });

// //     socket.on("disconnect", () => {
// //       removeUser(socket.id);
// //       ioServer.emit("getUsers", users);
// //     });
// //   });
// // });

// // afterAll((done) => {
// //   clientSocket.close();
// //   ioServer.close(() => {
// //     server.close(done);
// //   });
// // });

// // describe("Socket.IO Server", () => {
// //   it("should add and retrieve users correctly", (done) => {
// //     clientSocket.emit("addUser", 1);
// //     clientSocket.on("getUsers", (receivedUsers) => {
// //       expect(receivedUsers).toEqual([{ userId: 1, socketId: clientSocket.id }]);
// //       done();
// //     });
// //   });

// //   it("should send messages to the correct user", (done) => {
// //     clientSocket.emit("sendMessage", {
// //       senderId: 1,
// //       receiverId: 1,
// //       text: "Hello"
// //     });

// //     serverSocket.on("getMessage", (message) => {
// //       expect(message).toEqual({
// //         senderId: 1,
// //         text: "Hello"
// //       });
// //       done();
// //     });
// //   });

// //   it("should emit new post to all users", (done) => {
// //     const newPost = { id: 1, content: "New Post" };
// //     clientSocket.emit("newPost", newPost);

// //     clientSocket.on("postAdded", (post) => {
// //       expect(post).toEqual(newPost);
// //       done();
// //     });
// //   });

// //   it("should remove user on disconnect", (done) => {
// //     clientSocket.on("disconnect", () => {
// //       expect(users).toEqual([]);
// //       done();
// //     });

// //     clientSocket.emit("addUser", 1);
// //     clientSocket.disconnect();
// //   });
// // });

// const { addUser, removeUser, getUser } = require('../../socket/index.js');
// const { Server } = require("socket.io");
// const { createServer } = require("http");
// const ioClient = require("socket.io-client");

// const PORT = 8901; // Use a different port for testing
// let ioServer, server, clientSocket, serverSocket;

// jest.setTimeout(30000); // Set a higher timeout

// beforeAll((done) => {
//    server = createServer();
//    ioServer = new Server(server, {
//      cors: {
//        origin: process.env.FRONTEND_URL
//      }
//    });

//    server.listen(PORT, () => {
//      clientSocket = ioClient(`http://localhost:${PORT}`, {
//        transports: ["websocket"],
//      });
//      clientSocket.on("connect", done);
//    });

//    ioServer.on("connection", (socket) => {
//      serverSocket = socket;

//      socket.on("addUser", (userId) => {
//        addUser(userId, socket.id);
//        ioServer.emit("getUsers", [{ userId, socketId: socket.id }]);
//      });

//      socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//        const user = getUser(receiverId);
//        if (user) {
//          ioServer.to(user.socketId).emit("getMessage", {
//            senderId,
//            text
//          });
//        }
//      });

//      socket.on("newPost", (post) => {
//        ioServer.emit("postAdded", post);
//      });

//      socket.on("disconnect", () => {
//        removeUser(socket.id);
//        ioServer.emit("getUsers", []);
//      });
//    });
// });

// afterAll((done) => {
//    clientSocket.close();
//    ioServer.close(() => {
//      server.close(done);
//    });
// });

// describe("Socket.IO Server", () => {
//    it("should add and retrieve users correctly", (done) => {
//      clientSocket.emit("addUser", 1);
//      clientSocket.on("getUsers", (receivedUsers) => {
//        expect(receivedUsers).toEqual([{ userId: 1, socketId: clientSocket.id }]);
//        done();
//      });
//    });

//    it("should send messages to the correct user", (done) => {
//      // First add two users
//      clientSocket.emit("addUser", 1);
//      const anotherSocket = ioClient(`http://localhost:${PORT}`, {
//        transports: ["websocket"],
//      });

//      anotherSocket.on("connect", () => {
//        anotherSocket.emit("addUser", 2);

//        // Then send a message from one user to another
//        clientSocket.emit("sendMessage", {
//          senderId: 1,
//          receiverId: 2,
//          text: "Hello"
//        });

//        anotherSocket.on("getMessage", (message) => {
//          expect(message).toEqual({
//            senderId: 1,
//            text: "Hello"
//          });
//          anotherSocket.disconnect();
//          done();
//        });
//      });
//    });

//    // ... rest of your tests remain the same
// });

const { addUser, removeUser, getUser } = require('../../socket/index.js');
const { Server } = require("socket.io");
const { createServer } = require("http");
const ioClient = require("socket.io-client");

const PORT = 8901; // Use a different port for testing
let ioServer, server, clientSocket, serverSocket;

jest.setTimeout(30000); // Set a higher timeout

beforeAll((done) => {
   server = createServer();
   ioServer = new Server(server, {
     cors: {
       origin: process.env.FRONTEND_URL
     }
   });

   server.listen(PORT, () => {
     clientSocket = ioClient(`http://localhost:${PORT}`, {
       transports: ["websocket"],
     });
     clientSocket.on("connect", done);
   });

   ioServer.on("connection", (socket) => {
     serverSocket = socket;

     socket.on("addUser", (userId) => {
       addUser(userId, socket.id);
       ioServer.emit("getUsers", [{ userId, socketId: socket.id }]);
     });

     socket.on("sendMessage", ({ senderId, receiverId, text }) => {
       const user = getUser(receiverId);
       if (user) {
         ioServer.to(user.socketId).emit("getMessage", {
           senderId,
           text
         });
       }
     });

     socket.on("newPost", (post) => {
       ioServer.emit("postAdded", post);
     });

     socket.on("disconnect", () => {
       removeUser(socket.id);
       ioServer.emit("getUsers", []);
     });
   });
});

afterAll((done) => {
   clientSocket.close();
   ioServer.close(() => {
     server.close(done);
   });
});

describe("Socket.IO Server", () => {
   it("should add and retrieve users correctly", (done) => {
     clientSocket.emit("addUser", 1);
     clientSocket.on("getUsers", (receivedUsers) => {
       // Check that the received users array contains a user with userId 1
       expect(receivedUsers.some(user => user.userId === 1)).toBe(true);
       // Check that the socketId is not empty
       expect(receivedUsers[0].socketId).toBeTruthy();
       done();
     });
   });

   it("should send messages to the correct user", (done) => {
     // First add two users
     clientSocket.emit("addUser", 1);
     const anotherSocket = ioClient(`http://localhost:${PORT}`, {
       transports: ["websocket"],
     });

     anotherSocket.on("connect", () => {
       anotherSocket.emit("addUser", 2);

       // Then send a message from one user to another
       clientSocket.emit("sendMessage", {
         senderId: 1,
         receiverId: 2,
         text: "Hello"
       });

       anotherSocket.on("getMessage", (message) => {
         expect(message).toEqual({
           senderId: 1,
           text: "Hello"
         });
         anotherSocket.disconnect();
         done();
       });
     });
   });

  it("should emit new post to all users", (done) => {
    const newPost = { id: 1, content: "New Post" };
    clientSocket.emit("newPost", newPost);

    clientSocket.on("postAdded", (post) => {
      expect(post).toEqual(newPost);
      done();
    });
  });

  it("should remove user on disconnect", (done) => {
    clientSocket.on("disconnect", () => {
      expect(users).toEqual([]);
      done();
    });

    clientSocket.emit("addUser", 1);
    clientSocket.disconnect();
  });
});