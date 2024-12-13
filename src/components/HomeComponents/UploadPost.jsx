import React, { useState, useEffect, useContext } from 'react';
import { FaRegImage } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from 'axios';
import { AuthContext } from "../AuthContext"; // Assuming AuthContext provides user info

const UploadPost = ({ postContent = '', setPostContent, handleUpload }) => {
    const { user } = useContext(AuthContext); // Access user from AuthContext
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(''); // State for selected community
    const [imagePreview, setImagePreview] = useState(null);
    const [joinedCommunities, setJoinedCommunities] = useState([]); // State for joined communities

    // Fetch joined communities on component mount
    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const response = await axios.get(`/api/myCommunities?nickname=${user.nickname}`, {
                });
                setJoinedCommunities(response.data); // Assume response contains an array of communities
            } catch (error) {
                console.error("Error fetching joined communities:", error);
            }
        };

        fetchCommunities();
    }, [user.token]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            
            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value); // Update category with the selected community
    };

    const onUpload = () => {
        // Ensure we only pass defined values
        handleUpload(
            postContent || '', 
            image, 
            category // Pass selected community as category
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl mx-auto border border-gray-100">
            <div className="flex flex-col space-y-4">
                {/* Post Content Input */}
                <div className="relative">
                    <textarea
                        placeholder="What's on your mind?"
                        className="w-full h-24 resize-none border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        value={postContent || ''}
                        onChange={(e) => setPostContent(e.target.value)}
                    />
                    {(postContent || '').length > 0 && (
                        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                            {(postContent || '').length}/500
                        </div>
                    )}
                </div>

                {/* Image Upload */}
                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
                        <input 
                            type="file" 
                            className="hidden" 
                            onChange={handleImageChange} 
                            accept="image/*"
                        />
                        <FaRegImage className="text-blue-500" />
                        <span className="text-sm text-gray-600">
                            {image ? image.name : "Add Image"}
                        </span>
                    </label>
                    
                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Bottom Section */}
                <div className="flex justify-between items-center">
                    {/* Category Dropdown for Communities */}
                    <div className="relative w-1/2">
                        <select 
                            value={category} 
                            onChange={handleCategoryChange} 
                            className="appearance-none w-full bg-gray-100 border border-gray-200 rounded-lg p-2 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a Community</option>
                            {joinedCommunities.map((community) => (
                                <option key={community._id} value={community._id}>
                                    {community.name}
                                </option>
                            ))}
                        </select>
                        <MdKeyboardArrowDown 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
                            size={18} 
                        />
                    </div>

                    {/* Upload Button */}
                    <button 
                        onClick={onUpload}
                        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <IoSend size={18} />
                        <span>Post</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPost;
