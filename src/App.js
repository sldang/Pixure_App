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
import MessengerPage from './pages/Messenger'
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    //className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    //className="max-w-md w-full space-y-8"
    <div>
    <div>
     <BrowserRouter>
        <Routes>
            <Route path="/" element={user ? <HomePage/> : <LoginPage/>} />
            <Route path="/signup" element={user ? <Navigate to={"/Messenger"}/> : <SignupPage/>} />
            <Route path="/Home" element={user ? <HomePage/> : <SignupPage/>} />
            <Route path="/Login" element={user ? <Navigate to={"/Messenger"}/> : <LoginPage/>} />
            <Route path="/Messenger" element={<MessengerPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;

