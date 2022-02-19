import { io } from 'socket.io-client';
const uri = process.env.WEBSOCKET || 'ws:localhost:4000';
export { io, uri };
