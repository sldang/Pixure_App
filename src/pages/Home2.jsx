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
        // Check if followList is available
        const followList = user?.user?.followList || [];

        // Fetch posts for each user in followList
        const postsPromises = followList.map(async (email) => {
          try {
            // Fetch userId from email
            const userResponse = await axios.post(
              "/api/users/by-email",
              { email },
              { headers: { "Content-Type": "application/json" } }
            );
            const { _id: userId } = userResponse.data;

            // Fetch posts for the userId
            const postsResponse = await axios.get(`/api/posts/profile/${userId}`, {
              headers: { Authorization: `Bearer ${user.token}` },
            });

            return postsResponse.data;
          } catch (err) {
            console.error(`Error fetching data for email: ${email}`, err.message);
            return [];
          }
        });

        // Combine all posts into a single array
        const postsArray = await Promise.all(postsPromises);
        const combinedPosts = postsArray.flat();

        // Sort posts by creation date in descending order
        combinedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Update the state with sorted posts
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
