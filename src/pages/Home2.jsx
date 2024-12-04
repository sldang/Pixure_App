import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/HomeComponents/Sidebar';
import Rightbar from '../components/HomeComponents/Rightbar';
import Post from '../components/HomeComponents/Post';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Home2 = () => {
  const { user } = useContext(AuthContext);
  const [followerPosts, setFollowerPosts] = useState([]);

  const BASE_URL = "https://pixure-server.onrender.com";

  useEffect(() => {
    const fetchFollowerPosts = async () => {
        if (!user || !user.user?.id) return;

        try {
            const response = await axios.get(`${BASE_URL}/api/posts/following/${user.user.id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setFollowerPosts(response.data);
        } catch (error) {
            console.error("Error fetching follower posts:", error);
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
