import React from 'react';
import { useCommunityContext } from '../contexts/CommunityContext';

// component for displaying joined communities
const Communities = () => {
   const { state } = useCommunityContext(); // access state from communitycontext
   const { joinedCommunities } = state; // destructure joined communities

   return (
       <div style={styles.communitiesPage}>
           <h1 style={styles.heading}>Your Communities</h1>
           {joinedCommunities.length === 0 ? ( // check if no communities have been joined
               <p style={styles.noCommunitiesText}>You haven't joined any communities yet.</p>
           ) : (
               <div style={styles.communityList}>
                   {joinedCommunities.map((community, index) => ( // iterate through joined communities
                       <div key={index} style={styles.communityCard}>
                           <img src={community.imageUrl} alt={community.name} style={styles.communityImage} />
                           <h2 style={styles.communityName}>{community.name}</h2>
                           <p style={styles.communityDescription}>{community.description}</p>
                       </div>
                   ))}
               </div>
           )}
       </div>
   );
};

// inline styles for consistent card layout and centered images
const styles = {
   communitiesPage: {
       padding: '20px',
       marginLeft: '240px', // adjust for sidebar
   },
   heading: {
       fontSize: '32px',
       fontWeight: '600',
       color: '#333',
       textAlign: 'center',
       marginBottom: '20px',
   },
   noCommunitiesText: {
       fontSize: '18px',
       color: '#666',
       textAlign: 'center',
   },
   communityList: {
       display: 'flex',
       flexWrap: 'wrap',
       gap: '20px',
       justifyContent: 'center',
   },
   communityCard: {
       backgroundColor: '#ffffff',
       color: '#333',
       width: '250px',
       height: '350px', // fixed height for uniformity
       padding: '20px',
       borderRadius: '10px',
       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center',
       textAlign: 'center',
       transition: 'background-color 0.3s ease, color 0.3s ease',
   },
   communityImage: {
       width: '80px',
       height: '80px',
       borderRadius: '50%',
       marginBottom: '15px',
       objectFit: 'cover', // ensure the image fits within the circle
   },
   communityName: {
       fontSize: '18px',
       color: '#333',
       marginBottom: '10px',
   },
   communityDescription: {
       fontSize: '14px',
       color: '#666',
   },
};

export default Communities;
