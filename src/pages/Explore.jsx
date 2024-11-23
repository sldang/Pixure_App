import React, { useState } from 'react';
import { useCommunityContext } from '../contexts/CommunityContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// placeholder communities list
const initialCommunities = [
  {
    name: 'Photography Enthusiasts',
    description: 'A community for photography lovers to share tips, tricks, and photos.',
    imageUrl: 'https://via.placeholder.com/80x80',
    members: 134,
  },
  {
    name: 'Travel Lovers',
    description: 'Share your travel experiences and get inspired for your next adventure!',
    imageUrl: 'https://via.placeholder.com/80x80',
    members: 72,
  },
  {
    name: 'Book Club',
    description: 'Join us to discuss the latest bestsellers and classic books.',
    imageUrl: 'https://via.placeholder.com/80x80',
    members: 200,
  },
  {
    name: 'Fitness',
    description: 'Connect with others interested in fitness.',
    imageUrl: 'https://via.placeholder.com/80x80',
    members: 310,
  },
];

const Explore = () => {
  const { state, dispatch } = useCommunityContext(); // Access context state and dispatch
  const navigate = useNavigate();
  const [communities, setCommunities] = useState(initialCommunities); // Local community list

  // Function to handle joining a community
  const joinCommunity = (community) => {
    const isAlreadyJoined = state.joinedCommunities.some(
      (joinedCommunity) => joinedCommunity.name === community.name
    );

    if (isAlreadyJoined) {
      toast.error(`You have already joined "${community.name}".`);
      return;
    }

    dispatch({ type: 'JOIN_COMMUNITY', payload: community });
    toast.success(`You've joined "${community.name}"!`);
    setTimeout(() => navigate('/communities'), 2000); // Redirect to Communities page
  };

  // Navigate to the Create Community page
  const navigateToCreateCommunity = () => {
    navigate('/create-community');
  };

  return (
    <div style={styles.explorePage}>
      {/* Header section with title and create button */}
      <div style={styles.exploreHeader}>
        <h1 style={styles.heading}>Explore Communities</h1>
        <button
          style={styles.createCommunityBtn}
          onClick={navigateToCreateCommunity}
        >
          Create a Community
        </button>
      </div>

      {/* Grid layout for displaying communities */}
      <div style={styles.communityGrid}>
        {[...communities, ...state.allCommunities].map((community, index) => (
          <div key={index} style={styles.communityCard}>
            <img src={community.imageUrl} alt={community.name} style={styles.communityImage} />
            <h2 style={styles.communityName}>{community.name}</h2>
            <p style={styles.communityDescription}>{community.description}</p>
            <p style={styles.communityMembers}>{community.members} members</p>
            <button style={styles.joinButton} onClick={() => joinCommunity(community)}>
              Join Community
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

const styles = {
  explorePage: {
    padding: '20px',
    marginLeft: '240px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  exploreHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#333',
    textAlign: 'left',
    margin: 0,
  },
  createCommunityBtn: {
    backgroundColor: '#4a90e2',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  communityGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
  },
  communityCard: {
    backgroundColor: '#ffffff',
    color: '#333',
    width: '250px',
    height: '400px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  communityImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    marginBottom: '10px',
  },
  communityName: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  communityDescription: {
    fontSize: '14px',
    marginBottom: '10px',
  },
  communityMembers: {
    fontSize: '0.9rem',
    marginBottom: '15px',
  },
  joinButton: {
    padding: '8px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Explore;
