import "./Messenger.css"
import Sidebar from '../components/HomeComponents/Sidebar'
import Conversation from '../components/MessengerComponents/Conversation'
import Message from "../components/MessengerComponents/Message"
import ChatOnline from "../components/MessengerComponents/ChatOnline"
import { AuthContext } from "../contexts/AuthContext"
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const{ user } = useContext(AuthContext);
    
    useEffect(() => {
        console.log("user object from AuthContext in Messenger:", user);
        const getConversations = async () => {
            if (user && user.user && user.user.id){
                try{
                    console.log(user.user.id);
                    const res = await axios.get("/api/conversations/"+user.user.id);
                    console.log(res);
                    setConversations(res.data);
                } catch(err){
                    console.log(err);
                }    
            }    
        };
        getConversations();
    }, [user, user.user.id]);

    useEffect(() => {
        const getMessages = async () => {
            try{
                console.log("Current chat id: ", currentChat._id);
                const res = await axios.get("/api/messages/"+currentChat?._id);
                setMessages(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);
 
    //console.log("Current chat: ", currentChat);
    //console.log(messages);

    return (
    <>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput"/>
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            
                            <Conversation conversation={c} currentUser={user}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ? (
                        <>
                            <div className="chatBoxTop">
                                {messages.map(m=>(
                                    <Message message={m} own={m.sender === user.user.id}/>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea className="chatMessageInput" placeholder="write something..."></textarea>
                                <button className="chatSubmitButton">Send</button>
                            </div>
                        </> 
                    ) : (
                        <span className="noConversationText">Open a conversation to start a chat.</span>
                    )}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                </div>
            </div>
        </div>
    </>
  )
}
