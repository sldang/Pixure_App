import "./Messenger.css"
import Sidebar from '../components/HomeComponents/Sidebar'
import Conversation from '../components/MessengerComponents/Conversation'
import Message from "../components/MessengerComponents/Message"
import ChatOnline from "../components/MessengerComponents/ChatOnline"
import { AuthContext } from "../contexts/AuthContext"
import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";

axios.defaults.baseURL = 'https://pixure-server.onrender.com';

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [chatMenuInput, setChatMenuInput] = useState("");
    const socket = useRef();
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();
    const parsedData = JSON.parse(localStorage.getItem('user'));
    const userEmail = parsedData && parsedData.user ? parsedData.user.email : null;

    const makeChat = async (e) => {
        e.preventDefault();
        console.log(userEmail)
        console.log(chatMenuInput)
        const response = await fetch("https://pixure-server.onrender.com/api/conversations", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userEmail: userEmail,
                otherEmail: chatMenuInput
            })
        })
    }

    useEffect(() => {
        socket.current = io("https://socket-pixure-app.onrender.com", { transports: ['websocket'] });
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    }, []);

    // fetch conversations of current user
    useEffect(() => {
        console.log("user object from AuthContext in Messenger:", user);
        const getConversations = async () => {
            if (user && user.user && user.user.id) {
                try {
                    console.log(user.user.id);
                    const res = await axios.get("/api/conversations/" + user.user.id);
                    console.log(res);
                    setConversations(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        getConversations();
    }, [user, user.user.id]);

    // fetch messages of selected conversation
    useEffect(() => {
        const getMessages = async () => {
            try {
                console.log("Current chat id: ", currentChat._id);
                const res = await axios.get("/api/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    //console.log("Current chat: ", currentChat);
    //console.log(messages);

    // message handler for sending messages
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user.user.id,
            text: newMessage,
            conversationId: currentChat._id
        };


        const receiverId = currentChat.members.find((member) => member !== user.user.id);

        socket.current.emit("sendMessage", {
            senderId: user.user.id,
            receiverId,
            text: newMessage
        });

        try {
            const res = await axios.post("/api/messages", message);
            setMessages([...messages, res.data])
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    // scroll down to most recent messages by default
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // get userIds and socketIds
    useEffect(() => {
        socket.current.emit("addUser", user.user.id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(users);
        });
    }, [user]);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    return (
        <>
            <div className="messenger">
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
                            <div key={c.id} onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
    
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m, index) => (
                                        <div key={index} ref={scrollRef}>
                                            <Message message={m} own={m.sender === user.user.id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">Open a conversation to start a chat.</span>
                        )}
                    </div>
                </div>
    
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user.user.id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>

            </div>
    </>
  )
}

