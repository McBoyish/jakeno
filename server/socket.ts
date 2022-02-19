import { io } from 'socket.io-client';
const socket = io(process.env.WEBSOCKET || 'ws:localhost:4000');
export { socket };
