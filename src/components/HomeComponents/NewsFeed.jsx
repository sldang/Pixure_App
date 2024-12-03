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
      console.error('Error uploading post:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        data: { userId: user.user.id },
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
  const handleLike = async (postId) => {
    try {
      await axios.put(`/api/posts/${postId}/like`, { userId: user.user.id }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPosts(posts.map(post =>
        post._id === postId
          ? { ...post, likes: post.likes.includes(user.user.id) ? post.likes.filter(id => id !== user.user.id) : [...post.likes, user.user.id] }
          : post
      ));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  
  const handleComment = async (postId, commentContent) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/comments`, {
        userId: user.user.id,
        content: commentContent,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
  
      setPosts(posts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, response.data] } // Append the new comment
          : post
      ));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`/api/posts/${postId}/comments/${commentId}`, {
        data: { userId: user.user.id }, // Send the user ID for authorization
        headers: { Authorization: `Bearer ${user.token}` },
      });
  
      // Update the post's comments in the state
      setPosts(posts.map((post) =>
        post._id === postId
          ? { ...post, comments: post.comments.filter((comment) => comment._id !== commentId) }
          : post
      ));
    } catch (error) {
      console.error("Error deleting comment:", error);
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
            img={post.imageData || null} // Use imageData directly
            likes={post.likes}
            comments={post.comments || []}
            onLike={() => handleLike(post._id)}
            onComment={(commentContent) => handleComment(post._id, commentContent)}
            onDelete={() => handleDelete(post._id)}
            onUpdate={() => handleUpdate(post._id)}
            onDeleteComment={(commentId) => handleDeleteComment(post._id, commentId)} // Pass comment delete handler
          />
        ))}
      </div>
    </div>
  );
};
export default NewsFeed;