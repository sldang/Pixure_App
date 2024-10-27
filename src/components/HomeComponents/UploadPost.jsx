import React from 'react';

const UploadPost = ({ postContent, setPostContent, handleUpload }) => {
    return (
        <div className='w-full h-[150px] rounded-lg shadow-lg'>
            <div className='wrapper p-[10px]'>
                <div className='top flex items-center'>
                    <input
                        type="text"
                        placeholder='Post?'
                        className='w-[80%] focus:outline-none'
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)} // Update input state
                    />
                </div>
                <hr className='m-[20px]' />
                <div className="bottom flex items-center justify-between">
                    <div className='flex ml-[20px]'>
                        <div className='flex items-center mr-[15px] cursor-pointer'>
                            <span>Photos</span>
                        </div>
                        <div className='flex items-center mr-[15px] cursor-pointer'>
                            <span>Tags</span>
                        </div>
                        <div className='flex items-center mr-[15px] cursor-pointer'>
                            <span>Location</span>
                        </div>
                    </div>
                    <button className='bg-black text-white p-[7px] rounded-lg' onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </div>
    );
};

export default UploadPost;