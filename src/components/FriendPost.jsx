import React from 'react';

const FriendPost = () => {
  return (
    <div className="flex justify-center w-full h-screen overflow-y-auto pt-10">
      <div className="w-full max-w-[600px] mx-4">
        <div className="w-full rounded-md shadow-lg mt-[30px] mb-[30px] bg-white">
          <div className="p-[10px]">
            <div className="flex items-center">
              <span className="font-bold ml-[10px] mr-[10px]">Test</span>
              <span className="text-sm">Now</span>
            </div>
          </div>
          <div className="mt-[20px] mb-[20px] p-[10px]">
            <span>Test Message</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendPost;
