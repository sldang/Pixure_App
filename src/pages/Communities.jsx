import React, { useState, useEffect } from 'react';
import { useCommunityContext } from '../contexts/CommunityContext';
import CommunityModal from './CommunityModal';

const Communities = () => {
  const { state } = useCommunityContext(); // Access state from the context
  const { joinedCommunities } = state; // Destructure joined communities
  const parsedData = JSON.parse(localStorage.getItem('user'));
  const nickname = parsedData && parsedData.user ? parsedData.user.nickname : null;

  const [selectedCommunity, setSelectedCommunity] = useState(null); // Track the selected community for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    if (!nickname) {
      console.error("Nickname is required to fetch communities.");
      return;
    }

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/communities/nickname?nickname=${nickname}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch communities: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Ensure the response is an array
        if (!Array.isArray(data)) {
          throw new Error("Unexpected data format from the API.");
        }

        // Map the fetched data to match the expected structure
        const formattedData = data.map((community) => ({
          name: community.name,
          description: community.description,
          imageUrl: community.imageUrl || 'https://via.placeholder.com/100x100',
          members: community.communityMembers ? community.communityMembers.length : 0,
        }));

        joinedCommunities = formattedData; // Update state with joined communities
      })
      .catch((error) => console.error('Error fetching communities:', error));
  }, [nickname]);

  // Open the modal for a specific community
  const openCommunityModal = (community) => {
    setSelectedCommunity(community);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeCommunityModal = () => {
    setSelectedCommunity(null);
    setIsModalOpen(false);
  };

  return (
    <div style={styles.communitiesPage}>
      {/* Header */}
      <h1 style={styles.heading}>Your Communities</h1>

      {/* No Communities Fallback */}
      {joinedCommunities.length === 0 ? (
        <p style={styles.noCommunitiesText}>
          You haven't joined any communities yet.
        </p>
      ) : (
        <div
          style={{
            ...styles.communityGrid,
            justifyContent: joinedCommunities.length <= 2 ? 'center' : 'flex-start', // Center if 2 or fewer communities
          }}
        >
          {joinedCommunities.map((community, index) => (
            <div
              key={index}
              style={styles.communityCard}
              onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
            >
              <img
                src={community.imageUrl || 'https://via.placeholder.com/100x100'}
                alt={community.name}
                style={styles.communityImage}
              />
              <h2 style={styles.communityName}>{community.name}</h2>
              <p style={styles.communityDescription}>{community.description}</p>
              <p style={styles.communityMembers}>
                <strong>{community.members || 'N/A'}</strong> members
              </p>
              <button
                style={styles.openButton}
                onClick={() => openCommunityModal(community)}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Community Modal */}
      {isModalOpen && (
        <CommunityModal
          community={selectedCommunity}
          onClose={closeCommunityModal}
        />
      )}
    </div>
  );
};

// Styles for the Communities page
const styles = {
  communitiesPage: {
    padding: '40px',
    marginLeft: '240px', // Adjust for the sidebar
    backgroundColor: '#f4f5f7',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '34px',
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
  },
  noCommunitiesText: {
    fontSize: '18px',
    color: '#777',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: '50px',
  },
  communityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    alignItems: 'center',
  },
  communityCard: {
    backgroundColor: '#ffffff',
    color: '#333',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  communityCardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  communityImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    marginBottom: '15px',
  },
  communityName: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#222',
  },
  communityDescription: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
    fontStyle: 'italic',
  },
  communityMembers: {
    fontSize: '0.9rem',
    color: '#777',
    marginBottom: '15px',
  },
  openButton: {
    backgroundColor: '#4a90e2',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background-color 0.3s ease',
  },
};

export default Communities;
