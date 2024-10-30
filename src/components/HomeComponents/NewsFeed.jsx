import React, { useState, useEffect } from 'react';
import UploadPost from './UploadPost';
import Post from './Post';
import PersonalProfile from './PersonalProfile';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixure-server.onrender.com'; 
const NewsFeed = () => {
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
    if (postContent) {
      const newPost = { postId: Date.now().toString(), content: postContent, time: 'Just now' };
      try {
        const response = await axios.post('/api/posts', newPost, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
      if (response.status == 200) {
        setPosts((prevPosts) => [...prevPosts, response.data]);
        setPostContent('');
     } else{
        console.error('Failed to save post');
     }  
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