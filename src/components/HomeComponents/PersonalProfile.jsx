import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../contexts/AuthContext";
import UserProfileDisplay from './UserProfileDisplay'; // Import the new component

const PersonalProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    nickname: '',
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = user.user.id; // Accessing userId directly
        if (!userId) {
          console.error("User ID is missing.");
          return;
        }

        const response = await axios.get(`https://pixure-server.onrender.com/api/user/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          const data = response.data;
          setProfileData({
            nickname: data.nickname || 'Unknown User', // Correctly access nickname
            postsCount: data.postsCount || 0,
            followersCount: data.followersCount || 0,
            followingCount: data.followingCount || 0,
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