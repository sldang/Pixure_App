import React, { useState, useEffect, useContext } from 'react';
import UploadPost from './UploadPost';
import Post from './Post';
import PersonalProfile from './PersonalProfile';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const NewsFeed = () => {
  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]); // State for user's posts
  const [postContent, setPostContent] = useState('');

  // Fetch user's posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (user) {
          const response = await axios.get(`/api/posts/profile/${user.user.id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
            withCredentials: true,
          });
          setUserPosts(response.data);
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };
    fetchUserPosts();
  }, [user]);

  const handleUpload = async (postContent, image) => {
    const userId = user ? user.user.id : null;

    if (!userId) {
      console.error('User ID is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('desc', postContent);
    if (image) {
      formData.append('img', image);
    }

    try {
      const response = await axios.post(`/api/posts`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      const savedPost = response.data;
      setUserPosts([savedPost, ...userPosts]); // Add to user's posts
      setPostContent('');
    } catch (error) {
      console.error(
        'Error uploading post:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        data: { userId: user.user.id },
      });
      setUserPosts(userPosts.filter((post) => post._id !== postId)); // Remove from user's posts
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = async (postId) => {
    const updatedContent = prompt('Edit your post content:');
    if (updatedContent) {
      try {
        await axios.put(
          `/api/posts/${postId}`,
          { desc: updatedContent, userId: user.user.id },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setUserPosts(
          userPosts.map((post) =>
            post._id === postId ? { ...post, desc: updatedContent } : post
          )
        );
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.put(
        `/api/posts/${postId}/like`,
        { userId: user.user.id },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setUserPosts(
        userPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(user.user.id)
                  ? post.likes.filter((id) => id !== user.user.id)
                  : [...post.likes, user.user.id],
              }
            : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId, commentContent) => {
    try {
      const response = await axios.post(
        `/api/posts/${postId}/comments`,
        {
          userId: user.user.id,
          content: commentContent,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setUserPosts(
        userPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data] }
            : post
        )
      );
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`/api/posts/${postId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        data: { userId: user.user.id },
      });

      setUserPosts(
        userPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: post.comments.filter((c) => c._id !== commentId) }
            : post
        )
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
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
        {userPosts.length === 0 && <p>No posts to display</p>}
        {userPosts.map((post, index) => (
          <Post
            key={index}
            user={post.userId?.nickname || 'Unknown User'}
            content={post.desc}
            time={post.createdAt}
            img={post.imageData || null}
            likes={post.likes}
            comments={post.comments || []}
            onLike={() => handleLike(post._id)}
            onComment={(commentContent) => handleComment(post._id, commentContent)}
            onDelete={() => handleDelete(post._id)}
            onUpdate={() => handleUpdate(post._id)}
            onDeleteComment={(commentId) => handleDeleteComment(post._id, commentId)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
