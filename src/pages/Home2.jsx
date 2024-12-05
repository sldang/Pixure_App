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
        // Step 1: Fetch user profile to get followed user IDs
        const profileResponse = await axios.get(`/api/users/profile/${user.user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const followedUserIds = profileResponse.data.followedUserIds;

        console.log("Followed User IDs:", followedUserIds);

        // Step 2: Fetch posts for each followed user ID
        const postsPromises = followedUserIds.map(async (userId) => {
          const postsResponse = await axios.get(`/api/posts/profile/${userId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          return postsResponse.data; // Return posts for this userId
        });

        const postsArray = await Promise.all(postsPromises);
        const combinedPosts = postsArray.flat();

        // Step 3: Sort combined posts by date (descending order)
        combinedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
                onLike={() => handleLike(post._id)} 
                onComment={(commentContent) => handleComment(post._id, commentContent)}
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
