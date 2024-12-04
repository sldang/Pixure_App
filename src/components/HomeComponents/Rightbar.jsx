import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const Rightbar = () => {
  const { user } = useContext(AuthContext);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const BASE_URL = "https://pixure-server.onrender.com";

  useEffect(() => {
    const fetchUserProfile = async () => {
        if (!user || !user.user?.id) return;

        try {
            const response = await axios.get(`${BASE_URL}/api/user/profile/${user.user.id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setFollowersCount(response.data.followersCount);
            setFollowingCount(response.data.followingCount);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    fetchUserProfile();
}, [user]);


  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Profile Stats</h2>
      <div className="flex justify-between py-2 border-b border-gray-200">
        <p>Followers:</p>
        <p>{followersCount}</p>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-200">
        <p>Following:</p>
        <p>{followingCount}</p>
      </div>
    </div>
  );
};

export default Rightbar;
