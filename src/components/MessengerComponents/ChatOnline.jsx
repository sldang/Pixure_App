import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ChatOnline.css';

export default function ChatOnline() {
    const [usersDetails, setUsersDetails] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const storedUserData = JSON.parse(localStorage.getItem("userData")); // Adjust this key as necessary
            const followList = storedUserData?.user?.followList || [];

            try {
                const followedUsers = await Promise.all(
                    followList.map(email =>
                        axios.get(`/api/users?email=${email}`) // Adjust this endpoint to match your backend
                    )
                );

                const usersWithDetails = followedUsers.map(res => ({
                    email: res.data.email,
                    nickname: res.data.nickname,
                }));

                setUsersDetails(usersWithDetails);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="chatOnline">
            {usersDetails.map((user, index) => (
                <div className="chatOnlineFriend" key={index}>
                    <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImg"
                            src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" // Default image
                            alt={`${user.nickname}'s profile`}
                        />
                    </div>
                    <span className="chatOnlineName">{user.nickname}</span>
                </div>
            ))}
        </div>
    );
}
