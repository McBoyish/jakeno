import axios from 'axios';
import { RoomData } from 'types';

const uri = `${process.env.HTTPS || 'http://localhost:4000'}/api/rooms`;

const getRoomData = async (name: string) => {
  try {
    const res = await axios.get<RoomData>(`${uri}/${name}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export { getRoomData };
