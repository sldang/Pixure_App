import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../contexts/AuthContext";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
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
        const userId = user ? user.user.id : null;
        if (!userId) {
          console.error("User ID is missing.");
          return;
        }

        const response = await axios.get(`/api/user/profile/${userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        });

        setProfileData({
          nickname: response.data.nickname || 'Unknown User',
          postsCount: response.data.postsCount || 0,
          followersCount: response.data.followersCount || 0,
          followingCount: response.data.followingCount || 0,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error.response ? error.response.data : error.message);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleEditClick = () => {
    navigate('/editprofile');
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            src="" // Replace with your image URL or `profileData.imageURL` if you have it
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-2">
            <h2 className="text-2xl font-bold whitespace-nowrap">{profileData.nickname}</h2>
            <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800" onClick={handleEditClick}>
              Edit Profile
            </button>
            <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">
              Edit Description
            </button>
          </div>
          <div className="flex space-x-4 mb-4">
            <p><strong>{profileData.postsCount}</strong> posts</p>
            <p><strong>{profileData.followersCount}</strong> followers</p>
            <p><strong>{profileData.followingCount}</strong> following</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p>Everyone has a story to tell. I'm gonna tell you mine.</p>
      </div>
    </div>
  );
};

export default PersonalProfile;