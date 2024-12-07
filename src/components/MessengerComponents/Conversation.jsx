import { useEffect, useState, useTransition } from "react";
import "./Conversation.css";
import axios from "axios";
import React, { memo } from "react";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const Conversation = memo(function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [previousUser, setPreviousUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!conversation || !currentUser || !currentUser.user || !conversation.members) {
      console.error("Invalid conversation or currentUser data");
      setHasError(true);
      return;
    }

    const friendId = conversation.members.find((m) => m !== currentUser.user.id);
    if (!friendId) {
      console.error("Friend ID is invalid");
      setHasError(true);
      return;
    }

    setHasError(false); // Reset error state for a new fetch

    // Start fade-out animation
    setIsVisible(false);
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`/api/users?userId=${friendId}`);
        if (!res.data) {
          throw new Error("No user data returned");
        }

        // Update user state
        setPreviousUser(user); // Keep the current user while loading
        startTransition(() => setUser(res.data));
      } catch (err) {
        console.error("Error fetching user data:", err.response?.data || err.message);
        setHasError(true);
      } finally {
        setIsLoading(false);
        setIsVisible(true); // Trigger fade-in after data is loaded
      }
    };

    fetchData();
  }, [conversation, currentUser, user]);

  return (
    <div className={`conversation ${!isVisible ? "hidden" : ""}`}>
      <img
        className="conversationImg"
        src={
          user?.profilePicture ||
          "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
        }
        alt="Profile"
      />
      <span className="conversationName">
        {isLoading
          ? previousUser?.nickname || "Loading..."
          : user?.nickname || "Error fetching user"}
      </span>
    </div>
  );
});

export default Conversation;

