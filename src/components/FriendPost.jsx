import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaComment, FaPaperPlane } from 'react-icons/fa';
import { MdOutlineReportProblem } from "react-icons/md";

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
      setComments([...comments, { text: newComment, timestamp: 'Just now', replies: [], likes: 0, dislikes: 0, showReplyBox: false, showReplies: false }]);
      setNewComment('');
    }
  };

  const handleReply = (commentIndex, replyText) => {
    const updatedComments = comments.map((comment, i) => {
      if (i === commentIndex) {
        return {
          ...comment,
          replies: [...comment.replies, { text: replyText, timestamp: 'Just now', likes: 0, dislikes: 0, showReplyBox: false }],
          showReplies: true
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleCommentLike = (index) => {
    const updatedComments = comments.map((comment, i) => {
      if (i === index) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleCommentDislike = (index) => {
    const updatedComments = comments.map((comment, i) => {
      if (i === index) {
        return { ...comment, dislikes: comment.dislikes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleReplyLike = (commentIndex, replyIndex) => {
    const updatedComments = comments.map((comment, i) => {
      if (i === commentIndex) {
        const updatedReplies = comment.replies.map((reply, j) => {
          if (j === replyIndex) {
            return { ...reply, likes: reply.likes + 1 };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleReplyDislike = (commentIndex, replyIndex) => {
    const updatedComments = comments.map((comment, i) => {
      if (i === commentIndex) {
        const updatedReplies = comment.replies.map((reply, j) => {
          if (j === replyIndex) {
            return { ...reply, dislikes: reply.dislikes + 1 };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleToggleReplyBox = (commentIndex) => {
    setComments(comments.map((comment, i) => {
      if (i === commentIndex) {
        return { ...comment, showReplyBox: !comment.showReplyBox, showReplies: !comment.showReplyBox ? true : false };
      } else {
        return { ...comment, showReplyBox: false, showReplies: false };
      }
    }));
  };

  const handleToggleReplyBoxForReply = (commentIndex, replyIndex) => {
    const updatedComments = comments.map((comment, i) => {
      if (i === commentIndex) {
        const updatedReplies = comment.replies.map((reply, j) => {
          return { ...reply, showReplyBox: j === replyIndex ? !reply.showReplyBox : false };
        });
        return { ...comment, replies: updatedReplies, showReplies: updatedReplies.some(reply => reply.showReplyBox) };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div className="flex justify-center w-full h-screen overflow-y-auto pt-10">
      <div className="w-full max-w-[600px] mx-4">
        <div className="w-full rounded-md shadow-lg mt-6 mb-6 bg-white relative">
          {/* Post Header */}
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-bold mr-2">Test</span>
              <span className="text-sm text-gray-500">Now</span>
            </div>
            <MdOutlineReportProblem className="text-gray-600 hover:text-red-500 cursor-pointer" />
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
                  <div key={index} className="bg-gray-50 p-2 rounded-md relative">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm">User</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <MdOutlineReportProblem className="text-gray-600 hover:text-red-500 cursor-pointer" />
                    </div>
                    <p className="text-sm mt-1">{comment.text}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <button 
                        onClick={() => handleCommentLike(index)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
                      >
                        <FaThumbsUp className="text-lg" />
                        <span>{comment.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleCommentDislike(index)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <FaThumbsDown className="text-lg" />
                        <span>{comment.dislikes}</span>
                      </button>
                      <button
                        onClick={() => handleToggleReplyBox(index)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <FaComment className="text-lg" />
                        <span>{comment.replies ? comment.replies.length : 0}</span>
                      </button>
                    </div>
                    {/* Reply Form for Initial Comment */}
                    {comment.showReplyBox && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (e.target.replyInput.value.trim()) {
                            handleReply(index, e.target.replyInput.value.trim());
                            e.target.replyInput.value = '';
                          }
                        }}
                        className="flex items-center space-x-2 mt-2"
                      >
                        <input
                          type="text"
                          name="replyInput"
                          placeholder="Write a reply..."
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                        >
                          <FaPaperPlane className="text-lg" />
                        </button>
                      </form>
                    )}
                    {/* Replies Section */}
                    {comment.showReplies && (
                      <div className="ml-6 mt-2 space-y-2">
                        {comment.replies && comment.replies.map((reply, replyIndex) => (
                          <div key={replyIndex} className="bg-gray-100 p-2 rounded-md relative">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-sm">User</span>
                                <span className="text-xs text-gray-500">{reply.timestamp}</span>
                              </div>
                              <MdOutlineReportProblem className="text-gray-600 hover:text-red-500 cursor-pointer" />
                            </div>
                            <p className="text-sm mt-1">{reply.text}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <button
                                onClick={() => handleReplyLike(index, replyIndex)}
                                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
                              >
                                <FaThumbsUp className="text-lg" />
                                <span>{reply.likes}</span>
                              </button>
                              <button
                                onClick={() => handleReplyDislike(index, replyIndex)}
                                className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                              >
                                <FaThumbsDown className="text-lg" />
                                <span>{reply.dislikes}</span>
                              </button>
                              <button
                                onClick={() => handleToggleReplyBoxForReply(index, replyIndex)}
                                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                              >
                                <FaComment className="text-lg" />
                                <span>{reply.replies ? reply.replies.length : 0}</span>
                              </button>
                            </div>
                            {reply.showReplyBox && (
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  if (e.target.replyInput.value.trim()) {
                                    handleReply(index, e.target.replyInput.value.trim());
                                    e.target.replyInput.value = '';
                                  }
                                }}
                                className="flex items-center space-x-2 mt-2"
                              >
                                <input
                                  type="text"
                                  name="replyInput"
                                  placeholder="Reply to this comment..."
                                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                  type="submit"
                                  className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
                                >
                                  <FaPaperPlane className="text-lg" />
                                </button>
                              </form>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
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
