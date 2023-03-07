import axios from 'axios';
import { InputConv, Conversation } from 'types';
import { https } from 'server/api';

const uri = `${https}/api/conv`;

export const getConvs = async () => {
	try {
		const res = await axios.get<Conversation[]>(`${uri}`);
		return res.data;
	} catch (e) {
		return null;
	}
};

export const createConv = async (conv: InputConv, token: string) => {
	const headers = { 'x-access-token': token };
	try {
		const res = await axios.post<Conversation | null>(`${uri}`, conv, {
			headers,
		});
		return res.data;
	} catch (e) {
		return null;
	}
};
