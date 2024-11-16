import React from 'react';
import { useCommunityContext } from '../contexts/CommunityContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// placeholder list of communities with their details
const communities = [
   {
     name: 'Photography Enthusiasts',
     description: 'A community for photography lovers to share tips, tricks, and photos.',
     imageUrl: 'https://via.placeholder.com/80x80',
     members: 134
   },
   {
     name: 'Travel Lovers',
     description: 'Share your travel experiences and get inspired for your next adventure!',
     imageUrl: 'https://via.placeholder.com/80x80',
     members: 72
   },
   {
     name: 'Book Club',
     description: 'Join us to discuss the latest bestsellers and classic books.',
     imageUrl: 'https://via.placeholder.com/80x80',
     members: 200
   },
   {
     name: 'Fitness',
     description: 'Connect with others interested in fitness.',
     imageUrl: 'https://via.placeholder.com/80x80',
     members: 310
   },
];

const Explore = () => {
   // access the state and dispatch function from community context
   const { state, dispatch } = useCommunityContext();
   const navigate = useNavigate();

   // function to handle joining a community
   const joinCommunity = (community) => {
       // check if the community is already joined
       const isAlreadyJoined = state.joinedCommunities.some(
           (joinedCommunity) => joinedCommunity.name === community.name
       );

       if (isAlreadyJoined) {
           // show a toast notification if already joined
           toast.error(`You have already joined ${community.name}.`);
           return;
       }

       // otherwise, dispatch the join action and show success toast
       dispatch({ type: 'JOIN_COMMUNITY', payload: community });
       toast.success(`You've joined ${community.name}!`);
   };

   return (
       <div style={styles.explorePage}>
           {/* header section with title and create button */}
           <div style={styles.exploreHeader}>
               <h1 style={styles.heading}>Explore Communities</h1>
               <button style={styles.createCommunityBtn} onClick={() => navigate('/create-community')}>
                   Create a Community
               </button>
           </div>
           {/* grid layout for displaying communities */}
           <div style={styles.communityGrid}>
               {communities.map((community, index) => (
                   <div key={index} style={styles.communityCard}>
                       {/* community image */}
                       <img src={community.imageUrl} alt={community.name} style={styles.communityImage} />
                       {/* community name */}
                       <h2 style={styles.communityName}>{community.name}</h2>
                       {/* community description */}
                       <p style={styles.communityDescription}>{community.description}</p>
                       {/* community members count */}
                       <p style={styles.communityMembers}>{community.members} members</p>
                       {/* button to join the community */}
                       <button style={styles.joinButton} onClick={() => joinCommunity(community)}>
                           Join Community
                       </button>
                   </div>
               ))}
           </div>
           {/* toast container for showing notifications */}
           <ToastContainer />
       </div>
   );
};

// inline styles for consistent layout and design
const styles = {
   explorePage: {
       padding: '20px',
       marginLeft: '240px', // space for sidebar
       transition: 'background-color 0.3s ease, color 0.3s ease', // smooth transitions for theme changes
   },
   exploreHeader: {
       display: 'flex',
       justifyContent: 'space-between', // separate title and button
       alignItems: 'center',
       marginBottom: '20px',
   },
   heading: {
       fontSize: '32px', // large title font size
       fontWeight: '600',
       color: '#333',
       textAlign: 'left', // align title to the left
       margin: 0, // remove default margin
   },
   createCommunityBtn: {
       backgroundColor: '#4a90e2', // blue button background
       color: 'white', // white button text
       padding: '8px 16px',
       borderRadius: '5px',
       fontSize: '1rem',
       cursor: 'pointer',
       transition: 'background-color 0.3s ease', // smooth hover effect
   },
   communityGrid: {
       display: 'flex',
       flexWrap: 'wrap', // wrap rows if there are too many items
       gap: '16px', // space between cards
       justifyContent: 'center', // center the grid
   },
   communityCard: {
       backgroundColor: '#ffffff', // white card background
       color: '#333', // dark text color
       width: '250px', // fixed card width
       height: '400px', // fixed card height for uniformity
       padding: '20px',
       borderRadius: '10px', // rounded corners
       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // subtle shadow
       textAlign: 'center', // center text inside card
       display: 'flex',
       flexDirection: 'column', // stack elements vertically
       alignItems: 'center',
       justifyContent: 'space-between', // evenly space elements vertically
       transition: 'background-color 0.3s ease, color 0.3s ease', // smooth transitions for dark mode
   },
   communityImage: {
       width: '80px', // fixed image width
       height: '80px', // fixed image height
       borderRadius: '50%', // circular image
       backgroundColor: '#ddd', // fallback background
       marginBottom: '10px', // space below the image
   },
   communityName: {
       fontSize: '18px', // card title font size
       color: '#333',
       marginBottom: '10px', // space below the name
       minHeight: '30px', // ensure uniform height for name
   },
   communityDescription: {
       fontSize: '14px', // smaller font for description
       color: '#666',
       textAlign: 'center',
       marginBottom: '10px', // space below the description
       minHeight: '60px', // ensure uniform height for description
   },
   communityMembers: {
       color: '#666', // lighter font color
       fontSize: '0.9rem', // smaller font size
       marginBottom: '15px', // space below the members count
   },
   joinButton: {
       padding: '8px', // consistent button padding
       backgroundColor: '#4a90e2', // blue button background
       color: 'white', // white button text
       border: 'none',
       borderRadius: '5px', // rounded button
       cursor: 'pointer', // pointer cursor on hover
       transition: 'background-color 0.3s ease', // smooth hover effect
   },
};

export default Explore;
