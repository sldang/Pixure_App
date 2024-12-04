import React, { useState, useEffect } from "react";
import { FaHome, FaSearch, FaCompass, FaEnvelope, FaBell, FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import socket from "../../socket";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const parsedData = JSON.parse(localStorage.getItem("user"));
  const userId = parsedData?.user?.id;
  const token = parsedData?.token;
  const userNickname = parsedData?.user?.nickname;

  const defaultProfileImage = "https://via.placeholder.com/150";

  // Fetch Profile Image
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`/api/users/profile/${user.user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProfileImage(data.profilePicture || null);
      } catch (error) {
        console.error("Error fetching profile image:", error);
        setProfileImage(null);
      }
    };
    fetchProfileImage();
  }, [userId, token]);

  // Handle Friend Request
  const makeFriend = async (e) => {
    e.preventDefault();
    try {
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const followeeResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/by-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: searchQuery }),
      });

      if (!followeeResponse.ok) {
        console.error("Failed to fetch followee ID");
        return;
      }

      const followeeData = await followeeResponse.json();
      const followeeId = followeeData._id;

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/follow`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          followerEmail: userEmail, // Logged-in user's email
          followeeEmail: searchQuery // Email of the user to follow
        }),
      });
      
      if (response.ok) {
        console.log("Followed successfully");
      } else {
        console.error("Failed to follow:", response.statusText);
      }
    } catch (error) {
      console.error("Error in makeFriend:", error);
    }
  };

  // Search Filter
  const users = ["John Doe", "Jane Smith", "Emily Stone"];
  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter((user) => user.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchQuery]);

  // Socket Notifications
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => console.log("Connected to server"));
    socket.on("notification", (data) => console.log("New notification:", data));
    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, []);

  // Handle Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Toggle Notifications
  const toggleNotifications = () => {
    setIsNotificationsVisible((prev) => !prev);
  };

  // Navigate to Profile
  const handleProfileClick = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="flex">
      <div className="bg-white text-black flex flex-col justify-between h-screen w-60 fixed left-0 top-0 border-r p-4">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <span className="text-3xl lg:text-4xl font-bold text-black">P</span>
            <span className="text-xl font-semibold text-black">Pixure</span>
          </div>
          <div className="space-y-6">
            <SidebarItem icon={<FaHome />} label="Home" onClick={() => navigate("/home")} />
            <SidebarItem icon={<FaSearch />} label="Search" onClick={() => setIsSearchVisible(!isSearchVisible)} />
            {isSearchVisible && (
              <div>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-md"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="text-blue-500 text-sm font-semibold" onClick={makeFriend}>
                  Follow
                </button>
                <div className="mt-2">{filteredUsers.map((user, index) => <div key={index} className="py-1">{user}</div>)}</div>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <img src={profileImage || defaultProfileImage} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            <span className="text-sm text-black font-medium" onClick={handleProfileClick}>{userNickname}</span>
          </div>
          <FaSignOutAlt
            className="text-xl text-black cursor-pointer hover:text-red-500 transition-colors duration-300"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick }) => (
  <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md" onClick={onClick}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default Sidebar;
