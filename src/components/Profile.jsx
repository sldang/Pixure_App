import React from 'react'
import Yoshi from './yoshi.jpg'

const Profile = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
    <div className="flex items-center space-x-4">
      {/* Profile Image */}
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
        <img
          src={Yoshi}// Replace with your image URL
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <h2 className="text-2xl font-bold">John Doe</h2>
        </div>
        <div className="flex space-x-4 mb-4">
          <p><strong>722</strong> posts</p>
          <p><strong>25.1m</strong> followers</p>
          <p><strong>6</strong> following</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">Follow</button>
          <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">Message</button>
        </div>
      </div>
    </div>

    {/* Profile Bio */}
    <div className="mt-4">
      <p>Everyone has a story to tell. Let's tell yours.</p>
    </div>
  </div>
  )
}

export default Profile

/* --Alexander
chatGPT recomended changes:
import React from 'react';

const Profile = ({ profile }) => {
  const { name, posts, followers, following, bio, image } = profile;

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center space-x-4">
        {** Profile Image **}
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <img
            src={image}
            alt={`${name}'s profile picture`}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => (e.target.src = '/path-to-default-image.jpg')}
          />
        </div>

        {** Profile Info **}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h2 className="text-2xl font-bold">{name}</h2>
          </div>
          <div className="flex space-x-4 mb-4">
            <p><strong>{posts}</strong> posts</p>
            <p><strong>{followers}</strong> followers</p>
            <p><strong>{following}</strong> following</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 transition-all duration-200">
              Follow
            </button>
            <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 transition-all duration-200">
              Message
            </button>
          </div>
        </div>
      </div>

      {** Profile Bio **}
      <div className="mt-4">
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default Profile;

*/