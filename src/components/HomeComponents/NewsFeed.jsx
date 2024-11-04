import React, { useState, useEffect } from 'react';
import UploadPost from './UploadPost';
import Post from './Post';
import PersonalProfile from './PersonalProfile';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL; 
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
        const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage

        const newPost = { 
            desc: postContent,  // Only include `desc`, `img`, and `likes`, not `userId`
            img: "",            // Optional: specify an image URL if applicable
            likes: [],
        };

        try {
            const response = await axios.post('/api/posts', newPost, {
                headers: {
                    "Authorization": `Bearer ${token}`,  // Include the token in the Authorization header
                    "Content-Type": "application/json",
                },
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