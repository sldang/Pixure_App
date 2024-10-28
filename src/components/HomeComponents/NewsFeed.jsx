import React, { useState, useEffect } from 'react';
import UploadPost from './UploadPost';
import Post from './Post';
import PersonalProfile from './PersonalProfile';

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
