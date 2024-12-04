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
    const fetchFollowedPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/followed-posts/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
    
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts from followed users:", error.message);
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
