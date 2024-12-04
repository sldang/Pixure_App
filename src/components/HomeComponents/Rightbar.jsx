import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

axios.defaults.baseURL = "https://pixure-server.onrender.com";

const Rightbar = () => {
  const { user } = useContext(AuthContext);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user || !user.user?.email) {
        console.error("User email not available");
        return;
      }

      const email = user.user.email;
      console.log("Fetching profile for email:", email);

      try {
        const response = await axios.get(`/api/user/profile/${email}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = response.data;
        console.log("Profile data fetched:", data);

        setFollowersCount(data.followersCount);
        setFollowingCount(data.followingCount);
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
