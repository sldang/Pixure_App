import React, { useState } from 'react';

const UploadPost = ({ postContent, setPostContent, handleUpload }) => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

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
                <input type="file" onChange={handleImageChange} /> {/* New file input for image */}
                <hr className='m-[20px]' />
                <div className="bottom flex items-center justify-between">
                    <button className='bg-black text-white p-[7px] rounded-lg' onClick={() => handleUpload(postContent, image)}>Upload</button>
                </div>
            </div>
        </div>
    );
};

export default UploadPost;