// src/contexts/CommunityContext.js
import React, { createContext, useContext, useReducer } from 'react';

// initial state for the community context
const initialState = {
    joinedCommunities: [], // list of communities the user has joined
    allCommunities: [],    // list of all available communities
};

// reducer function to handle actions
const communityReducer = (state, action) => {
    switch (action.type) {
        case 'JOIN_COMMUNITY':
            // avoid adding duplicate communities to the joined list
            if (state.joinedCommunities.some(c => c.name === action.payload.name)) {
                return state;
            }
            return {
                ...state,
                joinedCommunities: [...state.joinedCommunities, action.payload],
            };

        case 'ADD_COMMUNITY':
            // add a new community to the allCommunities list
            return {
                ...state,
                allCommunities: [...state.allCommunities, action.payload],
            };

        default:
            return state;
    }
};

// create the context
const CommunityContext = createContext();

// provider component to wrap the app and provide community state
export const CommunityProvider = ({ children }) => {
    const [state, dispatch] = useReducer(communityReducer, initialState);

    return (
        <CommunityContext.Provider value={{ state, dispatch }}>
            {children}
        </CommunityContext.Provider>
    );
};

// custom hook to consume the community context
export const useCommunityContext = () => {
    const context = useContext(CommunityContext);
    if (!context) {
        throw new Error('useCommunityContext must be used within a CommunityProvider');
    }
    return context;
};
