import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fakeFollowers = [
      { name: 'John Doe' },
      { name: 'Jane Smith' },
      { name: 'Emily Stone' }
    ];

    const fakeFollowing = [
      { name: 'Michael Jordan' },
      { name: 'LeBron James' },
      { name: 'Serena Williams' }
    ];

    setFollowers(fakeFollowers);
    setFollowing(fakeFollowing);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Followers</h3>
        <ul className="list-disc list-inside">
          {followers.length === 0 ? (
            <li>No followers yet</li>
          ) : (
            followers.map((follower, index) => (
              <li key={index}>{follower.name}</li>
            ))
          )}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Following</h3>
        <ul className="list-disc list-inside">
          {following.length === 0 ? (
            <li>Not following anyone yet</li>
          ) : (
            following.map((follow, index) => (
              <li key={index}>{follow.name}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
