import axios from 'axios';
import { RoomData } from 'types';

const uri = `${process.env.HTTPS || 'http://localhost:4000'}/api/rooms`;

const getRoom = async (name: string) => {
	try {
		const res = await axios.get<RoomData>(`${uri}/${name}`);
		return res.data;
	} catch (e) {
		return null;
	}
};

const createRoom = async (name: string) => {
	const headers = { 'x-access-token': localStorage.getItem('token') || '' };
	try {
		const res = await axios.post<RoomData>(`${uri}`, { name }, { headers });
		return res.data;
	} catch (e) {
		return null;
	}
};

export { getRoom, createRoom };
