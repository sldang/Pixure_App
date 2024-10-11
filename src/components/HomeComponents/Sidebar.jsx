import React from 'react';
import { FaHome, FaSearch, FaCompass, FaEnvelope, FaBell, FaUser, FaUsers, FaSignOutAlt } from 'react-icons/fa'; // import icons from react-icons to use in navbar
import { useNavigate } from 'react-router-dom'; // import useNavigate from react-router-dom for navigation

const Sidebar = () => {
  const navigate = useNavigate();

  // redirect to the login page
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex">
      {/* sidebar container */}
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
              onClick={() => navigate('/Home')} // navigates to home page
            />
            <SidebarItem icon={<FaSearch />} label="Search" /> 
            <SidebarItem icon={<FaCompass />} label="Explore" /> 
            <SidebarItem 
              icon={<FaBell />} 
              label="Notifications" 
              hasNotifications={true} // shows notification indicator for notifications
            />
            <SidebarItem
              icon={<FaEnvelope />}
              label="Messages"
              hasNotifications={true} // shows notification indicator for this messages
              // onClick={() => navigate('/Messenger')} // navigates to the messenger
            />
            <SidebarItem icon={<FaUsers />} label="Communities" /> 
          </div>
        </div>

        {/* user section at the bottom of navbar */}
        <div className="p-4 flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <FaUser className="text-xl text-black" /> {/* user icon */}
            <span className="text-sm text-black font-medium">@username</span> 
          </div>
          {/* logout button */}
          <FaSignOutAlt
            className="text-xl text-black cursor-pointer hover:text-red-500 transition-colors duration-300" 
            onClick={handleLogout} // calls handleLogout function when clicked
          />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, hasNotifications, onClick }) => {
  return (
    <div 
      className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md transition-colors duration-300 group" 
      onClick={onClick} // calls onClick function when clicked
    >
      <div className="relative">
        <div className="text-xl text-black group-hover:text-black">{icon}</div>
        {hasNotifications ? (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        ) : null}
      </div>
      <span className="text-sm font-medium text-black group-hover:text-black">
        {label}
      </span>
    </div>
  );
};

export default Sidebar;