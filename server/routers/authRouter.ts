import axios from 'axios';
import { UserData, InputUserAccount } from 'types';

const uri = `${process.env.HTTPS || 'http://localhost:4000'}/api/auth`;

const register = async (name: string, password: string) => {
	try {
		const account: InputUserAccount = { name, password };
		const res = await axios.post<UserData>(`${uri}/register`, account);
		return res.data;
	} catch (e) {
		return null;
	}
};

const login = async (name: string, password: string) => {
	try {
		const account: InputUserAccount = { name, password };
		const res = await axios.post<UserData>(`${uri}/login`, account);
		return res.data;
	} catch (e) {
		return null;
	}
};

export { register, login };
