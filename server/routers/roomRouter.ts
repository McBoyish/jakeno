import axios from 'axios';
import { RoomData, InputRoom } from 'types';

const uri = `${process.env.HTTPS || 'http://localhost:4000'}/api/rooms`;

const getRoom = async (name: string) => {
	try {
		const res = await axios.get<RoomData | null>(`${uri}/${name}`);
		return res.data;
	} catch (e) {
		return null;
	}
};

const createRoom = async (room: InputRoom, token: string) => {
	const headers = { 'x-access-token': token };
	try {
		const res = await axios.post<RoomData | null>(`${uri}`, room, { headers });
		return res.data;
	} catch (e) {
		return null;
	}
};

export { getRoom, createRoom };
