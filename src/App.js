import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import MessengerPage from './pages/Messenger'

function App() {
  
  return (
    //className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    //className="max-w-md w-full space-y-8"
    <div>
    <div>
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/Home" element={<HomePage/>} />
            <Route path="/Messenger" element={<MessengerPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;

