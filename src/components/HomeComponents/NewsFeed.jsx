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

  // Fetch user's posts from backend
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userId = user ? user.user.id : null;
        if (!userId) {
          console.error("User ID is missing.");
          return;
        }

        const response = await axios.get(
          `https://pixure-server.onrender.com/api/posts/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            withCredentials: true,
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };
    fetchUserPosts();
  }, [user]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setPosts(posts.filter(post => post._id !== postId)); // Remove deleted post from the UI
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = async (postId, updatedContent) => {
    try {
      const response = await axios.put(`/api/posts/${postId}`, 
        { desc: updatedContent, userId: user.user.id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      setPosts(posts.map(post => post._id === postId ? { ...post, desc: updatedContent } : post)); // Update post in the UI
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleUpload = async () => { 
    const userId = user ? user.user.id : null;

    if (!userId) {
      console.error("User ID is missing.");
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
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post, index) => (
            <Post 
              key={index} 
              post={post} 
              user={post.userId?.nickname || "Unknown User"} // Display nickname, fallback to "Unknown User" if missing
              content={post.desc} 
              time={post.createdAt} // Assuming createdAt is a timestamp from your backend
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NewsFeed;