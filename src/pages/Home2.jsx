import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/HomeComponents/Sidebar';
import Rightbar from '../components/HomeComponents/Rightbar';
import Post from '../components/HomeComponents/Post';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const Home2 = () => {
  const { user } = useContext(AuthContext);
  const [followerPosts, setFollowerPosts] = useState([]);
  
  useEffect(() => {
    const fetchFollowerPosts = async () => {
      if (!user || !user.user?.id) {
        console.error('User ID is missing.');
        return;
      }
  
      try {
        const response = await axios.get(`/api/posts/following/${user.user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFollowerPosts(response.data);
      } catch (error) {
        console.error('Error fetching follower posts:', error.response?.data || error.message);
      }
    };
  
    fetchFollowerPosts();
  }, [user]);
  
};

export default Home2;