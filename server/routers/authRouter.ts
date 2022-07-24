import axios from 'axios';
import { User } from 'types';

const uri = `${process.env.HTTPS || 'http://localhost:4000'}/api/auth`;

export const verify = async (token: string | null) => {
	try {
		if (!token) return null;
		const headers = { 'x-access-token': token };
		const res = await axios.post<User | null>(`${uri}/verify`, null, {
			headers,
		});
		return res.data;
	} catch (e) {
		return null;
	}
};
