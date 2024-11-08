import React, { useState, useEffect, useContext } from 'react';
import UploadPost from './UploadPost';
import Post from './Post';
import PersonalProfile from './PersonalProfile';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthContext } from "../../contexts/AuthContext";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL; 

const NewsFeed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleUpload = async () => { 
    const userId = user ? user.user.id : null;

    if (!userId) {
      console.error("User ID is missing from localStorage");
      return; // Exit the function if userId is missing
    }

    const newPost = { 
      userId: userId,
      desc: postContent,
      img: "", // Optional image URL if applicable
      likes: [],
    };

    if (postContent) {
      console.log("Data being sent to backend:", newPost);
      try {
        const response = await axios.post(
          `https://pixure-server.onrender.com/api/posts`,
          newPost,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
            baseURL: `https://pixure-server.onrender.com`,
            withCredentials: true,
          }
        );
        const savedPost = response.data;
        console.log('Post saved:', savedPost);

        // Add the new post to the list of posts
        setPosts([savedPost, ...posts]);
        setPostContent('');
      } catch (error) {
        console.error('Error uploading post:', error);
      }
    }
  };

  return (
    <div className="flex justify-center w-full h-screen items-start pt-10">
      <div className="w-full max-w-[600px] ml-10">
        <PersonalProfile />
        <UploadPost
          postContent={postContent}
          setPostContent={setPostContent}
          handleUpload={handleUpload}
        />
        {posts.map((post, index) => (
          <Post 
            key={index} 
            user={post.userId?.nickname || "Unknown User"} // Display nickname, fallback to "Unknown User" if missing
            content={post.desc} 
            time={post.createdAt} // Assuming createdAt is a timestamp from your backend
          />
        ))}
      </div>
    </div>
  );
}
export default NewsFeed;