import React from 'react';

// Helper function to format the date
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); 
};

const Post = ({ user, content, time, imageData, onDelete, onUpdate }) => {
  const username = user || "Unknown User"; 

  return (
    <div className='w-full rounded-md shadow-lg mt-[30px] mb-[30px]'>
      <div className='p-[10px]'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='font-bold ml-[10px] mr-[10px]'>{username}</span>
            <span className='text-sm'>{time ? formatDate(time) : 'Just now'}</span>
          </div>
          <div className='flex'>
            <button 
              onClick={onUpdate} 
              className='text-blue-500 mr-2'>
              Update
            </button>
            <button 
              onClick={onDelete} 
              className='text-red-500'>
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className='mt-[20px] mb-[20px]'>
        {/* Render the image if imageData exists */}
        {imageData && (
          <img
            src={imageData}
            alt="Uploaded content"
            className='w-full h-auto mb-[10px]'
          />
        )}
        <span>{content}</span>
      </div>
    </div>
  );
};

export default Post;