import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';  // Import Socket.IO client
import UploadPost from './UploadPost';
import Post from './Post';
import PersonalProfile from './PersonalProfile';

// Connect to the Socket.IO server
const socket = io('https://pixure-app.onrender.com');

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://pixure-app.onrender.com/api/posts');
        if (response.ok) {
          const text = await response.text();  // Read as plain text first
          const fetchedPosts = text ? JSON.parse(text) : [];  // Safely parse
          console.log('Fetched Posts:', fetchedPosts);
          setPosts(fetchedPosts);
        } else {
          console.error('Failed to fetch posts, status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    

    fetchPosts();

    // Listen for real-time post updates via Socket.IO
    socket.on('postAdded', (newPost) => {
      console.log('New Post Received via Socket:', newPost); // Debugging log
      setPosts((prevPosts) => [...prevPosts, newPost]);
    });

    // Cleanup on component unmount
    return () => socket.off('postAdded');
  }, []);

  const handleUpload = async () => {
    if (postContent) {
      const newPost = { time: 'Just now', content: postContent };
  
      try {
        const response = await fetch('https://pixure-app.onrender.com/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPost),
        });
  
        if (response.ok) {
          const text = await response.text();  // Read as plain text first
          const savedPost = text ? JSON.parse(text) : {};  // Parse only if not empty
          console.log('Saved Post:', savedPost);
          setPosts((prevPosts) => [...prevPosts, savedPost]);
          setPostContent('');  // Clear the input field
        } else {
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
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Post key={index} user={post.user || 'Anonymous'} time={post.time} content={post.content} />
          ))
        ) : (
          <p>No posts to display</p>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;