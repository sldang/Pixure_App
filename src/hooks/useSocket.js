import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (userId, handleNewMessage) => {
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  
  /*
  useEffect(() => {
    socket.current = io("ws://localhost:8900", {
      transports: ["websocket"],
    });
  */
  
  useEffect(() => {
    socket.current = io("https://socket-pixure-app.onrender.com", {
      transports: ["websocket"],
    });
  

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      socket.current.emit("addUser", userId);
      socket.current.on("getUsers", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [userId]);

  const sendMessage = (messageData, receiverId) => {
    socket.current.emit("sendMessage", {
      senderId: messageData.sender,
      receiverId,
      text: messageData.text,
    });
  };

  return { onlineUsers, arrivalMessage, sendMessage };
};

export default useSocket;
