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
      if (!user || !user.user?.email) {
        console.error("User email not available", user);
        return;
      }
  
      const email = user.user.email;
      console.log("Fetching follower posts for email:", email);
  
      try {
        const response = await axios.get(`/api/posts/following/${email}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
  
        if (!response.data || response.data.length === 0) {
          console.warn("No follower posts received:", response.data);
        } else {
          console.log("Follower posts fetched:", response.data);
        }
  
        setFollowerPosts(response.data || []);
      } catch (error) {
        console.error(
          "Error fetching follower posts:",
          error.response?.data || error.message
        );
      }
    };
  
    fetchFollowerPosts();
  }, [user]);
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center pt-10">
        <div className="w-full max-w-[600px] mx-4">
          {followerPosts.length === 0 ? (
            <p>No posts from followed users to display.</p>
          ) : (
            followerPosts.map((post, index) => (
              <Post
                key={index}
                user={post.userId?.nickname || 'Unknown User'}
                content={post.desc}
                time={post.createdAt}
                img={post.imageData || null}
                likes={post.likes}
                comments={post.comments || []}
              />
            ))
          )}
        </div>
      </div>
      <Rightbar />
    </div>
  );
};

export default Home2;
