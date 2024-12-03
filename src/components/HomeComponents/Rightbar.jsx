import React, { useEffect, useState } from 'react';

const Rightbar = () => {
    const [followers, setFollowers] = useState([]);
    const [followList, setFollowList] = useState([]);

    const parsedData = JSON.parse(localStorage.getItem('user'));
    const userId = parsedData && parsedData.user ? parsedData.user.id : null;

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
            <h2 className="text-lg font-bold mb-4">Followers</h2>
            {followers.map((follower, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                        <div>
                            <p className="font-bold text-sm">{follower.nickname || follower.username}</p>
                        </div>
                    </div>
                    <button className="text-blue-500 text-sm font-semibold pl-4">Message</button>
                </div>
            ))}
            {followers.length === 0 && <p>No followers found.</p>}
        </div>
    );
};

export default Rightbar;
