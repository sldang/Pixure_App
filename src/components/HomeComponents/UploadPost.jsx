import React from 'react'

const UploadPost = () => {
    return (
        <div className='w-full h-[150px] rounded-lg shadow-lg'>
            <div className='wrapper p-[10px]'>
                <div className='top flex items-center'>
                    <input type="text" placeholder='Post?' className='w-[80%] focus:outline-none'/>
                </div>
                <hr className='m-[20px]'/>
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
                    <button className='bg-black text-white p-[7px] rounded-lg'>Upload</button>
                </div>
            </div>
        </div>
    )
}

export default UploadPost