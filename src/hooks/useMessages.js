import { useCallback, useState } from "react";
import axios from "axios";

const useMessages = (currentChat, userId) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [processedMessageIds, setProcessedMessageIds] = useState(new Set());

  const fetchMessages = useCallback(async () => {
    try {
      if (currentChat?._id) {
        const res = await axios.get(`/api/messages/${currentChat._id}`);
        setMessages(res.data);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  }, [currentChat]);

const handleNewMessage = (message) => {
    if (!processedMessageIds.has(message._id)) {
        setMessages((prev) => [...prev, message]);
        setProcessedMessageIds((prev) => new Set(prev).add(message._id));
    }
};

  const addMessage = async (messageData) => {
    try {
      const res = await axios.post("/api/messages", messageData);
      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error sending message:", err);
      throw new Error("Could not send message.");
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    fetchMessages,
    handleNewMessage,
    addMessage,
    setMessages
  };
};

export default useMessages;