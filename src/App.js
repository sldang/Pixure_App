// src/App.js
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import MessengerPage from './pages/Messenger';
import FriendPage from './components/FriendPost';
import ExplorePage from './pages/Explore';
import CommunitiesPage from './pages/Communities';
import CreateCommunity from './components/CreateCommunity';
import Sidebar from './components/HomeComponents/Sidebar';
import EditProfile from './components/EditProfile';

import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { CommunityProvider } from './contexts/CommunityContext';

// ProtectedRoute Component
const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Sidebar />}
        <div className="content">
          <CommunityProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignupPage />} />
              <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginPage />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute user={user}><FriendPage /></ProtectedRoute>} />
              <Route path="/home" element={<ProtectedRoute user={user}><FriendPage /></ProtectedRoute>} />
              <Route path="/messenger" element={<ProtectedRoute user={user}><MessengerPage /></ProtectedRoute>} />
              <Route path="/explore" element={<ProtectedRoute user={user}><ExplorePage /></ProtectedRoute>} />
              <Route path="/communities" element={<ProtectedRoute user={user}><CommunitiesPage /></ProtectedRoute>} />
              <Route path="/create-community" element={<ProtectedRoute user={user}><CreateCommunity /></ProtectedRoute>} />
              <Route path="/editprofile" element={<ProtectedRoute user={user}><EditProfile /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute user={user}><HomePage /></ProtectedRoute>} />
            </Routes>
          </CommunityProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
