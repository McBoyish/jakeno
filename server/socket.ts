import { io } from 'socket.io-client';
const uri = 'https://random-stranger-srv.herokuapp.com';
// const uri = 'http://localhost:4000';
export const socket = io(uri);
