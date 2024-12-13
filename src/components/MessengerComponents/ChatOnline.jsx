import React from "react";
import "./ChatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const handleUserClick = (user) => {
    // Create a new chat or open an existing one when a user is clicked
    setCurrentChat({
      members: [currentId, user._id],
    });
  };

  return (
    <div className="chatOnline">
      {/* Check if there are any online users */}
      {onlineUsers && onlineUsers.length > 0 ? (
        onlineUsers.map((user) => (
          <div
            className="chatOnlineFriend"
            key={user._id}
            onClick={() => handleUserClick(user)}
          >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={user.profilePicture || "https://via.placeholder.com/50"}
                alt={`${user.username || "User"}'s avatar`}
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{user.username || "User"}</span>
          </div>
        ))
      ) : (
        // Show nothing if there are no online users
        <p className="noOnlineUsers">No online users available</p>
      )}
    </div>
  );
}
