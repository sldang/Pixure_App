import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserProfileDisplay from './UserProfileDisplay';

const UserProfilePage = () => {
  const { username } = useParams(); // Get the username from the URL params
  const [profileData, setProfileData] = useState({
    nickname: "",
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/by-username`, { username });
        if (response.status === 200) {
          const data = response.data;
          setProfileData({
            nickname: data.nickname,
            postsCount: data.postsCount || 0,
            followersCount: data.followersCount || 0,
            followingCount: data.followingCount || 0,
          });
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [username]);

  return (
    <UserProfileDisplay
      nickname={profileData.nickname}
      postsCount={profileData.postsCount}
      followersCount={profileData.followersCount}
      followingCount={profileData.followingCount}
    />
  );
};

export default UserProfilePage;
