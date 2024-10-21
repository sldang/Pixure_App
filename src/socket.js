import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Adjust URL based on your backend
export default socket;