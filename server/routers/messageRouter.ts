import axios from 'axios';
import { Message } from 'types';

const uri = `${process.env.HTTPS || 'http://localhost:4000'}/api/message`;

export const getMessages = async (roomName: string, code: string) => {
	try {
		const res = await axios.post<Message[] | null>(`${uri}`, {
			roomName,
			code,
		});
		return res.data;
	} catch (e) {
		return null;
	}
};
