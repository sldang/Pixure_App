import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaComment, FaPaperPlane } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";



const CommunityModal = ({ community, onClose }) => {
  const [posts, setPosts] = useState();
  fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/community/${community}`)
      .then((response) => response.json())
      .then((data) => {
        // Map the fetched data to match the expected structure
        const formattedData = data.map((community) => ({
          name: community.name,
          description: community.description,
          imageUrl: community.imageUrl || 'https://via.placeholder.com/100x100',
          members: community.communityMembers.length || 0,
        }));
        setPosts(formattedData); // Update state
      })
      .catch((error) => console.error('Error fetching communities:', error));
  // const placeholderPosts = [
  //   {
  //     id: 1,
  //     user: "User1",
  //     content: "This is a placeholder post. Feel free to share your thoughts here!",
  //     timestamp: "2 hours ago",
  //     likes: 14,
  //     dislikes: 3,
  //     comments: [
  //       {
  //         user: "Commenter1",
  //         text: "Thanks for starting this discussion!",
  //         timestamp: "1 hour ago",
  //         likes: 2,
  //         dislikes: 0,
  //         replies: [],
  //       },
  //       {
  //         user: "Commenter2",
  //         text: "Interesting point!",
  //         timestamp: "30 minutes ago",
  //         likes: 1,
  //         dislikes: 1,
  //         replies: [],
  //       },
  //     ],
  //   },
  //   {
  //     formattedData
  //   },
  //   {
  //     id: 3,
  //     user: "User3",
  //     content: "Does anyone have resources or tips to share? Let's help each other grow!",
  //     timestamp: "1 day ago",
  //     likes: 22,
  //     dislikes: 5,
  //     comments: [
  //       {
  //         user: "Commenter3",
  //         text: "Here's a helpful article I found!",
  //         timestamp: "20 hours ago",
  //         likes: 4,
  //         dislikes: 1,
  //         replies: [],
  //       },
  //     ],
  //   },
  //];

  //const [posts, setPosts] = useState(community?.posts || placeholderPosts);

  if (!community) return null;


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white w-4/5 h-5/6 rounded-md shadow-lg overflow-y-auto relative">
        {/* Modal Header */}
        <div className="bg-gray-100 p-4 border-b border-gray-200 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{community.name}</h1>
          <p className="text-gray-600">{community.members} members</p>
          <p className="text-gray-500">{community.description}</p>
        </div>

        {/* Posts Section */}
        <div className="p-4 space-y-4">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        user: "You",
        text: newComment,
        timestamp: "Just now",
        likes: 0,
        dislikes: 0,
        replies: [],
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-sm text-left">
      {/* Post Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <strong className="font-bold text-gray-800">{post.user}</strong>
          <span className="text-sm text-gray-500 ml-2">{post.timestamp}</span>
        </div>
        <MdOutlineReportProblem className="text-gray-500 hover:text-red-500 cursor-pointer" />
      </div>

      {/* Post Content */}
      <p className="text-gray-700 mb-3">{post.content}</p>

      {/* Interaction Section */}
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
          onClick={() => setLikes(likes + 1)}
        >
          <FaThumbsUp className="text-lg" />
          <span>{likes}</span>
        </button>
        <button
          className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
          onClick={() => setDislikes(dislikes + 1)}
        >
          <FaThumbsDown className="text-lg" />
          <span>{dislikes}</span>
        </button>
        <button
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
          onClick={() => setShowComments(!showComments)}
        >
          <FaComment className="text-lg" />
          <span>{comments.length}</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 border-t pt-4 space-y-4">
          {comments.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              comments={comments}
              setComments={setComments}
              commentIndex={index}
            />
          ))}
          <form onSubmit={handleAddComment} className="flex items-center space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 text-blue-500 hover:text-blue-600"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const Comment = ({ comment, comments, setComments, commentIndex }) => {
  const [newReply, setNewReply] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleAddReply = (e) => {
    e.preventDefault();
    if (newReply.trim()) {
      const newReplyObj = {
        user: "You",
        text: newReply,
        timestamp: "Just now",
        likes: 0,
        dislikes: 0,
      };
      const updatedComments = [...comments];
      updatedComments[commentIndex].replies.push(newReplyObj);
      setComments(updatedComments);
      setNewReply("");
      setShowReplyBox(false);
    }
  };

  return (
    <div className="bg-white p-2 rounded-md">
      <div className="flex justify-between items-center">
        <div>
          <strong className="text-sm text-gray-800">{comment.user}</strong>
          <span className="text-xs text-gray-500 ml-2">{comment.timestamp}</span>
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-2">{comment.text}</p>
      <button
        className="text-sm text-blue-500 mt-2"
        onClick={() => setShowReplyBox(!showReplyBox)}
      >
        Reply
      </button>

      {showReplyBox && (
        <form
          onSubmit={handleAddReply}
          className="mt-2 flex items-center space-x-2"
        >
          <input
            type="text"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-1 text-blue-500 hover:text-blue-600"
          >
            <FaPaperPlane />
          </button>
        </form>
      )}

      {comment.replies?.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply, i) => (
            <div key={i} className="ml-4 bg-gray-50 p-2 rounded-md">
              <strong className="text-sm">{reply.user}</strong>
              <p className="text-xs text-gray-600 mt-1">{reply.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityModal;
