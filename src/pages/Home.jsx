import React from 'react'
import Sidebar from '../components/HomeComponents/Sidebar'
import NewsFeed from '../components/HomeComponents/NewsFeed'
import Rightbar from '../components/HomeComponents/Rightbar'

const Home = () => {
  return (
    <div className='flex'>
    <Sidebar/>
    <NewsFeed/>
    <Rightbar />
    <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/Login"
            />
  </div>
);
}

export default Home