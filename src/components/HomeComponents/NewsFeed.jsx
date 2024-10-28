import React, { useState, useEffect } from 'react';
import UploadPost from './UploadPost';
import Post from './Post';
import PersonalProfile from './PersonalProfile';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://pixure-app.onrender.com/api/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleUpload = async () => {
    try {
      const response = await fetch('https://pixure-app.onrender.com/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: postContent, time: 'Just now' }),
      });
      if (!response.ok) throw new Error('Failed to upload post');
      const newPost = await response.json();
      setPosts((prev) => [...prev, newPost]);
      setPostContent('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button onClick={handleUpload}>Post</button>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.content}</p>
          <span>{post.time}</span>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;