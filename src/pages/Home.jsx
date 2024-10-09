import React from 'react'
import Sidebar from '../components/HomeComponents/Sidebar'
import NewsFeed from '../components/HomeComponents/NewsFeed'
import Rightbar from '../components/HomeComponents/Rightbar'
import Header from "../components/Header";

const Home = () => {
  return (
    <div className='flex'>
    <Sidebar/>
    <NewsFeed/>
    <Rightbar />
    <Header
              linkName="sign up"
              linkUrl="/signup"
            />
  </div>
);
}

export default Home