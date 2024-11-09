import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const UserProfileDisplay = ({ 
  nickname, 
  postsCount, 
  followersCount, 
  followingCount, 
  onEdit,
  initialBio = "Everyone has a story to tell. I'm gonna tell you mine."
}) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(initialBio);
  const [tempBio, setTempBio] = useState(bio);
  const [profileImage, setProfileImage] = useState('/api/placeholder/96/96');

  const handleBioSave = () => {
    setBio(tempBio);
    setIsEditingBio(false);
  };

  const handleBioCancel = () => {
    setTempBio(bio);
    setIsEditingBio(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-24 group">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
          <label className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
            <span className="text-white text-sm">Change</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-2">
            <h2 className="text-2xl font-bold whitespace-nowrap">{nickname || "Unknown User"}</h2>
            <button 
              className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800" 
              onClick={onEdit}
            >
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
        {isEditingBio ? (
          <div className="space-y-2">
            <textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleBioSave}
                className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800"
              >
                Save
              </button>
              <button
                onClick={handleBioCancel}
                className="bg-gray-200 px-4 py-1 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <p>{bio}</p>
            <button
              onClick={() => setIsEditingBio(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaEdit className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileDisplay;
