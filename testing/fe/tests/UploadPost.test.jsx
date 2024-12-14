import React, { useState } from 'react';
import UploadPost from '../../../src/components/HomeComponents/UploadPost.test'; 

const ParentComponent = () => {
    const [postContent, setPostContent] = useState('');

    const handleUpload = (content, image, category) => {
        // Handle the post upload (e.g., send to an API)
        console.log('Post Content:', content);
        console.log('Uploaded Image:', image);
        console.log('Category:', category);
    };

    return (
        <div className="p-6">
            <UploadPost
                postContent={postContent}
                setPostContent={setPostContent}
                handleUpload={handleUpload}
            />
        </div>
    );
};

export default ParentComponent;
