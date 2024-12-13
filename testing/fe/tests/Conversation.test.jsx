// import { useEffect, useState, useRef } from "react";
// import "../../../src/components/MessengerComponents/Conversation"; 
// import axios from "axios";
// import React, { memo } from "react";

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

// const Conversation = memo(function Conversation({ conversation, currentUser }) {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasError, setHasError] = useState(false);
//   const userCache = useRef({}); // Cache for user data

//   useEffect(() => {
//     if (!conversation || !currentUser || !currentUser.user || !conversation.members) {
//       console.error("Invalid conversation or currentUser data");
//       setHasError(true);
//       return;
//     }

//     const friendId = conversation.members.find((m) => m !== currentUser.user.id);
//     if (!friendId) {
//       console.error("Friend ID is invalid:", friendId);
//       setHasError(true);
//       return;
//     }

//     // Check cache before making an API call
//     if (userCache.current[friendId]) {
//       setUser(userCache.current[friendId]);
//       setIsLoading(false);
//       return;
//     }

//     const getUser = async () => {
//       setIsLoading(true);
//       setHasError(false);

//       try {
//         const res = await axios.get(`/api/users?userId=${friendId}`);
//         if (!res.data) {
//           throw new Error("No user data returned");
//         }
//         userCache.current[friendId] = res.data; // Store in cache
//         setUser(res.data);
//       } catch (err) {
//         console.error("Error fetching user data:", err.response?.data || err.message);
//         setHasError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getUser();
//   }, [currentUser, conversation]);

//   return (
//     <div className="conversation">
//       <img
//         className="conversationImg"
//         src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
//         alt="Profile"
//       />
//       {isLoading && !user ? (
//         <span className="conversationName">Loading...</span>
//       ) : hasError || !user ? (
//         <span className="conversationName">Error fetching user</span>
//       ) : (
//         <span className="conversationName">{user.nickname}</span>
//       )}
//     </div>
//   );
// });

// export default Conversation;


import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import axios from 'axios';
import Conversation from '../../../src/components/MessengerComponents/Conversation';

vi.mock('axios');

describe('Conversation Component', () => {
  const mockConversation = { members: ['user1', 'user2'] };
  const mockCurrentUser = { user: { id: 'user1' } };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading state initially', async () => {
    render(<Conversation conversation={mockConversation} currentUser={mockCurrentUser} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state if conversation data is invalid', async () => {
    render(<Conversation conversation={null} currentUser={mockCurrentUser} />);

    expect(screen.getByText('Error fetching user')).toBeInTheDocument();
  });

  it('fetches and displays user data correctly', async () => {
    const mockFriendData = { nickname: 'Friend Name' };
    axios.get.mockResolvedValueOnce({ data: mockFriendData });

    render(<Conversation conversation={mockConversation} currentUser={mockCurrentUser} />);

    await waitFor(() => {
      expect(screen.getByText('Friend Name')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    render(<Conversation conversation={mockConversation} currentUser={mockCurrentUser} />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching user')).toBeInTheDocument();
    });
  });

  

  it('handles missing friend ID gracefully', async () => {
    const invalidConversation = { members: ['user1'] };

    render(<Conversation conversation={invalidConversation} currentUser={mockCurrentUser} />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching user')).toBeInTheDocument();
    });
  });
});
