// import React from 'react'

// const Rightbar = () => {
//   const users = [
//     { username: 'Test1'},
//     { username: 'Test2'},
//     { username: 'Test3'},
//     { username: 'Test4'},
//     { username: 'Test5'},
//   ];

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-lg font-bold mb-4">Followers</h2>
//       {users.map((user, index) => (
//         <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 rounded-full bg-gray-300"></div>
//             <div>
//               <p className="font-bold text-sm">{user.username} </p>
//             </div>
//           </div>
//           <button className="text-blue-500 text-sm font-semibold"> Message</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Rightbar

import React, { useEffect, useState } from 'react';

const Rightbar = () => {
    const [followers, setFollowers] = useState([]);
    const [followList, setFollowList] = useState([]);

    const parsedData = JSON.parse(localStorage.getItem('user'));
    const userEmail = parsedData && parsedData.user ? parsedData.user.email : null;

    useEffect(() => {
        const fetchFollowList = async () => {
            if (!userEmail) return;
            console.log(userEmail)

            try {
                // Get the followList from the backend if it isn't available in local storage
                const response = await fetch(`https://cs4800-server.onrender.com/api/getFollowList?email=${userEmail}`);
                const data = await response.json();
                setFollowList(data.followList || []);
            } catch (error) {
                console.error('Error fetching follow list:', error);
            }
        };

        if (!parsedData.user.followList) {
            fetchFollowList();
        } else {
            setFollowList(parsedData.user.followList);
        }
    }, [userEmail]);

    useEffect(() => {
        const fetchFollowers = async () => {
            if (followList.length === 0) return;

            try {
                const promises = followList.map((email) =>
                    fetch(`https://cs4800-server.onrender.com/api/getUserByEmail?email=${email}`)
                );

                const responses = await Promise.all(promises);
                const followersData = await Promise.all(responses.map(res => res.json()));
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
                            <p className="font-bold text-sm">{follower.username}</p>
                        </div>
                    </div>
                    <button className="text-blue-500 text-sm font-semibold">Message</button>
                </div>
            ))}
            {followers.length === 0 && <p>No followers found.</p>}
        </div>
    );
};

export default Rightbar;
