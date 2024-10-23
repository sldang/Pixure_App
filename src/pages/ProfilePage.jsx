import React from 'react'
import Profile from '../components/Profile'
import ChatOnline from '../components/MessengerComponents/ChatOnline'

const ProfilePage = () => {
  return (
    <div className="flex space-x-4">
    <div className="flex-1">
      <Profile />
    </div>
    <div className="w-1/4">
      <ChatOnline />
    </div>
  </div>
  )
}

export default ProfilePage