import './ChatOnline.css';

export default function ChatOnline({ onlineUsers, setCurrentChat }) {
  if (!onlineUsers || onlineUsers.length === 0) {
    return (
      <div className="chatOnline">
        <p className="noOnlineUsers">No users are online</p>
      </div>
    );
  }

  return (
    <div className="chatOnline">
      {onlineUsers.map((user) => (
        <div
          key={user.id} // Ensure `user.id` is unique
          className="chatOnlineFriend"
          onClick={() => setCurrentChat(user)} // Handles setting the active chat
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                user.profilePicture ||
                'https://via.placeholder.com/50' // Fallback for users without profile pictures
              }
              alt={`${user.name}'s profile`}
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{user.name}</span>
        </div>
      ))}
    </div>
  );
}
