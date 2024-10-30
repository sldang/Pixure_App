import React from 'react'
import { useNavigate } from 'react-router-dom';

const PersonalProfile = () => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/editprofile');
  };

  return (
    <div className="max-w-lg mx-auto p-4">
    <div className="flex items-center space-x-4">
      {/* Profile Image */}
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
        <img
          src="" // Replace with your image URL
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="flex-1">
        <div className="flex items-center space-x-4 mb-2">
          <h2 className="text-2xl font-bold whitespace-nowrap">John Doe</h2>
          <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800" onClick={handleEditClick}>Edit Profile</button>
          <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">Edit Description</button>
        </div>
        <div className="flex space-x-4 mb-4">
          <p><strong>0</strong> posts</p>
          <p><strong>0</strong> followers</p>
          <p><strong>0</strong> following</p>
        </div>
      </div>
    </div>

    {/* Profile Bio */}
    <div className="mt-4">
      <p>Everyone has a story to tell. I'm gonna tell you mine.</p>
    </div>
  </div>
  )
}

export default PersonalProfile