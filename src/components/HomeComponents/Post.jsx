import React from 'react'

const Post = () => {
  return (
    <div className='w-full rounded-md shadow-lg mt-[30px] mb-[30px]'>
        <div className='p-[10px]'>
            <div className='flex items-center '>
                <span className='font-bold ml-[10px] mr-[10px]'>Test User</span>
                <span className='text-sm'>20 minutes ago</span>
            </div>
        </div>
        <div className='mt-[20px] mb-[20px]'>
          <span>This is a test post</span>  
        </div>
    </div>
  )
}

export default Post