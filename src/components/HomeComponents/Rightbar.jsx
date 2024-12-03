import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
const Rightbar = () => {
    const { user } = useContext(AuthContext);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
  

    const parsedData = JSON.parse(localStorage.getItem('user'));
    const userId = parsedData && parsedData.user ? parsedData.user.id : null;
    useEffect(() => {
        const fetchUserProfile = async () => {
          if (!user || !user.user?.id) return;
    
          try {
            const response = await fetch(
              `${process.env.REACT_APP_SERVER_URL}/api/user/profile/${user.user.id}`,
              { headers: { Authorization: `Bearer ${user.token}` } }
            );
            const data = await response.json();
            setFollowersCount(data.followersCount);
            setFollowingCount(data.followingCount);
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        };
    
        fetchUserProfile();
      }, [user]);
    useEffect(() => {
        const fetchFollowList = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/${userId}`);
                const data = await response.json();
                setFollowList(data.followList || []);
            } catch (error) {
                console.error('Error fetching follow list:', error);
            }
        };

        fetchFollowList();
    }, [userId]);

    useEffect(() => {
        const fetchFollowers = async () => {
            if (followList.length === 0) return;

            try {
                const promises = followList.map((id) =>
                    fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/profile/${id}`)
                );

                const responses = await Promise.all(promises);
                const followersData = await Promise.all(responses.map((res) => res.json()));
                setFollowers(followersData);
            } catch (error) {
                console.error('Error fetching followers:', error);
            }
        };

        fetchFollowers();
    }, [followList]);

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
