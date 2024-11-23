import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";

const CommunityModal = ({ community, onClose }) => {
  const placeholderPosts = [
    {
      id: 1,
      user: "User1",
      content: "This is a placeholder post. Feel free to share your thoughts here!",
      timestamp: "2 hours ago",
      likes: 14,
      dislikes: 3,
      comments: [
        { user: "Commenter1", text: "Thanks for starting this discussion!", timestamp: "1 hour ago" },
        { user: "Commenter2", text: "Interesting point!", timestamp: "30 minutes ago" },
      ],
    },
    {
      id: 2,
      user: "User2",
      content: "Welcome to the community! What would you like to talk about?",
      timestamp: "5 hours ago",
      likes: 8,
      dislikes: 1,
      comments: [],
    },
    {
      id: 3,
      user: "User3",
      content: "Does anyone have resources or tips to share? Let's help each other grow!",
      timestamp: "1 day ago",
      likes: 22,
      dislikes: 5,
      comments: [
        { user: "Commenter3", text: "Here's a helpful article I found!", timestamp: "20 hours ago" },
      ],
    },
  ];

  const [posts, setPosts] = useState(community?.posts || placeholderPosts);

  if (!community) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContainer}>
        {/* Modal Header */}
        <div style={styles.header}>
          <h1 style={styles.communityName}>{community.name}</h1>
          <p style={styles.members}>{community.members} members</p>
          <p style={styles.description}>{community.description}</p>
        </div>

        {/* Posts Section */}
        <div style={styles.postsContainer}>
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <p style={styles.noPostsMessage}>No posts yet. Be the first to start a conversation!</p>
          )}
        </div>

        {/* Close Button */}
        <button onClick={onClose} style={styles.closeButton}>
          &times;
        </button>
      </div>
    </div>
  );
};

// Individual Post Component
const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = { user: "You", text: newComment, timestamp: "Just now" };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const toggleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
      if (hasDisliked) {
        setDislikes(dislikes - 1);
        setHasDisliked(false);
      }
    }
  };

  const toggleDislike = () => {
    if (hasDisliked) {
      setDislikes(dislikes - 1);
      setHasDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setHasDisliked(true);
      if (hasLiked) {
        setLikes(likes - 1);
        setHasLiked(false);
      }
    }
  };

  return (
    <div style={styles.postCard}>
      {/* Post Header */}
      <div style={styles.postHeader}>
        <strong style={styles.postUser}>{post.user}</strong>
        <span style={styles.timestamp}>{post.timestamp}</span>
        <MdOutlineReportProblem style={styles.reportIcon} />
      </div>

      {/* Post Content */}
      <p style={styles.postContent}>{post.content}</p>

      {/* Interaction Section */}
      <div style={styles.interactionSection}>
        <button
          style={{
            ...styles.likeButton,
            color: hasLiked ? "#4a90e2" : "#000",
          }}
          onClick={toggleLike}
        >
          <FaThumbsUp /> <span>{likes}</span>
        </button>
        <button
          style={{
            ...styles.dislikeButton,
            color: hasDisliked ? "#e74c3c" : "#000",
          }}
          onClick={toggleDislike}
        >
          <FaThumbsDown /> <span>{dislikes}</span>
        </button>
        <button
          style={styles.commentButton}
          onClick={() => setShowComments(!showComments)}
        >
          <FaComment /> <span>{comments.length}</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={styles.commentsContainer}>
          {comments.map((comment, index) => (
            <div key={index} style={styles.comment}>
              <strong style={styles.commentUser}>{comment.user}</strong>
              <p style={styles.commentText}>{comment.text}</p>
              <span style={styles.commentTimestamp}>{comment.timestamp}</span>
            </div>
          ))}
          <form onSubmit={handleAddComment} style={styles.commentForm}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              style={styles.commentInput}
            />
            <button type="submit" style={styles.commentSubmitButton}>
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Styles (Same as before)
const styles = {
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    width: "80%",
    height: "90%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  },
  header: {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
  },
  communityName: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
  },
  members: {
    fontSize: "18px",
    color: "#666",
  },
  description: {
    fontSize: "16px",
    color: "#777",
    marginTop: "5px",
  },
  postsContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  },
  noPostsMessage: {
    textAlign: "center",
    fontSize: "16px",
    color: "#777",
    marginTop: "20px",
  },
  postCard: {
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    marginBottom: "20px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  postHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  postUser: {
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: "12px",
    color: "#999",
  },
  reportIcon: {
    cursor: "pointer",
    color: "#ccc",
  },
  postContent: {
    fontSize: "16px",
    marginBottom: "15px",
  },
  interactionSection: {
    display: "flex",
    gap: "10px",
  },
  likeButton: {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  dislikeButton: {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  commentButton: {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  commentsContainer: {
    marginTop: "15px",
  },
  comment: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    marginBottom: "10px",
  },
  commentUser: {
    fontWeight: "bold",
  },
  commentText: {
    fontSize: "14px",
  },
  commentTimestamp: {
    fontSize: "12px",
    color: "#999",
  },
  commentForm: {
    display: "flex",
    marginTop: "10px",
  },
  commentInput: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  commentSubmitButton: {
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    marginLeft: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#888",
  },
};

export default CommunityModal;
