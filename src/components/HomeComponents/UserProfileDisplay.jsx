
import React from 'react';

const UserProfileDisplay = ({ nickname, postsCount, followersCount, followingCount }) => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            src="" // Replace with your image URL or prop if available
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-2">
            <h2 className="text-2xl font-bold whitespace-nowrap">{nickname|| "Unknown User"}</h2>
            <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">
              Edit Profile
            </button>
          </div>
          <div className="flex space-x-4 mb-4">
            <p><strong>{postsCount}</strong> posts</p>
            <p><strong>{followersCount}</strong> followers</p>
            <p><strong>{followingCount}</strong> following</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p>Everyone has a story to tell. I'm gonna tell you mine.</p>
      </div>
    </div>
  );
};

export default UserProfileDisplay;