// //import React, { useState } from "react";
// import { FaThumbsUp, FaThumbsDown, FaComment, FaPaperPlane } from "react-icons/fa";
// import { MdOutlineReportProblem } from "react-icons/md";
// import React, { useState, useEffect, useContext } from "react";

// //import Post from "../components/HomeComponents/Post";
// import axios from "axios";
// import { AuthContext } from "../contexts/AuthContext";




// const CommunityModal = ({ community, onClose }) => {
//   //const { user } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {

//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_SERVER_URL}/api/posts/community/${community}`
//         );
//         const data = response.data;

//         const formattedPosts = data.map((post) => ({
//           id: post._id,
//           user: post.userId?.nickname || "Unknown User",
//           content: post.desc || "No content available",
//           likes: post.likes.length,
//           dislikes: 0,
//           comments: post.comments || [],
//           timestamp: new Date(post.createdAt).toLocaleString(),
//         }));
//         console.log(community);
//         setPosts(formattedPosts);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, [community]);

//   if (!community) return null;

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
//       <div className="bg-white w-4/5 h-5/6 rounded-md shadow-lg overflow-y-auto relative">
//         {/* Modal Header */}
//         <div className="bg-gray-100 p-4 border-b border-gray-200 text-center">
//           <h1 className="text-3xl font-bold text-gray-800">{community.name}</h1>
//           <p className="text-gray-600">{community.members} members</p>
//           <p className="text-gray-500">{community.description}</p>
//         </div>

//         {/* Posts Section */}
//         <div className="p-4 space-y-4">
//           {posts.length > 0 ? (
//             posts.map((post, index) => <Post key={index} post={post} />)
//           ) : (
//             <p className="text-gray-500 text-center">No posts available.</p>
//           )}
//         </div>

//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
//           onClick={onClose}
//         >
//           &times;
//         </button>
//       </div>
//     </div>
//   );
// };

// const Post = ({ post }) => {
//   const [likes, setLikes] = useState(post.likes || 0);
//   const [dislikes, setDislikes] = useState(post.dislikes || 0);
//   const [comments, setComments] = useState(post.comments || []);
//   const [newComment, setNewComment] = useState("");
//   const [showComments, setShowComments] = useState(false);

//   const handleAddComment = (e) => {
//     e.preventDefault();
//     if (newComment.trim()) {
//       const newCommentObj = {
//         user: "You",
//         text: newComment,
//         timestamp: "Just now",
//       };
//       setComments([...comments, newCommentObj]);
//       setNewComment("");
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-4 rounded-md shadow-sm text-left">
//       <div className="flex justify-between items-center mb-2">
//         <div>
//           <strong className="font-bold text-gray-800">{post.user}</strong>
//           <span className="text-sm text-gray-500 ml-2">{post.timestamp}</span>
//         </div>
//         <MdOutlineReportProblem className="text-gray-500 hover:text-red-500 cursor-pointer" />
//       </div>

//       <p className="text-gray-700 mb-3">{post.content}</p>

//       <div className="flex items-center space-x-4">
//         <button
//           className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
//           onClick={() => setLikes(likes + 1)}
//         >
//           <FaThumbsUp className="text-lg" />
//           <span>{likes}</span>
//         </button>
//         <button
//           className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
//           onClick={() => setDislikes(dislikes + 1)}
//         >
//           <FaThumbsDown className="text-lg" />
//           <span>{dislikes}</span>
//         </button>
//         <button
//           className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
//           onClick={() => setShowComments(!showComments)}
//         >
//           <FaComment className="text-lg" />
//           <span>{comments.length}</span>
//         </button>
//       </div>

//       {showComments && (
//         <div className="mt-4 border-t pt-4 space-y-4">
//           {comments.map((comment, index) => (
//             <div key={index} className="bg-gray-50 p-2 rounded-md">
//               <strong className="text-sm">{comment.user || "Anonymous"}</strong>
//               <p className="text-xs text-gray-600 mt-1">{comment.text}</p>
//             </div>
//           ))}
//           <form onSubmit={handleAddComment} className="flex items-center space-x-2">
//             <input
//               type="text"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Write a comment..."
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="submit"
//               className="p-2 text-blue-500 hover:text-blue-600"
//             >
//               <FaPaperPlane />
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };


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
        const communityResponse = await axios.get(`/api/communities?community=${community.name}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCommunityDetails(communityResponse);

        // Fetch posts for the community
        const postsResponse = await axios.get(`/api/posts/community/${community.name}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCommunityPosts(postsResponse.data);
        console.log(communityResponse.name);
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
        {communityDetails ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{communityDetails.name}</h2>
            <p className="text-gray-700 mb-6">{communityDetails.description}</p>
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


