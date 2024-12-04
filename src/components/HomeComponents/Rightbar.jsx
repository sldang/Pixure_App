import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const Rightbar = () => {
  const { user } = useContext(AuthContext); // Retrieve the logged-in user's data
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user || !user.user?.id) {
        console.error("User ID not available in AuthContext.");
        return;
      }

      try {
        const response = await axios.get(`/api/users/profile/${user.user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!response.data) {
          console.error("No data received from profile endpoint.");
          return;
        }

        console.log("Profile data fetched:", response.data);

        setFollowersCount(response.data.followersCount || 0);
        setFollowingCount(response.data.followingCount || 0);
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message
        );
        alert("Failed to fetch profile data. Please try again.");
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
