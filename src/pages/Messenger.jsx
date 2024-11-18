import "./Messenger.css";
import Sidebar from "../components/HomeComponents/Sidebar";
import Conversation from "../components/MessengerComponents/Conversation";
import Message from "../components/MessengerComponents/Message";
import ChatOnline from "../components/MessengerComponents/ChatOnline";
import { AuthContext } from "../contexts/AuthContext";
import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  const userId = user?.user?.id;

  // Connect to socket server
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
  }, []);

  // Fetch conversations
  useEffect(() => {
    const getConversations = async () => {
      if (userId) {
        try {
          const res = await axios.get(`/api/conversations/${userId}`);
          setConversations(res.data);
        } catch (err) {
          console.error("Error fetching conversations:", err);
        }
      }
    };
    getConversations();
  }, [userId]);

  // Fetch messages for selected conversation
  useEffect(() => {
    const getMessages = async () => {
      if (currentChat?._id) {
        try {
          const res = await axios.get(`/api/messages/${currentChat._id}`);
          setMessages(res.data);
        } catch (err) {
          console.error("Error fetching messages:", err);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  // Handle arrival of new messages via socket
  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  // Add current user to the list of online users
  useEffect(() => {
    if (userId) {
      socket.current.emit("addUser", userId);
      socket.current.on("getUsers", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [userId]);

  // Handle sending a new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
      createdAt: Date.now(),
    };

    // Add the message locally
    setMessages((prev) => [...prev, message]);
    setNewMessage(""); // Reset input field

    // Scroll to the latest message
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    const receiverId = currentChat?.members?.find((member) => member !== userId);

    // Send message via socket and API
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      await axios.post("/api/messages", message);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Scroll to the most recent message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add a default "John Doe" chat
  const startChatWithJohnDoe = () => {
    const johnDoeConversation = {
      _id: "dummy-conversation-id",
      members: [userId, "johndoe123"],
      name: "John Doe",
    };
    setCurrentChat(johnDoeConversation);
    setMessages([
      { sender: "johndoe123", text: "Hello, I'm John Doe!", createdAt: Date.now() },
    ]);
  };

  return (
    <div className="messenger">
      {/* Chat menu */}
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input
            placeholder="Search for friends"
            className="chatMenuInput"
          />
          {conversations.map((c) => (
            <div key={c._id} onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
          {/* Default "John Doe" conversation */}
          <div onClick={startChatWithJohnDoe} className="defaultConversation">
            <div className="conversation">
              <img
                src="https://via.placeholder.com/50"
                alt="John Doe"
                className="conversationImg"
              />
              <span className="conversationName">John Doe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat box */}
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m, index) => (
                  <div key={index} ref={scrollRef}>
                    <Message message={m} own={m.sender === userId} />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="Write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="noConversationContainer">
              <span className="noConversationText">
                Open a conversation to start a chat. 📬
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Divider between chat and online users */}
      <div className="divider"></div>

      {/* Online users */}
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={userId}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div>
  );
}
