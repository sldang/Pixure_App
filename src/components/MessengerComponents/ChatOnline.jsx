import "./ChatOnline.css";

export default function ChatOnline({ onlineUsers = [], currentId, setCurrentChat }) {
  const handleClick = (user) => {
    setCurrentChat({
      members: [currentId, user._id],
      name: user.username,
    });
  };

  return (
    <div className="chatOnline">
      <div className="chatOnlineWrapper">
        {/* Render only if there are online users */}
        {onlineUsers.length > 0 ? (
          onlineUsers.map((user, index) => (
            <div
              className="chatOnlineFriend"
              key={index}
              onClick={() => handleClick(user)}
            >
              <div className="chatOnlineImgContainer">
                <img
                  className="chatOnlineImg"
                  src={
                    user.profilePicture ||
                    "https://via.placeholder.com/50" // Fallback image
                  }
                  alt={user.username}
                />
                <div className="chatOnlineBadge"></div>
              </div>
              <span className="chatOnlineName">{user.username}</span>
            </div>
          ))
        ) : (
          <span className="noOnlineUsersText">
            No users are online right now. 
          </span>
        )}
      </div>
    </div>
  );
}
