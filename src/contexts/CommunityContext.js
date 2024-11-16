import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    joinedCommunities: [],
};

const communityReducer = (state, action) => {
    switch (action.type) {
        case 'JOIN_COMMUNITY':
            // avoid duplicates by checking if community already exists
            if (state.joinedCommunities.some(c => c.name === action.payload.name)) {
                return state; // return existing state if duplicate
            }
            return {
                ...state,
                joinedCommunities: [...state.joinedCommunities, action.payload],
            };
        default:
            return state;
    }
};

const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
    const [state, dispatch] = useReducer(communityReducer, initialState);

    return (
        <CommunityContext.Provider value={{ state, dispatch }}>
            {children}
        </CommunityContext.Provider>
    );
};

export const useCommunityContext = () => {
    const context = useContext(CommunityContext);
    if (!context) {
        throw new Error('useCommunityContext must be used within a CommunityProvider');
    }
    return context;
};
