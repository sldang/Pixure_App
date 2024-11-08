import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../contexts/AuthContext";
import UserProfileDisplay from './UserProfileDisplay'; // Import the new component



const PersonalProfile = () => {
  const parsedData = JSON.parse(localStorage.getItem('user'));
  const userEmail = parsedData && parsedData.user ? parsedData.user.email : null;
  const userNickname = parsedData && parsedData.user ? parsedData.user.email : null;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    nickname: userNickname,
    postsCount: 0,
    followersCount: 0,
    followedCount: 0,
  });


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = user.user.id; // Accessing userId directly
        if (!userId) {
          console.error("User ID is missing.");
          return;
        }

        console.log(userEmail);
        const response = await axios.get(`https://pixure-server.onrender.com/api/User/:${userEmail}/follow-stats`);
        setProfileData.followersCount(response.data.followersCount)
        setProfileData.followedCount(response.data.followedCount)
        if (response.status === 200) {
          const data = response.data;
          setProfileData({
            nickname: data.nickname || `err`, // Correctly access nickname
            postsCount: data.postsCount,
            followersCount: data.followersCount,
            followingCount: data.followingCount,
          });
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleEditClick = () => {
    navigate('/editprofile');
  };

  return (
    <UserProfileDisplay 
      nickname={profileData.nickname} // Directly use the nickname from profileData
      postsCount={profileData.postsCount} 
      followersCount={profileData.followersCount} 
      followingCount={profileData.followingCount} 
      onEdit={handleEditClick} // Passing the edit handler
    />
  );
};

export default PersonalProfile;