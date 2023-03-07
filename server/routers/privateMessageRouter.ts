import axios from 'axios';
import { PrivateMessage } from 'types';
import { https } from 'server/api';

const uri = `${https}/api/privateMessage`;

export const getPrivateMessages = async (
	convId: string,
	cursor: string,
	limit: number
) => {
	try {
		const res = await axios.post<PrivateMessage[] | null>(`${uri}`, {
			convId,
			cursor,
			limit,
		});
		return res.data;
	} catch (e) {
		return null;
	}
};
