import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../components/HomeComponents/Sidebar";
import Rightbar from "../components/HomeComponents/Rightbar";
import Post from "../components/HomeComponents/Post";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

const Home2 = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [followerPosts, setFollowerPosts] = useState([]); // Define state for posts

  useEffect(() => {
    const fetchFollowerPosts = async () => {
      try {
        const followList = user.user.followList || [];
        let allPosts = [];
    
        for (const email of followList) {
          console.log("Fetching userId for email:", email);
          const userResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/by-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
    
          if (!userResponse.ok) {
            console.error(`Failed to fetch userId for email: ${email}`);
            continue;
          }
    
          const { _id: userId } = await userResponse.json();
          console.log("Fetched userId:", userId);
    
          const postsResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/profile/${userId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
    
          if (!postsResponse.ok) {
            console.error(`Failed to fetch posts for userId: ${userId}`);
            continue;
          }
    
          const userPosts = await postsResponse.json();
          console.log(`Fetched posts for userId ${userId}:`, userPosts);
          allPosts = [...allPosts, ...userPosts];
        }
    
        allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFollowerPosts(allPosts);
        console.log("Combined Posts:", allPosts);
      } catch (error) {
        console.error("Error fetching posts from followed users:", error.message);
      }
    };
    

        const postsArray = await Promise.all(postsPromises);
        const combinedPosts = postsArray.flat();
        combinedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date
        setFollowerPosts(combinedPosts);
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
                user={post.userId?.nickname || "Unknown User"}
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
