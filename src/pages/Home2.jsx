import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/HomeComponents/Sidebar';
import Rightbar from '../components/HomeComponents/Rightbar';
import Post from '../components/HomeComponents/Post';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const Home2 = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [followerPosts, setFollowerPosts] = useState([]); // Define state for posts

  useEffect(() => {
    const fetchFollowerPosts = async () => {
      try {
        // Step 1: Get the followList (list of emails of followed users)
        const followList = user.user.followList || []; 
        let allPosts = [];
  
        // Step 2: Iterate through each email in the followList
        for (const email of followList) {
          // Step 2.1: Fetch userId using the email
          const userResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/by-email`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
  
          if (!userResponse.ok) {
            console.error(`Failed to fetch userId for email: ${email}`);
            continue;
          }
  
          const { _id: userId } = await userResponse.json();
  
          // Step 3: Fetch posts for the userId
          const postsResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/profile/${userId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
  
          if (!postsResponse.ok) {
            console.error(`Failed to fetch posts for userId: ${userId}`);
            continue;
          }
  
          const userPosts = await postsResponse.json();
          // Step 4: Combine all posts into one array
          allPosts = [...allPosts, ...userPosts];
        }
  
        // Step 5: Update state with the combined posts
        setFollowerPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts from followed users:", error.message);
      }
    };
  
    fetchFollowerPosts();
  }, [user]);
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center pt-10">
        <div className="w-full max-w-[600px] mx-4">
          {followerPosts.length === 0 ? (
            <p>No posts from followed users to display.</p>
          ) : (
            followerPosts.map((post, index) => (
              <Post
                key={index}
                user={post.userId?.nickname || 'Unknown User'}
                content={post.desc}
                time={post.createdAt}
                img={post.imageData || null}
                likes={post.likes}
                comments={post.comments || []}
              />
            ))
          )}
        </div>
      </div>
      <Rightbar />
    </div>
  );
};

export default Home2;
