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
        console.log('Fetched follower posts:', response.data); // Debugging
        setFollowerPosts(response.data);
      } catch (error) {
        console.error('Error fetching follower posts:', error.response?.data || error.message);
      }
    };

    fetchFollowerPosts();
  }, [user]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-4">
        {/* Follower Posts */}
        {followerPosts.length === 0 ? (
          <p>No posts from followed users to display.</p>
        ) : (
          followerPosts.map((post, index) => (
            <Post
              key={index}
              user={post.userId?.nickname || 'Unknown User'}
              content={post.desc}
              time={new Date(post.createdAt).toLocaleString()}
              img={post.imageData || null}
              likes={post.likes}
              comments={post.comments || []}
            />
          ))
        )}
      </div>

      {/* Rightbar */}
      <Rightbar />
    </div>
  );
};

export default Home2;
