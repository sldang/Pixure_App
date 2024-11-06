import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaComment, FaPaperPlane } from 'react-icons/fa';

const FriendPost = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  const handleDislike = () => {
    setDislikes(prev => prev + 1);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, timestamp: 'Just now' }]);
      setNewComment('');
    }
  };

  return (
    <div className="flex justify-center w-full h-screen overflow-y-auto pt-10">
      <div className="w-full max-w-[600px] mx-4">
        <div className="w-full rounded-md shadow-lg mt-6 mb-6 bg-white">
          {/* Post Header */}
          <div className="p-4">
            <div className="flex items-center">
              <span className="font-bold mr-2">Test</span>
              <span className="text-sm text-gray-500">Now</span>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 py-2">
            <span>Test Message</span>
          </div>

          {/* Interaction Section */}
          <div className="px-4 py-2 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLike}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <FaThumbsUp className="text-lg" />
                <span>{likes}</span>
              </button>

              <button 
                onClick={handleDislike}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
              >
                <FaThumbsDown className="text-lg" />
                <span>{dislikes}</span>
              </button>

              <button 
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaComment className="text-lg" />
                <span>{comments.length}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="px-4 py-2 border-t border-gray-100">
              {/* Comment Form */}
              <form onSubmit={handleAddComment} className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <FaPaperPlane className="text-lg" />
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-2">
                {comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded-md">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">User</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm mt-1">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendPost;