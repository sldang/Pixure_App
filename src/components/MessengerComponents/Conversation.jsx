import { useEffect, useState } from "react"
import "./Conversation.css"
import axios from "axios";

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const friendId = conversation.members.find(m=>m !== currentUser.user.id);
    console.log("Friend ID: ", friendId);


    const getUser = async () => {
      try{
        const res = await axios.get("/api/users?userId="+friendId);
        setUser(res.data);
        console.log(res.data);
        setIsLoading(false);
      }catch(err){
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation])
  
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
}
