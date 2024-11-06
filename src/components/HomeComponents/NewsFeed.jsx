import React, { useState, useEffect, useContext } from 'react';
import UploadPost from './UploadPost';
import Post from './Post';
import PersonalProfile from './PersonalProfile';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthContext } from "../../contexts/AuthContext"

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
    //const user = JSON.parse(localStorage.getItem('user')).user.id; // Retrieve user data from localStorage
    const userId = user ? user.user.id : null;  // Access userId
    console.log("UserId:", userId);
  
    if (!userId) {
      console.error("User ID is missing from localStorage");
      return; // Exit the function if userId is missing
    }
  
    if (postContent) {
      const newPost = { 
        
        userId: userId, // Include userId in the post data
        desc: postContent,
        img: "", // Optional image URL if applicable
        likes: [],
      };
      console.log("Data being sent to backend:", newPost);
      try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/posts`, newPost, {
          headers: { 'Content-Type': 'application/json' }
        });
        const savedPost = response.data;
        console.log('Post saved:', savedPost);
        setPosts([...posts, savedPost]);
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
          <Post key={index} user={post.user} time={post.time} content={post.content} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;