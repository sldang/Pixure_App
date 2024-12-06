import { useState } from "react";
import axios from "axios";

const useConversations = (userId) => {
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`/api/conversations/${userId}`);
      setConversations(res.data);
    } catch (err) {
      console.error("Error fetching conversations:", err);
    }
  };

  const addConversation = async (userEmail, otherEmail) => {
    try {
      const res = await axios.post("/api/conversations", {
        userEmail,
        otherEmail,
      });
      setConversations((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Error creating conversation:", err);
      throw new Error("Could not create conversation.");
    }
  };

  return { conversations, fetchConversations, addConversation };
};

export default useConversations;