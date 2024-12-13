import React, { useState, useEffect } from 'react';
import { useCommunityContext } from '../contexts/CommunityContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Explore = () => {
  const { state, dispatch } = useCommunityContext(); // Access context state and dispatch
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]); // Corrected state variable
  const parsedData = JSON.parse(localStorage.getItem('user'));
  const userid = parsedData && parsedData.user ? parsedData.user.id : null;
  const nickname = parsedData && parsedData.user ? parsedData.user.nickname : null;

  // Fetch communities from the backend
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/community/exclude/${nickname}`)
      .then((response) => response.json())
      .then((data) => {
        // Map the fetched data to match the expected structure
        const formattedData = data.map((community) => ({
          name: community.name,
          description: community.description,
          imageUrl: community.imageUrl || 'https://via.placeholder.com/100x100',
          members: community.communityMembers.length || 0,
        }));
        console.log("updating communities")
        setCommunities(formattedData); // Update state
      })
      .catch((error) => console.error('Error fetching communities:', error));
  }, []);

  // Function to handle joining a community
  const joinCommunity = async (community) => {
    try {
        console.log('Joining community:', community.name);
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/community/joinCommunity/${community.name}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId: userid, 
                communityName: community.name,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to join the community.');
        }

        const data = await response.json();

        if (data.success) {
            dispatch({ type: 'JOIN_COMMUNITY', payload: community });
            toast.success(`Welcome to "${community.name}"!`, { autoClose: 2000 });
            setTimeout(() => navigate('/communities'), 2000);
        } else {
            toast.error(data.message || 'Failed to join community.', { autoClose: 2000 });
        }
    } catch (error) {
        console.error('Error joining community:', error);
        toast.error(error.message || 'Something went wrong.', { autoClose: 2000 });
    }
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
        {communities.map((community, index) => (
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
