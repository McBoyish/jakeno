import { io } from 'socket.io-client';
const uri = process.env.WEBSOCKET || 'ws:localhost:4000';
export { io, uri };
const https = process.env.HTTPS || 'http://localhost:4000';
export { https };
// test
