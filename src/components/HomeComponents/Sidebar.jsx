
import React, { useState, useEffect } from 'react';
import { FaHome, FaSearch, FaCompass, FaEnvelope, FaBell, FaUser, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import socket from '../../socket';


const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false); // toggle notifications visibility
  const [profileImage, setProfileImage] = useState(null); // user profile image state
  const parsedData = JSON.parse(localStorage.getItem('user'));
  const userEmail = parsedData && parsedData.user ? parsedData.user.email : null;
  const userNickname = parsedData && parsedData.user ? parsedData.user.nickname : null;
  
  // example notifications
  const [notifications] = useState([
    { user: 'John Doe', content: 'liked your post', time: '1d ago' },
    { user: 'Jane Smith', content: 'commented: "Nice post!"', time: '2d ago' },
    { user: 'John Doe', content: 'followed you', time: '3d ago' },
  ]);

  const makeFriend = async (e) => {
    e.preventDefault();
    try {
      if (!userEmail) {
        console.error("User email not found in localStorage");
        return;
      }
  
      // Fetch followee's email using the search query
      const followeeResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/by-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: searchQuery }),
      });
  
      if (!followeeResponse.ok) {
        console.error("Failed to fetch followee email");
        return;
      }
  
      const followeeData = await followeeResponse.json();
      const followeeEmail = followeeData.email; // Ensure the API returns the followee email
  
      // Send follow request with emails
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/follow`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          followerEmail: userEmail, // Logged-in user's email
          followeeEmail, // Email of the user to follow
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Followed successfully:", data);
      } else {
        console.error("Failed to follow:", response.statusText);
      }
    } catch (error) {
      console.error("Error in makeFriend:", error);
    }
  };
  
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileImage(data.profileImage || null);
      } catch (error) {
        console.error('Error fetching profile image:', error);
        setProfileImage(null);
      }
    };
    fetchProfileImage();
  }, []);

  const defaultProfileImage = 'https://via.placeholder.com/150';

  const users = ['John Doe', 'Jane Smith', 'Emily Stone'];

  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter(user => user.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('notification', (data) => {
      console.log('New notification:', data);
    });

    return () => {
      socket.off('notification');
      socket.disconnect();
    };
  }, []);

  const handleLogout = () => {
    logout();

    navigate('/');
  };

  // toggle notifications visibility
  const toggleNotifications = () => {
    setIsNotificationsVisible(prevState => !prevState);
  };

  // navigate to profile page
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="flex">
      <div className="bg-white text-black flex flex-col justify-between h-screen w-60 fixed left-0 top-0 border-r p-4">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <span className="text-3xl lg:text-4xl font-bold text-black">P</span>
            <span className="text-xl font-semibold text-black">Pixure</span>
          </div>

          {/* sidebar links */}
          <div className="space-y-6">
            <SidebarItem
              icon={<FaHome />}
              label="Home"
              onClick={() => navigate('/home')}
            />
            <SidebarItem
              icon={<FaSearch />}
              label="Search"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            />
            {isSearchVisible && (
              <div>
                {/* <input
                  placeholder="Search for friends"
                  className="chatMenuInput"
                  value={chatMenuInput}
                  onChange={(e) => setChatMenuInput(e.target.value)}
                /> */}
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-md"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="text-blue-500 text-sm font-semibold"
                  onClick={(e) => makeFriend(e)}
                >
                  Follow
                </button>
                <div className="mt-2">
                  {filteredUsers.map((user, index) => (
                    <div key={index} className="py-1">{user}</div>
                  ))}
                </div>
              </div>
            )}
            <SidebarItem
              icon={<FaCompass />}
              label="Explore"
              onClick={() => navigate('/explore')}
            />
            <SidebarItem
              icon={<FaBell />}
              label="Notifications"
              onClick={toggleNotifications} // toggle notifications on click
            />
            {isNotificationsVisible && (
              <div className="absolute bg-white shadow-lg p-4 rounded-lg top-16 left-60 w-80 z-50">
                <h2 className="font-bold text-lg mb-2">Notifications</h2>
                {notifications.map((notif, index) => (
                  <div key={index} className="py-2 border-b">
                    <p><strong>{notif.user}</strong> {notif.content}</p>
                    <span className="text-xs text-gray-500">{notif.time}</span>
                  </div>
                ))}
              </div>
            )}
            <SidebarItem
              icon={<FaEnvelope />}
              label="Messages"
              onClick={() => navigate('/messenger')}
            />
            <SidebarItem
              icon={<FaUsers />}
              label="Communities"
              onClick={() => navigate('/communities')}
            />
          </div>
        </div>

        {/* user section */}
        <div className="p-4 flex items-center justify-between w-full cursor-pointer" >
          <div className="flex items-center space-x-2">
            <img
              src={profileImage || defaultProfileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
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
  <div
    className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md transition-colors duration-300 group"
    onClick={onClick}
  >
    <div className="relative">
      <div className="text-xl text-black group-hover:text-black">{icon}</div>
    </div>
    <span className="text-sm font-medium text-black group-hover:text-black">
      {label}
    </span>
  </div>
);

export default Sidebar;
