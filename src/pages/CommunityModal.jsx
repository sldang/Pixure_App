
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Post from "../components/HomeComponents/Post";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const CommunityModal = ({ community, onClose }) => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [communityPosts, setCommunityPosts] = useState([]); // Posts for the community
  const [communityDetails, setCommunityDetails] = useState(null); // Community details

  // Fetch community details and posts
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        // Fetch community details
        const communityResponse = await axios.get(`/api/communities/${community.name}`, {
        });
        console.log(communityResponse);
        setCommunityDetails(communityResponse.data);

        // Fetch posts for the community
        const postsResponse = await axios.get(`/api/posts/community/${community.name}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCommunityPosts(postsResponse.data);
        console.log(communityDetails.name);
      } catch (error) {
        console.error("Error fetching community data:", error);
      }
    };

    fetchCommunityData();
  }, [community, user.token]);

  // Handle like action
  const handleLike = async (postId) => {
    try {
      await axios.put(
        `/api/posts/${postId}/like`,
        { userId: user.user.id },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setCommunityPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(user.user.id)
                  ? post.likes.filter((id) => id !== user.user.id) // Unlike
                  : [...post.likes, user.user.id], // Like
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Handle comment action
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

      setCommunityPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data] }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        {community ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{community.name}</h2>
            <p className="text-gray-700 mb-6">{community.description}</p>
          </div>
        ) : (
          <p>Loading community details...</p>
        )}
        <div className="space-y-6">
          {communityPosts.length === 0 ? (
            <p>No posts in this community yet.</p>
          ) : (
            communityPosts.map((post) => (
              <Post
                key={post._id}
                user={post.userId?.nickname || "Unknown User"}
                content={post.desc}
                time={post.createdAt}
                img={post.imageData || null}
                likes={post.likes}
                comments={post.comments || []}
                onLike={() => handleLike(post._id)}
                onComment={(commentContent) => handleComment(post._id, commentContent)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityModal;


