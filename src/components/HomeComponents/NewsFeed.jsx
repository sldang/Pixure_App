import React, { useState, useEffect } from 'react';
import UploadPost from './UploadPost';
import Post from './Post';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]); 
  const [postContent, setPostContent] = useState(''); 

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const fetchedPosts = await response.json();
          setPosts(fetchedPosts);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchPosts();
  }, []); 
  const handleUpload = async () => {
    if (postContent) {
      const newPost = {
        time: 'Just now', 
        content: postContent,
      };
      
      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost),
        });
        
        if (response.ok) {
          const savedPost = await response.json();
          setPosts([...posts, savedPost]); 
          setPostContent(''); 
        } else {
          console.error('Failed to save post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div style={{ flex: 3 }} className='pl-10 pt-5'>
      <UploadPost 
        postContent={postContent} 
        setPostContent={setPostContent} 
        handleUpload={handleUpload} 
      />
      {posts.map((post, index) => (
        <Post key={index} user={post.user} time={post.time} content={post.content} />
      ))}
    </div>
  );
};

export default NewsFeed;