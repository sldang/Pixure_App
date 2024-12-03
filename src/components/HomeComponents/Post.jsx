import React, { useState } from 'react';

const Post = ({ user, content, time, img, likes, comments, onLike, onComment, onDelete, onUpdate }) => {
  const [commentInput, setCommentInput] = useState("");

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      onComment(commentInput);
      setCommentInput("");
    }
  };

  return (
    <div className='w-full rounded-md shadow-lg mt-[30px] mb-[30px]'>
      <div className='p-[10px]'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='font-bold ml-[10px] mr-[10px]'>{user}</span>
            <span className='text-sm'>{time}</span>
          </div>
        </div>
      </div>
      <div className='mt-[20px] mb-[20px]'>
        {img && <img src={img} alt="Uploaded content" className='w-full h-auto mb-[10px]' />}
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
          {comments.map((comment, index) => (
            <div key={index} className="text-sm">
              <strong>{comment.userId?.nickname || "Unknown User"}:</strong> {comment.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Post;