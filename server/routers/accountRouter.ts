import axios from 'axios';
import { UserData, InputAccount } from 'types';

const uri = `${process.env.HTTPS || 'http://localhost:4000'}/api/account`;

const register = async (name: string, password: string) => {
	try {
		const account: InputAccount = { name, password };
		const res = await axios.post<UserData | null>(`${uri}/register`, account);
		return res.data;
	} catch (e) {
		return null;
	}
};

const login = async (name: string, password: string) => {
	try {
		const account: InputAccount = { name, password };
		const res = await axios.post<UserData | null>(`${uri}/login`, account);
		return res.data;
	} catch (e) {
		return null;
	}
};

export { register, login };
