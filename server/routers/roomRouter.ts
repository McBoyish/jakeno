import axios from 'axios';
import { RoomData, InputRoom } from 'types';

const uri = `${process.env.HTTPS || 'http://localhost:4000'}/api/rooms`;

const isLocked = async (name: string) => {
	try {
		const res = await axios.get<{ locked: boolean } | null>(
			`${uri}/is-locked/${name}`
		);
		return res.data;
	} catch (e) {
		return null;
	}
};

const verifyCode = async (name: string, code: string) => {
	try {
		const res = await axios.post<{ valid: boolean } | null>(
			`${uri}/verify-code/${name}`,
			{ code }
		);
		return res.data;
	} catch (e) {
		return null;
	}
};

const getRoom = async (name: string, code?: string) => {
	const res = await axios.post<RoomData | null>(`${uri}/${name}`, { code });
	return res.data;
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

export { getRoom, createRoom, isLocked, verifyCode };
