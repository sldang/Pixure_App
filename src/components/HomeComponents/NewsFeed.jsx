import React from 'react'
import UploadPost from './UploadPost'
import Post from './Post'

const NewsFeed = () => {
  return (
    <div style = {{flex: 3}} className='pl-10 pt-5'>
    <UploadPost />
    <Post />
    </div>
  )
}

export default NewsFeed