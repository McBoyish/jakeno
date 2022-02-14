import { io } from 'socket.io-client';
const uri = process.env.API || 'http://localhost:4000';
export const socket = io(uri);
