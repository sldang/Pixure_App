import { useEffect, useState } from "react"
import "./Conversation.css"
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
//axios.defaults.baseURL = 'http://localhost:5000';

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false)

  useEffect(()=>{
    if (!conversation || !currentUser || !currentUser.user || !conversation.members) {
      console.error("Invalid conversation or currentUser data");
      setHasError(true);
      setIsLoading(false);
      return;
    }

    const friendId = conversation.members.find((m) => m !== currentUser.user.id);
    console.log("Friend ID: ", friendId);

    if(!friendId || hasError) {
      console.error("Friend ID is invalid:", friendId, hasError);
      setIsLoading(false);
      setHasError(true);
      return; // Exit early to prevent unnecessary API calls
    }

    const getUser = async () => {
      try{
        const res = await axios.get(`/api/users?userId=${friendId}`);
        if (!res.data) {
          throw new Error("No user data returned");
        }
        setUser(res.data);
      }catch(err){
        console.log("Error fetching user data:", err.response?.data || err.message);
        setHasError(true)
        setIsLoading(false)
      } finally {
        setIsLoading(false);
      }
    }; 
    getUser();
  }, [currentUser, conversation, hasError])
  
  /*
  return (
    <div className="conversation">
        <img className="conversationImg" 
        src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
        />
        <span className="conversationName">
          {isLoading ? "Loading..." : user.nickname}
        </span>
    </div>
  )
  */
  if (isLoading) {
    return (
      <div className="conversation">
        <img
          className="conversationImg"
          src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
          alt="Profile"
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
          src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
          alt="Profile"
        />
        <span className="conversationName">Error fetching user</span>
      </div>
    );
  }

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
        alt="Profile"
      />
      <span className="conversationName">{user.nickname}</span>
    </div>
  );
}
