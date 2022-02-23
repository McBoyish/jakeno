import axios from 'axios';
import { User } from 'types';

const uri = `${process.env.HTTPS || 'http://localhost:4000'}/api/users`;

const getUser = async (name: string) => {
	const headers = { 'x-access-token': localStorage.getItem('token') || '' };
	try {
		const res = await axios.get<User>(`${uri}/${name}`, { headers });
		return res.data;
	} catch (e) {
		return null;
	}
};

export { getUser };
