import axios from 'axios';
import { InputRoom, Room } from 'types';

const uri = `${process.env.HTTPS || 'http://localhost:4000'}/api/room`;

export const getPublicRooms = async () => {
	try {
		const res = await axios.get<Room[]>(`${uri}`);
		return res.data;
	} catch (e) {
		return null;
	}
};

export const exists = async (name: string) => {
	try {
		const res = await axios.get<{ exists: boolean }>(`${uri}/exists/${name}`);
		return res.data;
	} catch (e) {
		return null;
	}
};

export const isPrivate = async (name: string) => {
	try {
		const res = await axios.get<{ private: boolean } | null>(
			`${uri}/is-private/${name}`
		);
		return res.data;
	} catch (e) {
		return null;
	}
};

export const verifyCode = async (name: string, code: string) => {
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

export const getRoom = async (name: string, code: string) => {
	const res = await axios.post<Room | null>(`${uri}/${name}`, { code });
	return res.data;
};

export const createRoom = async (room: InputRoom, token: string) => {
	const headers = { 'x-access-token': token };
	try {
		const res = await axios.post<Room | null>(`${uri}`, room, {
			headers,
		});
		return res.data;
	} catch (e) {
		return null;
	}
};
