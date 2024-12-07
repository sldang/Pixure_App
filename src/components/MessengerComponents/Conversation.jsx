import React, { memo, useMemo, useCallback } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Conversation.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

interface ConversationProps {
  conversation: {
    members: string[];
    // other conversation properties
  };
  currentUser: {
    user: {
      id: string;
      // other user properties
    };
  };
}

const Conversation: React.FC<ConversationProps> = memo(({ conversation, currentUser }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Memoize friendId to prevent unnecessary re-computations
  const friendId = useMemo(() => {
    if (!conversation || !currentUser || !conversation.members) return null;
    return conversation.members.find((m) => m !== currentUser.user.id);
  }, [conversation, currentUser]);

  // Memoize the user fetching function
  const getUser = useCallback(async () => {
    if (!friendId) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.get(`/api/users?userId=${friendId}`);
      
      if (!res.data) {
        throw new Error("No user data returned");
      }
      
      setUser(res.data);
      setHasError(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [friendId]);

  // Use useEffect to fetch user only when friendId changes
  useEffect(() => {
    getUser();
  }, [getUser]);

  // Render content based on loading and error states
  const renderContent = () => {
    const defaultAvatar = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

    if (isLoading) {
      return (
        <div className="conversation">
          <img
            className="conversationImg"
            src={defaultAvatar}
            alt="Loading Profile"
          />
          <span className="conversationName">Loading...</span>
        </div>
      );
    }

    if (hasError || !user) {
      return (
        <div className="conversation">
          <img
            className="conversationImg"
            src={defaultAvatar}
            alt="Error Profile"
          />
          <span className="conversationName">Error fetching user</span>
        </div>
      );
    }

    return (
      <div className="conversation">
        <img
          className="conversationImg"
          src={defaultAvatar}
          alt="User Profile"
        />
        <span className="conversationName">{user.nickname}</span>
      </div>
    );
  };

  return renderContent();
});

Conversation.displayName = 'Conversation';
export default Conversation;


