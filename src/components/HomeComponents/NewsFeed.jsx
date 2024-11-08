import React, { useState, useEffect, useContext } from 'react';
import UploadPost from './UploadPost';
import Post from './Post';
import PersonalProfile from './PersonalProfile';
import axios from 'axios';
import { AuthContext } from "../../contexts/AuthContext";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const NewsFeed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');

  // Fetch posts from backend
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userId = user ? user.user.id : null;
        if (!userId) {
          console.error("User ID is missing.");
          return;
        }
        const response = await axios.get(`/api/posts/profile/${userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };
    fetchUserPosts();
  }, [user]);

  const handleUpload = async (postContent, image) => {
    const userId = user ? user.user.id : null;

    if (!userId) {
        console.error("User ID is missing.");
        return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("desc", postContent);
    if (image) {
        formData.append("img", image); 
    }

    try {
        const response = await axios.post(
            `https://pixure-server.onrender.com/api/posts`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }
        );

        const savedPost = response.data;
        setPosts([savedPost, ...posts]);
        setPostContent('');
    } catch (error) {
        console.error('Error uploading post:', error);
    }
};

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        data: { userId: user.user.id }, // Pass userId for verification
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = async (postId) => {
    const updatedContent = prompt("Edit your post content:");
    if (updatedContent) {
      try {
        await axios.put(`/api/posts/${postId}`, 
          { desc: updatedContent, userId: user.user.id }, 
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setPosts(posts.map((post) => 
          post._id === postId ? { ...post, desc: updatedContent } : post
        ));
      } catch (error) {
        console.error("Error updating post:", error);
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
          <Post 
            key={index}
            user={post.userId?.nickname || "Unknown User"}
            content={post.desc}
            time={post.createdAt}
            img={post.img ? `https://pixure-server.onrender.com${post.img}` : null}
            onDelete={() => handleDelete(post._id)}
            onUpdate={() => handleUpdate(post._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;