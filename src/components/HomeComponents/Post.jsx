import React, { useState } from 'react';

const Post = ({
  user,
  content,
  time,
  img,
  likes,
  comments = [], // Default to an empty array
  onLike,
  onComment,
  onDelete,
  onUpdate,
  onDeleteComment,
}) => {
  const [commentInput, setCommentInput] = useState("");

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      if (typeof onComment === "function") {
        onComment(commentInput); // Call the parent function
      } else {
        console.error("onComment is not a function or is missing.");
      }
      setCommentInput("");
    }
  };

  return (
    <div className="w-full rounded-md shadow-lg mt-[30px] mb-[30px]">
      <div className="p-[10px]">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold ml-[10px] mr-[10px]">{user}</span>
            <span className="text-sm">{time}</span>
          </div>
          {onUpdate && onDelete && (
            <div className="flex">
              <button onClick={onUpdate} className="text-blue-500 mr-2">Update</button>
              <button onClick={onDelete} className="text-red-500">Delete</button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-[20px] mb-[20px] pl-[30px]">
        {img && <img src={img} alt="Uploaded content" className="w-full h-auto mb-[10px]" />}
        <span>{content}</span>
      </div>
      <div className="mt-[10px]">
        <button onClick={onLike}>❤️ {likes?.length || 0}</button>
      </div>
      <div className="mt-[10px]">
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleCommentSubmit}>Comment</button>
        <div className="mt-[10px]">
          {Array.isArray(comments) && comments.map((comment, index) => (
            <div key={index} className="text-sm flex justify-between items-center">
              <span>
                <strong>{comment.userId?.nickname || "Unknown User"}:</strong> {comment.content}
              </span>
              {onDeleteComment && (
                <button
                  className="text-red-500 ml-2"
                  onClick={() => onDeleteComment(comment._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
