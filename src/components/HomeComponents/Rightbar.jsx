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
    const parsedData = JSON.parse(localStorage.getItem('user'));
    const userEmail = parsedData && parsedData.user ? parsedData.user.email : null;

    useEffect(() => {
        const fetchFollowers = async () => {
            // Check if userEmail exists
            if (!userEmail) return;

            // Get user's followList
            const userFollowList = parsedData.user.followList || [];

            // Check if followList exists and is not empty
            if (userFollowList.length === 0) return;

            try {
                // Create an array of fetch promises for each email
                const promises = userFollowList.map((email) =>
                    fetch(`https://cs4800-server.onrender.com/api/getUserByEmail?email=${email}`)
                );

                // Wait for all fetch requests to resolve
                const responses = await Promise.all(promises);

                // Convert the responses to JSON
                const followersData = await Promise.all(responses.map(res => res.json()));

                // Set the followers data in state
                setFollowers(followersData);
            } catch (error) {
                console.error('Error fetching followers:', error);
            }
        };

        fetchFollowers();
    }, [parsedData]); // Added parsedData as a dependency

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
