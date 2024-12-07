import React, { useState } from 'react';
import { useCommunityContext } from '../contexts/CommunityContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Placeholder communities list
const initialCommunities = [
  {
    name: 'Photography Enthusiasts',
    description: 'A vibrant community for sharing tips, tricks, and stunning photos.',
    imageUrl: 'https://via.placeholder.com/100x100',
    members: 134,
  },
  {
    name: 'Travel Lovers',
    description: 'Inspire and be inspired by incredible travel stories and destinations!',
    imageUrl: 'https://via.placeholder.com/100x100',
    members: 72,
  },
  {
    name: 'Book Club',
    description: 'Dive into exciting discussions about the latest and greatest books.',
    imageUrl: 'https://via.placeholder.com/100x100',
    members: 200,
  },
  {
    name: 'Fitness',
    description: 'Let’s achieve our fitness goals together and share the journey.',
    imageUrl: 'https://via.placeholder.com/100x100',
    members: 310,
  },
];

const Explore = () => {
  const { state, dispatch } = useCommunityContext(); // Access context state and dispatch
  const navigate = useNavigate();
  const [communities] = useState(initialCommunities);

  // Function to handle joining a community
  const joinCommunity = (community) => {
    const isAlreadyJoined = state.joinedCommunities.some(
      (joinedCommunity) => joinedCommunity.name === community.name
    );

    if (isAlreadyJoined) {
      toast.error(`You already joined "${community.name}".`, { autoClose: 2000 });
      return;
    }

    dispatch({ type: 'JOIN_COMMUNITY', payload: community });
    toast.success(`Welcome to "${community.name}"!`, { autoClose: 2000 });
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
        <h1 style={styles.heading}>Find Your Community</h1>
        <button
          style={styles.createCommunityBtn}
          onClick={navigateToCreateCommunity}
        >
          + Create Community
        </button>
      </div>

      {/* Grid layout for displaying communities */}
      <div style={styles.communityGrid}>
        {[...communities, ...state.allCommunities].map((community, index) => (
          <div
            key={index}
            style={styles.communityCard}
            onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
          >
            <img
              src={community.imageUrl}
              alt={community.name}
              style={styles.communityImage}
            />
            <h2 style={styles.communityName}>{community.name}</h2>
            <p style={styles.communityDescription}>{community.description}</p>
            <p style={styles.communityMembers}>
              <strong>{community.members}</strong> members
            </p>
            <button
              style={styles.joinButton}
              onClick={() => joinCommunity(community)}
            >
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
    padding: '40px',
    marginLeft: '240px',
    backgroundColor: '#f4f5f7',
    minHeight: '100vh',
  },
  exploreHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  heading: {
    fontSize: '34px',
    fontWeight: '700',
    color: '#333',
    textAlign: 'left',
    margin: 0,
  },
  createCommunityBtn: {
    backgroundColor: '#4a90e2',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  communityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  communityCard: {
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
  },
  communityCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
  communityImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    marginBottom: '15px',
    objectFit: 'cover',
  },
  communityName: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  communityDescription: {
    fontSize: '14px',
    marginBottom: '10px',
    color: '#555',
    fontStyle: 'italic',
  },
  communityMembers: {
    fontSize: '0.9rem',
    marginBottom: '15px',
    color: '#777',
  },
  joinButton: {
    padding: '10px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background-color 0.3s ease',
  },
  joinButtonHover: {
    backgroundColor: '#357ABD',
    transform: 'scale(1.05)',
  },
};

export default Explore;
