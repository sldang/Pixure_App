import React, { useState } from "react";
import UserProfileDisplay from "../../../src/components/HomeComponents/UserProfileDisplay";

const ParentComponent = () => {
  const [nickname, setNickname] = useState("John Doe");
  const [postsCount, setPostsCount] = useState(120);
  const [followersCount, setFollowersCount] = useState(200);
  const [followingCount, setFollowingCount] = useState(180);

  const handleEdit = () => {
    console.log("Edit profile clicked");
    // Handle profile editing logic here
  };

  return (
    <div>
      <UserProfileDisplay
        nickname={nickname}
        postsCount={postsCount}
        followersCount={followersCount}
        followingCount={followingCount}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ParentComponent;
