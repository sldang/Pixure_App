import React, { useState } from 'react';
import UploadPost from './UploadPost';
import Post from './Post';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]); 
  const [postContent, setPostContent] = useState(''); 


  const handleUpload = () => {
    if (postContent) {
      const newPost = {
        user: 'Test User', 
        time: 'Just now', 
        content: postContent,
      };
      setPosts([...posts, newPost]);
      setPostContent(''); 
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