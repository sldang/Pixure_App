import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";

const API_BASE_URL =  "https://pixure-app-3h6l.onrender.com";

const UserProfileDisplay = ({
  nickname,
  postsCount,
  followersCount,
  followingCount,
  onEdit,
}) => {
  const { user } = useContext(AuthContext);
  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(
    "Everyone has a story to tell. I'm gonna tell you mine."
  );
  const [tempBio, setTempBio] = useState(bio);
  const [profilePicture, setProfilePicture] = useState("/api/placeholder/96/96");

  // Handlers for modals
  const handleFollowersClick = () => setFollowersModalOpen(true);
  const handleFollowingClick = () => setFollowingModalOpen(true);
  const closeModal = () => {
    setFollowersModalOpen(false);
    setFollowingModalOpen(false);
  };

  // Handlers for editing the bio
  const handleBioSave = () => {
    setBio(tempBio);
    setIsEditingBio(false);
  };

  const handleBioCancel = () => {
    setTempBio(bio);
    setIsEditingBio(false);
  };

  // Handler for changing profile image
  const handleImageChange = async (e) => {
    const userId = user ? user.user.id : null;
    const file = e.target.files[0];
    if(!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await fetch(`/api/users/${userId}/upload`, {
        method: 'POST',
        body: formData,
      });

      if(!response.ok) {
        throw new Error(`Failed to upload image. Status: ${response.status}`);
      }

      const data = await response.json();
      setProfilePicture(data.profilePicture);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const userId = user ? user.user.id : null;
        const response = await fetch(`${API_BASE_URL}/api/users/profile/${userId}`);
        const data = await response.json();
        setProfilePicture(data.profilePicture || `${API_BASE_URL}/api/placeholder/96/96`);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-6">
        {/* Profile Image */}
        <div className="relative w-32 h-32 group">
          <img
            src={profilePicture}
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

        {/* Profile Info */}
        <div className="flex-1">
            <div className="flex items-center space-x-4 mb-2">
            <h2 className="text-2xl font-bold whitespace-nowrap">{nickname || "Unknown User"}</h2>
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-md shadow-sm hover:bg-blue-600 transition"
              onClick={onEdit}
            >
              Edit Profile
            </button>
          </div>
          <div className="flex space-x-3 text-gray-600">
            <p>
              <strong>{postsCount}</strong> posts
            </p>
            <p>
              <strong>{followersCount}</strong>{" "}
              <span
                className="text-black cursor-pointer hover:text-gray-500 transition"
                onClick={handleFollowersClick}
              >
                followers
              </span>
            </p>
            <p>
              <strong>{followingCount}</strong>{" "}
              <span
                className="text-black cursor-pointer hover:text-gray-500 transition"
                onClick={handleFollowingClick}
              >
                following
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Profile Bio */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        {isEditingBio ? (
          <div className="space-y-2">
            <textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              rows={3}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleBioSave}
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
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

      {/* Followers Modal */}
      {isFollowersModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Followers</h3>
            <ul className="space-y-3">
              {["Test1", "Test2", "Test3", "Test4", "Test5"].map((follower) => (
                <li
                  key={follower}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <p className="text-gray-700 font-medium">{follower}</p>
                  </div>
                  <button className="text-blue-500 font-medium hover:underline">
                    Message
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-md shadow-sm hover:bg-blue-600 transition w-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {isFollowingModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Following</h3>
            <ul className="space-y-3">
              {["Test6", "Test7", "Test8", "Test9", "Test10"].map((following) => (
                <li
                  key={following}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <p className="text-gray-700 font-medium">{following}</p>
                  </div>
                  <button className="text-blue-500 font-medium hover:underline">
                    Message
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-md shadow-sm hover:bg-blue-600 transition w-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDisplay;
