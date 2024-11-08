import React from 'react';

const Post = ({ postId, user, content, time, onEdit, onDelete }) => {
  const username = user || 'Unknown User'; // user will be nickname if populated correctly

  return (
    <div className='w-full rounded-md shadow-lg mt-[30px] mb-[30px]'>
      <div className='p-[10px]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <span className='font-bold ml-[10px] mr-[10px]'>{username}</span>
            <span className='text-sm'>{time || 'Just now'}</span>
          </div>
          <div>
            <button
              className='text-blue-500 mr-2'
              onClick={() => onEdit(postId)}
            >
              Edit
            </button>
            <button
              className='text-red-500'
              onClick={() => onDelete(postId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className='mt-[20px] mb-[20px]'>
        <span>{content}</span>
      </div>
    </div>
  );
};

export default Post;