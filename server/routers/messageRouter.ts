import axios from 'axios';
import { Message } from 'types';
import { https } from 'server/socket';

const uri = `${https}/api/message`;

export const getMessages = async (
	roomName: string,
	code: string,
	cursor: string,
	limit: number
) => {
	try {
		const res = await axios.post<Message[] | null>(`${uri}`, {
			roomName,
			code,
			cursor,
			limit,
		});
		return res.data;
	} catch (e) {
		return null;
	}
};
