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
import axios from 'axios';

const Rightbar = () => {
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowers = async () => {
            // Retrieve user data from local storage
            const user = JSON.parse(localStorage.getItem('user'));
            // Check if user and followList exist
            if (!user || !user.followList || user.followList.length === 0) return;

            try {
                const promises = user.followList.map((email) =>
                    axios.get(`https://cs4800-server.onrender.com/api/getUserByEmail?email=${email}`)
                );
                const results = await Promise.all(promises);
                const followersData = results.map((res) => res.data);
                setFollowers(followersData);
            } catch (error) {
                console.error('Error fetching followers:', error);
            }
        };

        fetchFollowers();
    }, []);

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
            {followers.length === 0 && <p>No followers found.</p>} {/* Optional message when there are no followers */}
        </div>
    );
};

export default Rightbar;


