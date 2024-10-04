import React from 'react';

const Post = ({ user, time, content }) => {
  return (
    <div className='w-full rounded-md shadow-lg mt-[30px] mb-[30px]'>
        <div className='p-[10px]'>
            <div className='flex items-center '>
                <span className='font-bold ml-[10px] mr-[10px]'>{user}</span>
                <span className='text-sm'>{time}</span>
            </div>
        </div>
        <div className='mt-[20px] mb-[20px]'>
          <span>{content}</span>  
        </div>
    </div>
  );
};

export default Post;