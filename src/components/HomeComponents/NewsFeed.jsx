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
        const response = await fetch('https://pixure-app-3h6l.onrender.com/api/posts');
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
    if (postContent) {
      const newPost = { content: postContent, time: 'Just now' };
  
      try {
        const response = await fetch('https://pixure-app-3h6l.onrender.com/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost),
        });
  
        if (!response.ok) {
          console.error('Failed to save post');
          return;
        }
  
        const savedPost = await response.json().catch(() => {
          console.warn('Response is not valid JSON'); // Handle invalid JSON
          return null;
        });
  
        if (savedPost) {
          setPosts([...posts, savedPost]);
          setPostContent('');
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