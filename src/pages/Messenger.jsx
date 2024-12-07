import "./Messenger.css";
import Sidebar from "../components/HomeComponents/Sidebar";
import Conversation from "../components/MessengerComponents/Conversation";
import Message from "../components/MessengerComponents/Message";
import ChatOnline from "../components/MessengerComponents/ChatOnline";
import { AuthContext } from "../contexts/AuthContext";
import React, { useContext, useState, useEffect, useRef } from "react";
import useSocket from "../hooks/useSocket";
import useConversations from "../hooks/useConversations";
import useMessages from "../hooks/useMessages";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export default function Messenger() {
  const { user } = useContext(AuthContext);
  const userId = user?.user?.id || null;
  const userEmail = user?.user?.email || null;

  // States
  const [currentChat, setCurrentChat] = useState(null);
  const [chatMenuInput, setChatMenuInput] = useState("");
  const [messageCache, setMessageCache] = useState({});

  // Hooks
  const { conversations, fetchConversations, addConversation } = useConversations(userId);
  const {
    messages,
    newMessage,
    setNewMessage,
    handleNewMessage,
    fetchMessages,
    addMessage,
  } = useMessages(currentChat, userId);

  const { onlineUsers, arrivalMessage, sendMessage } = useSocket(userId, handleNewMessage);

  const scrollRef = useRef();

  // Fetch conversations when the user logs in
  useEffect(() => {
    if (userId) {
      fetchConversations();
    }
  }, [userId, fetchConversations]);

  // Update messages when a new message arrives
  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      console.log("Processing arrivalMessage:", arrivalMessage);
      handleNewMessage(arrivalMessage);
    }
  }, [arrivalMessage, currentChat, handleNewMessage]);

  // Fetch messages for the current chat
  useEffect(() => {
    if (currentChat?._id) {
      fetchMessages();
    }
  }, [currentChat, fetchMessages]);

  // Scroll to the most recent message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const intervalId = setInterval(() => {
        if (currentChat?._id) {
            fetchMessages(); // Function from useMessages hook
        }
    }, 5000); // Fetch messages every 5 seconds

    return () => clearInterval(intervalId); // Clear interval when component unmounts
}, [currentChat, fetchMessages]);

useEffect(() => {
  if (currentChat?._id) {
      // If cached, use the cache
      if (messageCache[currentChat._id]) {
          handleNewMessage([...messageCache[currentChat._id]]); // Update messages with cache
      } else {
          // Otherwise, fetch from server
          fetchMessages().then((fetchedMessages) => {
              handleNewMessage(fetchedMessages); // Update messages state
              setMessageCache((prev) => ({
                  ...prev,
                  [currentChat._id]: fetchedMessages,
              }));
          });
      }
  }
}, [currentChat, fetchMessages, messageCache, handleNewMessage]);

  // Function to create a new chat
  const makeChat = async (e) => {
    e.preventDefault();
    if (!chatMenuInput.trim()) {
      alert("Please enter a valid email!");
      return;
    }

    try {
      const newConversation = await addConversation(userEmail, chatMenuInput);
      setChatMenuInput("");
      alert("Conversation created successfully!");
      setCurrentChat(newConversation);
    } catch (err) {
      console.error("Error creating conversation:", err);
      alert("Could not create the conversation. Please try again.");
    }
  };

  // Function to handle sending messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    const messageData = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
      createdAt: Date.now(),
    };

    const receiverId = currentChat?.members?.find((member) => member !== userId);

    try {
      addMessage(messageData); // Optimistic UI update
      sendMessage(messageData, receiverId);
      setNewMessage(""); // Clear input field
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Function to simulate a default "John Doe" chat
  const startChatWithJohnDoe = () => {
    const johnDoeConversation = {
      _id: "dummy-conversation-id",
      members: [userId, "johndoe123"],
      name: "John Doe",
    };
    setCurrentChat(johnDoeConversation);
    handleNewMessage({
      sender: "johndoe123",
      text: "Hello, I'm John Doe!",
      createdAt: Date.now(),
    });
  };

  return (
    <>
      <Sidebar darkMode={true} />
      <div className="messenger">
        {/* Chat Menu */}
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <form onSubmit={makeChat}>
              <input
                placeholder="Converse with friend"
                className="chatMenuInput"
                value={chatMenuInput}
                onChange={(e) => setChatMenuInput(e.target.value)}
              />
              <button type="submit">Make Conversation with this fellow</button>
            </form>
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
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

        {/* Chat Box */}
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
                  <button
                    className="chatSubmitButton"
                    onClick={handleSubmit}
                  >
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

        {/* Online Users */}
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
    </>
  );
}
