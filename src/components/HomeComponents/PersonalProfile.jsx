import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    nickname: '',          // Add nickname to the state
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://pixure-server.onrender.com/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if needed
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData({
            nickname: data.nickname || 'Unknown User', // Set the nickname here
            postsCount: data.postsCount,               // Use counts returned by the API
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
  }, []);

  const handleEditClick = () => {
    navigate('/editprofile');
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center space-x-4">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            src="" // Replace with your image URL or `profileData.imageURL` if you have it
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-2">
            <h2 className="text-2xl font-bold whitespace-nowrap">{profileData.nickname}</h2> {/* Display the nickname */}
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

      {/* Profile Bio */}
      <div className="mt-4">
        <p>Everyone has a story to tell. I'm gonna tell you mine.</p>
      </div>
    </div>
  );
};

export default PersonalProfile;