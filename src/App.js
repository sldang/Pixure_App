import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import MessengerPage from './pages/Messenger';

import ExplorePage from './pages/Explore';
import CommunitiesPage from './pages/Communities';
import Sidebar from './components/HomeComponents/Sidebar';  

import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import EditProfile from './components/EditProfile';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Sidebar />}  {/* sidebar will be visible if user is authenticated */}
        <div className="content">  {/* adjust layout to leave space for sidebar */}
          <Routes>
            <Route path="/" element={user ? <HomePage/> : <LoginPage/>} />

            <Route path="/signup" element={user ? <Navigate to="/Messenger"/> : <SignupPage/>} />
            <Route path="/home" element={user ? <HomePage/> : <Navigate to="/login"/>} />
            <Route path="/login" element={user ? <Navigate to="/Messenger"/> : <LoginPage/>} />
            <Route path="/messenger" element={<MessengerPage/>} />
            <Route path="/explore" element={user ? <ExplorePage/> : <Navigate to="/login"/>} />
            <Route path="/communities" element={user ? <CommunitiesPage/> : <Navigate to="/login"/>} />
            <Route path="/editprofile" element={<EditProfile/>} />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
