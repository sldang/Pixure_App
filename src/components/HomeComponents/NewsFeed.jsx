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
    <div className="flex justify-center w-full h-screen items-start pt-10">
      <div className="w-full max-w-[600px] ml-10"> 
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
