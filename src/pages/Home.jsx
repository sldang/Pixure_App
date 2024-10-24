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
              linkName="Messenger"
              linkUrl="/Login"
            />
  </div>
);
}

export default Home